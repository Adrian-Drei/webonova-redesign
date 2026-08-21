<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useSeoMeta({ title: 'Contact inquiries · Webonova Admin', robots: 'noindex, nofollow' })

type Status = 'new' | 'contacted' | 'in_progress' | 'converted' | 'archived'
interface Inquiry { id:string; created_at:string; updated_at:string; name:string; email:string; company:string|null; phone:string|null; service:string; package:string; launch_timeline:string|null; budget:string|null; description:string; status:Status; internal_notes:string|null; contacted_at:string|null }
interface Activity { id:number; action:string; details:string|null; created_at:string }

const client = useSupabaseClient()
const auth = useAuthStore()
const search = ref('')
const statusFilter = ref('all')
const serviceFilter = ref('all')
const packageFilter = ref('all')
const selected = ref<Inquiry|null>(null)
const activities = ref<Activity[]>([])
const saving = ref(false)
const notice = ref('')

const { data: inquiries, status: loadStatus, error, refresh } = await useAsyncData('admin-inquiries', async () => {
  const { data, error } = await client.from('project_inquiries').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data as Inquiry[]
})

const filtered = computed(() => (inquiries.value || []).filter((item) => {
  const q = search.value.toLowerCase()
  const haystack = `${item.name} ${item.email} ${item.company || ''}`.toLowerCase()
  return (!q || haystack.includes(q)) && (statusFilter.value === 'all' || item.status === statusFilter.value) && (serviceFilter.value === 'all' || item.service === serviceFilter.value) && (packageFilter.value === 'all' || item.package === packageFilter.value)
}))
const stats = computed(() => ({
  total: inquiries.value?.length || 0,
  new: inquiries.value?.filter(i => i.status === 'new').length || 0,
  active: inquiries.value?.filter(i => ['contacted','in_progress'].includes(i.status)).length || 0,
  converted: inquiries.value?.filter(i => i.status === 'converted').length || 0,
}))
const packages = computed(() => ['premium','essential','unsure'].map(name => ({ name, count: inquiries.value?.filter(i => i.package === name).length || 0, percent: Math.round(((inquiries.value?.filter(i => i.package === name).length || 0) / Math.max(stats.value.total, 1)) * 100) })))
const uniqueServices = computed(() => [...new Set((inquiries.value || []).map(i => i.service))])
const activityDays = computed(() => {
  const days = Array.from({ length: 14 }, (_, offset) => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - (13 - offset))
    const next = new Date(date)
    next.setDate(next.getDate() + 1)
    const count = (inquiries.value || []).filter(i => {
      const created = new Date(i.created_at)
      return created >= date && created < next
    }).length
    return { key: date.toISOString(), label: new Intl.DateTimeFormat('en-PH', { month:'short', day:'numeric' }).format(date), count }
  })
  const max = Math.max(...days.map(d => d.count), 1)
  return days.map(day => ({ ...day, height: Math.max(day.count ? day.count / max * 82 : 3, 3) }))
})

function label(value:string) { return value.replaceAll('_', ' ').replace(/\b\w/g, c => c.toUpperCase()) }
function formatDate(value:string) { return new Intl.DateTimeFormat('en-PH', { dateStyle:'medium' }).format(new Date(value)) }
function formatDateTime(value:string) { return new Intl.DateTimeFormat('en-PH', { dateStyle:'medium', timeStyle:'short' }).format(new Date(value)) }
async function choose(item:Inquiry) {
  selected.value = { ...item }
  const { data } = await client.from('inquiry_activities').select('id,action,details,created_at').eq('inquiry_id', item.id).order('created_at', { ascending:false })
  activities.value = (data || []) as Activity[]
}
async function save(action = 'Inquiry updated') {
  if (!selected.value) return
  saving.value = true
  notice.value = ''
  const changes = { status:selected.value.status, internal_notes:selected.value.internal_notes, contacted_at:selected.value.contacted_at }
  const { data, error: updateError } = await client.from('project_inquiries').update(changes).eq('id', selected.value.id).select().single()
  if (updateError) notice.value = updateError.message
  else {
    await client.from('inquiry_activities').insert({ inquiry_id:selected.value.id, actor_id:auth.user?.id, action, details:selected.value.internal_notes || null })
    selected.value = data as Inquiry
    await refresh()
    await choose(selected.value)
    notice.value = 'Saved'
  }
  saving.value = false
}
async function markContacted() {
  if (!selected.value) return
  selected.value.status = 'contacted'
  selected.value.contacted_at = new Date().toISOString()
  await save('Marked as contacted')
}

let channel: ReturnType<typeof client.channel>|undefined
onMounted(() => {
  channel = client.channel('admin-inquiries').on('postgres_changes', { event:'*', schema:'public', table:'project_inquiries' }, () => refresh()).subscribe()
})
onUnmounted(() => { if (channel) client.removeChannel(channel) })
</script>

<template>
  <div class="admin-workspace" :class="{ 'has-detail': selected }">
    <section class="admin-content">
      <header id="overview" class="admin-topbar">
        <div><h1>Contact Inquiries</h1><p>Review and manage website project requests.</p></div>
        <label class="admin-search"><Icon name="lucide:search" /><input v-model="search" placeholder="Search contacts, email, or business…"></label>
        <span class="connection" :class="{ offline: error }"><Icon :name="error ? 'lucide:database-zap' : 'lucide:database'" /> {{ error ? 'Supabase unavailable' : loadStatus === 'pending' ? 'Connecting…' : 'Supabase connected' }}</span>
      </header>

      <p v-if="error" class="admin-alert"><b>Couldn’t load inquiries.</b> {{ error.message }}</p>
      <div class="stat-grid">
        <article><Icon name="lucide:users" /><div><small>Total inquiries</small><strong>{{ stats.total }}</strong><span>All submissions</span></div></article>
        <article><Icon name="lucide:message-circle" /><div><small>New</small><strong>{{ stats.new }}</strong><span class="orange">Needs review</span></div></article>
        <article><Icon name="lucide:refresh-cw" /><div><small>In progress</small><strong>{{ stats.active }}</strong><span>Active conversations</span></div></article>
        <article><Icon name="lucide:circle-check" /><div><small>Converted</small><strong>{{ stats.converted }}</strong><span>{{ stats.total ? Math.round(stats.converted / stats.total * 100) : 0 }}% conversion</span></div></article>
      </div>

      <div class="admin-insights">
        <article><div class="admin-card-heading"><h2>Inquiry activity</h2><small>Last 14 days</small></div><div class="activity-bars"><i v-for="day in activityDays" :key="day.key" :style="{height:`${day.height}px`}" :title="`${day.label}: ${day.count} inquiries`"><span>{{ day.count }}</span></i></div></article>
        <article><h2>Package interest</h2><div v-for="item in packages" :key="item.name" class="package-bar"><span>{{ label(item.name) }}</span><div><i :style="{width:`${item.percent}%`}"></i></div><b>{{ item.percent }}%</b></div></article>
      </div>

      <section id="inquiries" class="admin-table-card">
        <div class="inquiry-heading"><div><h2>All inquiries</h2><small>{{ filtered.length }} records</small></div><button class="refresh-button" @click="refresh"><Icon name="lucide:refresh-cw" /> Refresh</button></div>
        <div class="admin-filters">
          <label><Icon name="lucide:search" /><input v-model="search" placeholder="Search inquiries…"></label>
          <select v-model="statusFilter"><option value="all">All statuses</option><option v-for="s in ['new','contacted','in_progress','converted','archived']" :key="s" :value="s">{{ label(s) }}</option></select>
          <select v-model="serviceFilter"><option value="all">All project types</option><option v-for="s in uniqueServices" :key="s" :value="s">{{ label(s) }}</option></select>
          <select v-model="packageFilter"><option value="all">All packages</option><option value="essential">Essential · ₱10K</option><option value="premium">Premium · ₱25K</option><option value="unsure">Not sure yet</option></select>
        </div>
        <div v-if="loadStatus === 'pending'" class="admin-empty-state">Loading inquiries…</div>
        <div v-else-if="!filtered.length" class="admin-empty-state"><Icon name="lucide:inbox" /><b>No inquiries found</b><span>New contact form submissions will appear here.</span></div>
        <div v-else class="admin-table-wrap"><table><thead><tr><th>Contact</th><th>Business</th><th>Project type</th><th>Package</th><th>Timeline</th><th>Status</th><th>Submitted</th></tr></thead><tbody><tr v-for="item in filtered" :key="item.id" :class="{selected:selected?.id===item.id}" tabindex="0" @click="choose(item)" @keydown.enter="choose(item)"><td><span class="admin-avatar">{{ item.name.split(' ').map(n=>n[0]).slice(0,2).join('') }}</span><div><b>{{ item.name }}</b><small>{{ item.email }}</small></div></td><td>{{ item.company || '—' }}</td><td>{{ label(item.service) }}</td><td>{{ label(item.package) }}</td><td>{{ item.launch_timeline || 'Flexible' }}</td><td><span class="status-pill" :class="item.status">{{ label(item.status) }}</span></td><td>{{ formatDate(item.created_at) }}</td></tr></tbody></table></div>
      </section>
    </section>

    <Transition name="inquiry-drawer">
    <aside v-if="selected" class="inquiry-detail">
      <header><div><h2>Inquiry details</h2><span class="status-pill" :class="selected.status">{{ label(selected.status) }}</span></div><button aria-label="Close details" @click="selected=null"><Icon name="lucide:x" /></button></header>
      <div class="contact-person"><span class="admin-avatar large">{{ selected.name.split(' ').map(n=>n[0]).slice(0,2).join('') }}</span><div><b>{{ selected.name }}</b><a :href="`mailto:${selected.email}`">{{ selected.email }}</a><a v-if="selected.phone" :href="`tel:${selected.phone}`">{{ selected.phone }}</a></div></div>
      <div class="detail-actions"><a :href="`mailto:${selected.email}`"><Icon name="lucide:mail" /> Email</a><a v-if="selected.phone" :href="`tel:${selected.phone}`"><Icon name="lucide:phone" /> Call</a><button @click="markContacted">Mark as contacted</button></div>
      <dl><dt>Business</dt><dd>{{ selected.company || '—' }}</dd><dt>Project type</dt><dd>{{ label(selected.service) }}</dd><dt>Package interest</dt><dd>{{ label(selected.package) }}{{ selected.package==='premium'?' — ₱25,000':selected.package==='essential'?' — ₱10,000':'' }}</dd><dt>Preferred timeline</dt><dd>{{ selected.launch_timeline || 'Flexible' }}</dd><dt>Estimated budget</dt><dd>{{ selected.budget || 'Not specified' }}</dd><dt>Submitted</dt><dd>{{ formatDateTime(selected.created_at) }}</dd></dl>
      <section class="brief"><h3>Project brief</h3><p>{{ selected.description }}</p></section>
      <label class="detail-field">Status<select v-model="selected.status"><option v-for="s in ['new','contacted','in_progress','converted','archived']" :key="s" :value="s">{{ label(s) }}</option></select></label>
      <label class="detail-field">Internal notes<textarea v-model="selected.internal_notes" rows="4" placeholder="Add a private note…"></textarea></label>
      <div class="save-row"><button :disabled="saving" @click="save()">{{ saving ? 'Saving…' : 'Save changes' }}</button><span :class="{error:notice!=='Saved'}">{{ notice }}</span></div>
      <section class="timeline"><h3>Activity timeline</h3><article><i></i><div><b>Inquiry submitted</b><small>{{ formatDateTime(selected.created_at) }}</small></div></article><article v-for="event in activities" :key="event.id"><i></i><div><b>{{ event.action }}</b><small>{{ formatDateTime(event.created_at) }}</small></div></article></section>
    </aside>
    </Transition>
  </div>
</template>

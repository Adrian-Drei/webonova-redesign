<script setup lang="ts">
const submission = useInquirySubmissionStore()
const { status, message, firstName, isOpen } = storeToRefs(submission)
function escape(event: KeyboardEvent) { if (event.key === 'Escape') submission.close() }
onMounted(() => window.addEventListener('keydown', escape))
onBeforeUnmount(() => { window.removeEventListener('keydown', escape); document.body.style.overflow = '' })
watch(isOpen, open => { document.body.style.overflow = open ? 'hidden' : '' })
</script>

<template>
  <Teleport to="body">
    <Transition name="contact-modal">
      <div v-if="isOpen" class="submission-modal" @click.self="submission.close()">
        <section class="submission-dialog" role="dialog" aria-modal="true" :aria-labelledby="`submission-${status}-title`" :aria-describedby="`submission-${status}-message`">
          <button v-if="status !== 'sending'" class="modal-close" type="button" aria-label="Close submission message" @click="submission.close()">×</button>
          <div v-if="status === 'sending'" class="modal-state modal-loading" aria-live="polite">
            <span class="submission-spinner" aria-hidden="true"></span><p>SUBMITTING YOUR INQUIRY</p><h2 :id="`submission-${status}-title`">Sending securely…</h2><span :id="`submission-${status}-message`">{{ message }}</span><small>Please keep this window open.</small>
          </div>
          <div v-else-if="status === 'success'" class="modal-state modal-success" role="status">
            <i aria-hidden="true">✓</i><p>INQUIRY RECEIVED</p><h2 :id="`submission-${status}-title`">Thank you, {{ firstName }}.</h2><span :id="`submission-${status}-message`">{{ message }}</span><button class="primary-cta" type="button" @click="submission.close()">Done</button>
          </div>
          <div v-else class="modal-state modal-failed" role="alert">
            <i aria-hidden="true">!</i><p>SUBMISSION FAILED</p><h2 :id="`submission-${status}-title`">We couldn’t send that.</h2><span :id="`submission-${status}-message`">{{ message }}</span><div><button class="primary-cta" type="button" @click="submission.close()">Try again</button><a href="mailto:webonovasupport@gmail.com">Email us instead</a></div>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

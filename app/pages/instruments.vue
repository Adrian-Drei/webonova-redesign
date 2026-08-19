<script setup>
definePageMeta({
  layout: "default",
});
const client = useSupabaseClient();
const intruments = ref([]);
const name = ref("");

onMounted(async () => {
  const { data } = await client.from("instruments").select();
  intruments.value = data;
});

const addInstrument = async () => {
  if (name.value === "") return;
  const { data, error } = await client
    .from("instruments")
    .insert({ name: name.value })
    .select()
    .single();

  intruments.value.push(data);
  name.value = "";
};

const removeInstrument = async (id) => {
  intruments.value = intruments.value.filter((i) => i.id !== id);
  await client.from("instruments").delete().eq("id", id);
};
</script>
<template>
  <div>
    <h1>Instruments</h1>
    <div v-for="instrument in intruments" :key="instrument.id">
      {{ instrument.name }}
      <span class="cursor-pointer" @click="removeInstrument(instrument.id)">
        ❌
      </span>
    </div>

    <form @submit.prevent="addInstrument">
      <input v-model="name" type="text" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

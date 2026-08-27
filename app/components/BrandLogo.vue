<script setup lang="ts">
const props = withDefaults(
  defineProps<{ variant?: "light" | "dark"; compact?: boolean }>(),
  { variant: "light", compact: false },
);

const source = computed(() => {
  if (props.compact) return "/brand/webonova-mark.webp";
  return props.variant === "dark"
    ? "/brand/webonova-logo-dark.webp"
    : "/brand/webonova-logo.webp";
});
</script>

<template>
  <span
    class="brand-lockup"
    :class="{ 'brand-lockup--compact': compact }"
  >
    <img
      class="brand-lockup__image"
      :src="source"
      alt=""
      aria-hidden="true"
      :width="compact ? 512 : 460"
      :height="compact ? 512 : 130"
      decoding="async"
    >
  </span>
</template>

<style scoped>
.brand-lockup {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}

.brand-lockup__image {
  display: block;
  width: 190px;
  height: auto;
  object-fit: contain;
}

.brand-lockup--compact .brand-lockup__image {
  width: 44px;
  height: 44px;
}

@media (max-width: 700px) {
  .brand-lockup__image {
    width: 158px;
  }

  .brand-lockup--compact .brand-lockup__image {
    width: 38px;
    height: 38px;
  }
}
</style>

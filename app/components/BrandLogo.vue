<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'light' | 'dark'; compact?: boolean }>(), { variant: 'light', compact: false })
</script>
<template><span class="brand-lockup" :class="[`brand-lockup--${variant}`,{'brand-lockup--compact':compact}]"><img class="brand-lockup__mark" src="/brand/webonova-mark.png" alt="" width="512" height="512"><span v-if="!compact" class="brand-lockup__word">WEBONOVA<span class="brand-lockup__line"></span></span></span></template>
<style scoped>
.brand-lockup{display:inline-flex;align-items:center;gap:9px;min-width:0}.brand-lockup__mark{display:block;width:42px;height:42px;object-fit:contain;flex:none}.brand-lockup__word{position:relative;padding:0 1px 6px;font:500 20px/1 Georgia,serif;letter-spacing:.14em;white-space:nowrap}.brand-lockup__line{position:absolute;left:1px;right:0;bottom:0;height:2px;background:#19afb0}.brand-lockup__line:after{content:'';position:absolute;right:-5px;top:-1px;width:4px;height:4px;border-radius:50%;background:#ff6a1a}.brand-lockup--light{color:#fff}.brand-lockup--dark{color:#051b25}.brand-lockup--compact .brand-lockup__mark{width:44px;height:44px}@media(max-width:700px){.brand-lockup__mark{width:38px;height:38px}.brand-lockup__word{font-size:17px;letter-spacing:.11em}}
</style>

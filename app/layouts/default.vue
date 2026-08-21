<script setup lang="ts">
const route = useRoute();
const open = ref(false);
const menuButton = ref<HTMLButtonElement | null>(null);
const mobileMenu = ref<HTMLElement | null>(null);
const nav = [
  ["Home", "/"],
  ["Services", "/#services"],
  ["Projects", "/work"],
  ["Pricing", "/pricing"],
  ["Contact", "/contact"],
];
const footerServices = [
  ["Website Design", "/#website-design"],
  ["Responsive Development", "/#responsive-development"],
  ["Booking & Inquiry Systems", "/#booking-inquiry-systems"],
  ["SEO Ready", "/#services"],
];
const footerCompany = [
  ["Selected Work", "/work"],
  ["Our Process", "/#process"],
  ["Website Packages", "/pricing"],
  ["Project Inquiry", "/contact"],
];
function isActive(to: string) {
  const [path, hash = ""] = to.split("#");
  if (hash) return route.path === path && route.hash === `#${hash}`;
  if (to === "/") return route.path === "/" && !route.hash;
  return route.path === to;
}
function closeMenu() {
  open.value = false;
}
function handleKeydown(event: KeyboardEvent) {
  if (!open.value) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = [
    menuButton.value,
    ...Array.from(
      mobileMenu.value?.querySelectorAll<HTMLElement>(
        "a[href],button:not([disabled])",
      ) || [],
    ),
  ].filter(Boolean) as HTMLElement[];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
watch(() => route.fullPath, closeMenu);
watch(open, async (value) => {
  if (!import.meta.client) return;
  document.body.style.overflow = value ? "hidden" : "";
  await nextTick();
  if (value)
    mobileMenu.value?.querySelector<HTMLElement>(".mobile-nav-link")?.focus();
  else menuButton.value?.focus();
});
onMounted(() => document.addEventListener("keydown", handleKeydown));
onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="site-shell">
    <a class="skip" href="#main">Skip to content</a>
    <header class="site-header">
      <NuxtLink class="brand brand-logo" to="/" aria-label="Webonova home">
        <BrandLogo variant="light" />
      </NuxtLink>
      <nav aria-label="Primary">
        <NuxtLink v-for="item in nav" :key="item[0]" :to="item[1]">
          {{ item[0] }}
        </NuxtLink>
      </nav>
      <NuxtLink class="outline-cta" to="/contact">Let’s Work Together</NuxtLink>
      <button
        ref="menuButton"
        class="menu-toggle"
        type="button"
        :class="{ open }"
        :aria-label="open ? 'Close navigation menu' : 'Open navigation menu'"
        :aria-expanded="open"
        aria-controls="mobile-navigation"
        @click="open = !open"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </header>
    <Transition name="mobile-navigation">
      <nav
        v-if="open"
        id="mobile-navigation"
        ref="mobileMenu"
        class="mobile-panel"
        aria-label="Mobile navigation"
      >
        <div class="mobile-nav-content">
          <p class="mobile-nav-eyebrow">Explore</p>
          <div class="mobile-nav-links">
            <NuxtLink
              v-for="(item, index) in nav"
              :key="item[0]"
              class="mobile-nav-link"
              :class="{ active: isActive(item[1]) }"
              :style="{ '--nav-index': index }"
              :to="item[1]"
              :aria-current="isActive(item[1]) ? 'page' : undefined"
              @click="closeMenu"
            >
              <small>0{{ index + 1 }}</small>
              <span>{{ item[0] }}</span>
              <i aria-hidden="true">→</i>
            </NuxtLink>
          </div>
          <NuxtLink class="mobile-nav-cta" to="/contact" @click="closeMenu">
            Let’s Work Together
            <span aria-hidden="true">↗</span>
          </NuxtLink>
          <p class="mobile-nav-prompt">
            Have a project in mind? Tell us what you’re building.
          </p>
          <div class="mobile-nav-meta">
            <p>Available for new projects</p>
            <a href="mailto:webonovatech@gmail.com">webonovatech@gmail.com</a>
            <span>Philippines · Working worldwide</span>
            <small>© 2026 Webonova</small>
          </div>
        </div>
      </nav>
    </Transition>
    <main id="main"><slot></slot></main>
    <SubmissionModal />
    <section
      v-if="!['/work', '/pricing', '/contact'].includes(route.path)"
      class="site-cta"
    >
      <h2>
        Ready to build something
        <br >
        your customers will remember?
      </h2>
      <NuxtLink class="orange-cta" to="/contact">
        Let’s Talk About Your Website
      </NuxtLink>
    </section>
    <footer class="site-footer">
      <div>
        <NuxtLink class="footer-logo" to="/" aria-label="Webonova home">
          <BrandLogo variant="light" />
        </NuxtLink>
        <p>
          Modern websites for
          <br >
          ambitious businesses.
        </p>
        <a href="mailto:webonovatech@gmail.com">webonovatech@gmail.com</a>
      </div>
      <div>
        <b>NAVIGATION</b>
        <NuxtLink v-for="item in nav" :key="item[0]" :to="item[1]">
          {{ item[0] }}
        </NuxtLink>
      </div>
      <div>
        <b>SERVICES</b>
        <NuxtLink v-for="item in footerServices" :key="item[0]" :to="item[1]">
          {{ item[0] }}
        </NuxtLink>
      </div>
      <div>
        <b>COMPANY</b>
        <NuxtLink v-for="item in footerCompany" :key="item[0]" :to="item[1]">
          {{ item[0] }}
        </NuxtLink>
      </div>
      <small>© 2026 Webonova</small>
    </footer>
  </div>
</template>

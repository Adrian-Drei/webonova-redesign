<script setup lang="ts">
import { projects, type Project } from "~/data/projects";
usePageSeo({
  title: "Website Design Portfolio and Selected Work | Webonova",
  description:
    "Explore Webonova website projects across hospitality, construction, booking, and events, including responsive client work and self-initiated digital concepts.",
  path: "/work",
  image: "/projects/resort.webp",
  imageAlt: "Private resort website featured in the Webonova portfolio",
  imageWidth: 1500,
  imageHeight: 746,
});
const route = useRoute(),
  router = useRouter();
const filter = ref(String(route.query.category || "all"));
const filters = [
  ["all", "All Projects"],
  ["business", "Business"],
  ["hospitality", "Hospitality"],
  ["booking", "Booking"],
  ["events", "Events"],
];
const ordered = [...projects].sort(
  (a, b) => Number(a.number) - Number(b.number),
);
const matches = (p: Project) =>
  filter.value === "all" ||
  (filter.value === "business" && ["Construction"].includes(p.industry)) ||
  (filter.value === "hospitality" && p.industry === "Hospitality") ||
  (filter.value === "booking" && p.industry === "Platforms") ||
  (filter.value === "events" && p.industry === "Events");
const visible = computed(() => ordered.filter(matches));
watch(filter, (v) =>
  router.replace({ query: v === "all" ? {} : { category: v } }),
);
</script>
<template>
  <div class="portfolio-page">
    <section class="portfolio-hero">
      <div>
        <p>SELECTED WORK</p>
        <h1>
          Websites designed to
          <br >
          make businesses stand out.
        </h1>
        <span>
          A collection of client work and concept projects
          <br >
          across hospitality, construction, booking, and events.
        </span>
        <div class="portfolio-filters" aria-label="Filter projects">
          <button
            v-for="f in filters"
            :key="f[0]"
            :class="{ active: filter === f[0] }"
            @click="filter = f[0]"
          >
            {{ f[1] }}
          </button>
        </div>
      </div>
      <div class="hero-contours" aria-hidden="true"></div>
    </section>
    <section class="portfolio-list">
      <article
        v-for="(p, i) in visible"
        :key="p.title"
        :class="{ reverse: i % 2 === 1 }"
      >
        <div class="project-shot">
          <img
            :src="p.thumbnail"
            :alt="p.alt"
            width="1500"
            height="746"
            loading="lazy"
            decoding="async"
          >
        </div>
        <div class="project-copy">
          <span class="project-number">{{ p.number }}</span>
          <h2>
            {{
              p.title === "Private Resort Website"
                ? "Azure Haven"
                : p.title === "Resort Booking Platform"
                  ? "StayEase"
                  : p.title === "Chris & Micah Wedding RSVP"
                    ? "Chris & Micah"
                    : p.title
            }}
          </h2>
          <h3>
            {{
              p.title === "Private Resort Website"
                ? "Resort Website"
                : p.title === "Resort Booking Platform"
                  ? "Booking Platform"
                  : p.category
            }}
          </h3>
          <p>{{ p.description }}</p>
          <div class="project-tags">
            <small v-for="s in p.services" :key="s">{{ s }}</small>
          </div>
          <a
            :href="p.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`View ${p.title} live project (opens in a new tab)`"
          >
            View Live Project ↗
          </a>
        </div>
      </article>
      <p v-if="!visible.length" class="portfolio-empty" role="status">
        No projects match this category.
      </p>
    </section>
    <section class="portfolio-benefits">
      <p class="section-mark"></p>
      <h2>More than good-looking pages.</h2>
      <div>
        <article>
          <i>▣</i>
          <span>
            <b>Built for every screen</b>
            <small>Responsive across desktop, tablet, and mobile.</small>
          </span>
        </article>
        <article>
          <i>◎</i>
          <span>
            <b>Designed around your goals</b>
            <small>Every section supports a clear business purpose.</small>
          </span>
        </article>
        <article>
          <i>⌁</i>
          <span>
            <b>Ready to grow</b>
            <small>Flexible foundations for future features and content.</small>
          </span>
        </article>
      </div>
    </section>
    <section class="portfolio-cta">
      <div>
        <p>HAVE A PROJECT IN MIND?</p>
        <h2>
          Let’s create a website
          <br >
          worth showing off.
        </h2>
        <span>
          Tell us about your business, goals, and the
          <br >
          experience you want to give your customers.
        </span>
      </div>
      <div>
        <NuxtLink class="orange-cta" to="/contact">Start Your Project</NuxtLink>
        <NuxtLink class="outline-cta" to="/pricing">View Packages</NuxtLink>
      </div>
    </section>
  </div>
</template>

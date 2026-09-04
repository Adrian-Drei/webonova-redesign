<script setup lang="ts">
import { projects } from "~/data/projects";
const { priceFor } = usePricingRegion();
const essentialPrice = computed(() => priceFor("essential"));
const premiumPrice = computed(() => priceFor("premium"));
usePageSeo({
  title: "Webonova | Modern Websites for Ambitious Businesses",
  description:
    "Webonova designs fast, modern websites, booking systems, and responsive digital experiences that help growing businesses build credibility and convert customers.",
  path: "/",
});
const services = [
  [
    "▣",
    "Website Design",
    "Modern, strategic designs that reflect your brand and turn visitors into customers.",
    "website-design",
  ],
  [
    "▤",
    "Responsive Development",
    "Fast, mobile-friendly websites that work seamlessly on every device.",
    "responsive-development",
  ],
  [
    "▦",
    "Booking & Inquiry Systems",
    "Smart forms and booking tools that help you manage inquiries with ease.",
    "booking-inquiry-systems",
  ],
];
const steps = [
  [
    "01",
    "⌕",
    "Discover",
    "We learn about your business, goals, and target audience.",
  ],
  [
    "02",
    "✎",
    "Design",
    "We create a custom design that tells your brand story.",
  ],
  ["03", "</>", "Build", "We develop a fast, secure, and responsive website."],
  [
    "04",
    "↗",
    "Launch",
    "We test, optimize, and launch your site with confidence.",
  ],
];
</script>
<template>
  <div class="home-page">
    <section class="nova-hero">
      <div class="hero-copy">
        <p class="kicker">WEBSITES BUILT TO MOVE YOUR BUSINESS FORWARD</p>
        <h1>
          Your business deserves
          <br >
          more than just a website.
        </h1>
        <p>
          We design fast, modern websites that help your brand look credible,
          connect with customers, and grow online.
        </p>
        <div class="hero-actions">
          <NuxtLink class="primary-cta" to="/contact">Start a Project</NuxtLink>
          <NuxtLink class="text-cta" to="/work">
            View Our Work
            <span>→</span>
          </NuxtLink>
        </div>
      </div>
      <div class="hero-showcase">
        <div class="site-window">
          <div class="window-dots">○ ○ ○</div>
          <img
            src="/projects/resort.webp"
            alt="Luxury resort website displayed on a desktop screen"
            width="1500"
            height="746"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          >
        </div>
        <div class="dash-card">
          <small>DASHBOARD OVERVIEW</small>
          <div>
            <span>
              New Inquiries
              <b>24</b>
            </span>
            <span>
              Bookings
              <b>18</b>
            </span>
            <span>
              Page Views
              <b>3,284</b>
            </span>
          </div>
          <i></i>
        </div>
        <div class="inquiry-card">
          <b>New Inquiry</b>
          <span>Name</span>
          <span>Email</span>
          <span>Message</span>
          <button>Send Inquiry</button>
        </div>
        <div class="mobile-card">
          <b>
            Find stays
            <br >
            that fit your
            <br >
            travel style.
          </b>
          <small>Where to?</small>
          <button>Search Stays</button>
        </div>
        <div class="float-badge badge-responsive">▣ &nbsp; Responsive</div>
        <div class="float-badge badge-fast">ϟ &nbsp; Fast</div>
        <div class="float-badge badge-convert">⌁ &nbsp; Built to Convert</div>
      </div>
    </section>
    <div class="cap-strip">
      <span>✎ &nbsp; DESIGN</span>
      <i>•</i>
      <span>&lt;/&gt; &nbsp; DEVELOPMENT</span>
      <i>•</i>
      <span>▣ &nbsp; RESPONSIVE</span>
      <i>•</i>
      <span>◯ &nbsp; SEO READY</span>
    </div>
    <section id="services" class="light-section services-section">
      <p class="section-mark"></p>
      <h2>Everything you need to launch with confidence.</h2>
      <div class="service-cards">
        <article v-for="s in services" :id="s[3]" :key="s[1]">
          <i>{{ s[0] }}</i>
          <h3>{{ s[1] }}</h3>
          <p>{{ s[2] }}</p>
        </article>
      </div>
    </section>
    <section class="projects-preview">
      <div class="section-heading">
        <p>SELECTED PROJECTS</p>
        <h2>A few things we’ve built.</h2>
      </div>
      <div class="preview-grid">
        <article v-for="p in projects" :key="p.title">
          <img :src="p.thumbnail" :alt="p.alt" width="1500" height="746" loading="lazy" decoding="async" >
          <div>
            <h3>{{ p.title }}</h3>
            <p>{{ p.category }}</p>
            <a :href="p.url" target="_blank" rel="noopener noreferrer">
              View Project ↗
            </a>
          </div>
        </article>
      </div>
    </section>
    <section class="light-section packages-home">
      <p class="section-mark"></p>
      <h2>Simple packages. Clear deliverables.</h2>
      <div class="home-packages">
        <article>
          <p class="package-name">ESSENTIAL</p>
          <h3>{{ essentialPrice.label }}</h3>
          <p>A polished online presence for growing businesses.</p>
          <ul>
            <li>Up to 5 pages</li>
            <li>Responsive design</li>
            <li>Gallery and inquiry form</li>
            <li>Basic SEO setup</li>
            <li>3 revision rounds</li>
          </ul>
          <NuxtLink class="outline-teal" to="/contact?package=essential">
            Choose Essential
          </NuxtLink>
        </article>
        <article class="featured">
          <span>MOST POPULAR</span>
          <p class="package-name">PREMIUM</p>
          <h3>{{ premiumPrice.label }}</h3>
          <p>A complete website with tools to manage content and inquiries.</p>
          <ul>
            <li>Up to 10 pages</li>
            <li>Custom premium design</li>
            <li>Booking and event inquiry forms</li>
            <li>Secure admin dashboard</li>
            <li>Google Analytics</li>
            <li>30 days technical support</li>
            <li>3 revision rounds</li>
          </ul>
          <NuxtLink class="orange-cta" to="/contact?package=premium">
            Choose Premium
          </NuxtLink>
        </article>
      </div>
    </section>
    <section id="process" class="process-section">
      <p class="section-mark"></p>
      <h2>From idea to launch</h2>
      <div class="process-grid">
        <article v-for="s in steps" :key="s[0]">
          <b>{{ s[0] }}</b>
          <div>
            <h3>
              <span>{{ s[1] }}</span>
              {{ s[2] }}
            </h3>
            <p>{{ s[3] }}</p>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

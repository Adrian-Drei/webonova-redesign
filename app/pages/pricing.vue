<script setup lang="ts">
usePageSeo({
  title: "Website Design Packages and Pricing | Webonova",
  description:
    "Compare Webonova website packages, including regional Essential pricing for Philippine and international clients.",
  path: "/pricing",
});
const { region, selectRegion, priceFor } = usePricingRegion();
const essentialPrice = computed(() => priceFor("essential"));
const premiumPrice = computed(() => priceFor("premium"));
const essential = [
  "Responsive mobile and desktop design",
  "Accommodation or service listings",
  "Rates and packages section",
  "Photo gallery",
  "Reservation inquiry form",
  "Google Maps integration",
  "Social media and contact buttons",
  "Basic SEO setup",
  "Domain and hosting connection",
  "3 revision rounds",
];
const premiumA = [
  "Custom premium responsive design",
  "Individual accommodation or service pages",
  "Rates, packages, promotions, and advanced gallery",
  "Booking request form with dates and guest count",
  "Events and wedding inquiry form",
];
const premiumB = [
  "Manage rooms, rates, packages, amenities, and photos",
  "View and manage booking and event inquiries",
  "Booking status management",
  "Search and filter inquiries",
];
const premiumC = [
  "Basic SEO and Google Analytics",
  "Domain and hosting connection",
  "Basic dashboard training",
  "3 revision rounds",
  "30 days technical support",
];
const compare = [
  ["Website pages", "Up to 5", "Up to 10"],
  ["Responsive design", "✓", "✓"],
  ["Booking inquiry", "✓", "✓"],
  ["Detailed service pages", "—", "✓"],
  ["Events inquiry", "—", "✓"],
  ["Admin dashboard", "—", "✓"],
  ["Content management", "—", "✓"],
  ["Inquiry management", "—", "✓"],
  ["Google Analytics", "—", "✓"],
  ["Dashboard training", "—", "✓"],
  ["Technical support", "—", "30 days"],
];
const faqs = [
  [
    "Are domain and hosting fees included?",
    "Domain and hosting connection is included. The actual domain, hosting, third-party subscriptions, and payment gateway fees are billed separately unless stated in your agreement.",
  ],
  [
    "What content do I need to provide?",
    "Your logo, brand details, page copy, pricing, photos, contact information, and any required policies.",
  ],
  [
    "What counts as a revision round?",
    "One consolidated list of requested changes submitted at the same time. Both packages include three rounds.",
  ],
  [
    "Can I request additional pages or features?",
    "Yes. Additional pages and features are quoted separately before work begins.",
  ],
  [
    "How long will the website take?",
    "Typical projects take three to six weeks, depending on content readiness, scope, and feedback timing.",
  ],
];
const openFaq = ref<number | null>(0);

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index;
}
</script>
<template>
  <div class="pricing-page">
    <section class="pricing-hero">
      <div>
        <p>WEBSITE PACKAGES</p>
        <h1>
          Clear pricing. A website
          <br >
          built around your goals.
        </h1>
        <span>
          Choose a strong online presence or a complete website
          <br >
          with content and inquiry management.
        </span>
        <div class="pricing-promises">
          <b>
            ◯
            <small>3 revision rounds included</small>
          </b>
          <b>
            ▣
            <small>Responsive on every device</small>
          </b>
        </div>
      </div>
      <div class="pricing-visual" aria-hidden="true">
        <div class="visual-window">
          <i></i>
          <div class="visual-chart"></div>
          <div class="visual-donut"></div>
          <div class="visual-list">
            ○ &nbsp; ─────
            <br >
            ○ &nbsp; ───
            <br >
            ○ &nbsp; ──────
          </div>
        </div>
      </div>
    </section>
    <section class="package-choice">
      <p>CHOOSE YOUR PACKAGE</p>
      <h2>Start simple—or give your business room to grow.</h2>
      <div class="region-selector" aria-label="Pricing region">
        <span>Show pricing for</span>
        <div role="group" aria-label="Select your pricing region">
          <button
            type="button"
            :aria-pressed="region === 'PH'"
            :class="{ active: region === 'PH' }"
            @click="selectRegion('PH')"
          >
            Philippines
          </button>
          <button
            type="button"
            :aria-pressed="region === 'INTERNATIONAL'"
            :class="{ active: region === 'INTERNATIONAL' }"
            @click="selectRegion('INTERNATIONAL')"
          >
            International
          </button>
        </div>
      </div>
      <p class="region-note">
        Prices shown in PHP for clients in the Philippines and USD for
        international clients.
      </p>
      <div class="two-packages">
        <article>
          <h3>ESSENTIAL</h3>
          <strong>{{ essentialPrice.label }}</strong>
          <p>
            For businesses that need a polished and professional online
            presence.
          </p>
          <b>Up to 5 website pages</b>
          <hr >
          <h4>WHAT’S INCLUDED</h4>
          <ul>
            <li v-for="x in essential" :key="x">{{ x }}</li>
          </ul>
          <NuxtLink class="outline-teal" to="/contact?package=essential">
            Choose Essential
          </NuxtLink>
          <small>Best for a focused informational website</small>
        </article>
        <article class="premium-card">
          <span>MOST POPULAR</span>
          <h3>PREMIUM</h3>
          <strong>{{ premiumPrice.label }}</strong>
          <p>
            For businesses that need a custom website and tools to manage
            content and inquiries.
          </p>
          <b>Up to 10 website pages</b>
          <hr >
          <h4>PREMIUM WEBSITE</h4>
          <ul>
            <li v-for="x in premiumA" :key="x">{{ x }}</li>
          </ul>
          <hr >
          <h4>SECURE ADMIN DASHBOARD</h4>
          <ul>
            <li v-for="x in premiumB" :key="x">{{ x }}</li>
          </ul>
          <hr >
          <h4>LAUNCH & SUPPORT</h4>
          <ul>
            <li v-for="x in premiumC" :key="x">{{ x }}</li>
          </ul>
          <NuxtLink class="orange-cta" to="/contact?package=premium">
            Choose Premium
          </NuxtLink>
          <small>Best for businesses managing regular inquiries</small>
        </article>
      </div>
      <p class="scope-note">
        No hidden development charges within the agreed package scope.
      </p>
    </section>
    <section class="compare-section">
      <h2>Compare the packages</h2>
      <div class="comparison !mt-5" role="table" aria-label="Package comparison">
        <div class="comparison-head" role="row">
          <b>Feature</b>
          <b>Essential</b>
          <b>Premium</b>
        </div>
        <div v-for="r in compare" :key="r[0]" role="row">
          <span>{{ r[0] }}</span>
          <span>{{ r[1] }}</span>
          <span>{{ r[2] }}</span>
        </div>
      </div>
    </section>
    <section class="pricing-process">
      <h2 class="mb-5">From your first message to launch.</h2>
      <div>
        <article
          v-for="s in [
            [
              '01',
              'Tell us about your project',
              'Share your goals, content, and preferences.',
            ],
            [
              '02',
              'Confirm your package',
              'We’ll recommend the best option and finalize the plan.',
            ],
            [
              '03',
              'Design and development',
              'We build your website and keep you updated along the way.',
            ],
            [
              '04',
              'Review and launch',
              'We refine, test, and launch your website with confidence.',
            ],
          ]"
          :key="s[0]"
        >
          <b>{{ s[0] }}</b>
          <h3>{{ s[1] }}</h3>
          <p>{{ s[2] }}</p>
        </article>
      </div>
    </section>
    <section class="pricing-faq">
      <h2>
        Questions
        <br >
        before we begin?
      </h2>

      <div>
        <article
          v-for="(faq, index) in faqs"
          :key="faq[0]"
          class="border-b border-slate-300"
        >
          <h3>
            <button
              type="button"
              class="flex w-full items-center justify-between gap-6 py-5 text-left"
              :aria-expanded="openFaq === index"
              :aria-controls="`pricing-faq-${index}`"
              @click="toggleFaq(index)"
            >
              <span>{{ faq[0] }}</span>

              <span
                aria-hidden="true"
                class="shrink-0 text-2xl font-light transition-transform duration-300"
                :class="{ 'rotate-45': openFaq === index }"
              >
                +
              </span>
            </button>
          </h3>

          <div
            :id="`pricing-faq-${index}`"
            class="faq-answer grid"
            :class="openFaq === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
          >
            <div class="overflow-hidden">
              <p class="pb-5 pr-12">
                {{ faq[1] }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
    <section class="pricing-cta">
      <div>
        <p>NOT SURE WHICH PACKAGE FITS?</p>
        <h2>
          Tell us what you need.
          <br >
          We’ll point you in the right direction.
        </h2>
      </div>
      <div>
        <NuxtLink class="orange-cta" to="/contact">
          Discuss Your Project
        </NuxtLink>
        <NuxtLink class="outline-cta" to="/work">View Our Work</NuxtLink>
      </div>
    </section>
  </div>
</template>

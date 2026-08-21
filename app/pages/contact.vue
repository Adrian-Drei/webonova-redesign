<script setup lang="ts">
usePageSeo({
  title: "Start a Website Design Project | Webonova",
  description:
    "Tell Webonova about your business, website goals, preferred package, and timeline. We typically reply within one to two business days.",
  path: "/contact",
});
const route = useRoute();
const startedAt = Date.now();
const services = [
  ["business", "▣", "Business Website"],
  ["hospitality", "♧", "Resort / Hospitality"],
  ["booking", "▦", "Booking Website"],
  ["events", "◎", "Event / Wedding"],
  ["other", "•••", "Other"],
];

const faqs = [
  {
    question: "What information should I prepare?",
    answer:
      "A short description of your business, your preferred pages or features, and any target launch date is enough to begin.",
  },
  {
    question: "Can you help me choose a package?",
    answer:
      "Yes. Choose “Not sure yet” and we’ll recommend the best fit after reviewing your goals.",
  },
  {
    question: "Do I need my content and photos ready?",
    answer:
      "No. We can start with your plan and confirm a content checklist before design begins.",
  },
  {
    question: "Are domain and hosting fees included?",
    answer: "Connection is included; provider fees are billed separately.",
  },
];

const openFaq = ref<number | null>(0);

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index;
}

const form = reactive({
  name: "",
  email: "",
  company: "",
  phone: "",
  service: String(route.query.service || ""),
  package: String(route.query.package || "unsure"),
  launch: "",
  budget: "",
  description: "",
  consent: false,
  website: "",
});
const errors = ref<Record<string, string>>({});
const status = ref<"idle" | "sending" | "success" | "error">("idle");
const message = ref("");
const submission = useInquirySubmissionStore();
const serviceValues = services.map((service) => service[0]);
const packageValues = ["essential", "premium", "unsure"];
watch(
  () => route.query.service,
  (value) => {
    const next = typeof value === "string" ? value : "";
    form.service = serviceValues.includes(next) ? next : "";
  },
);
watch(
  () => route.query.package,
  (value) => {
    const next = typeof value === "string" ? value : "unsure";
    form.package = packageValues.includes(next) ? next : "unsure";
  },
);
function validate() {
  const next: Record<string, string> = {};
  if (!form.name.trim()) next.name = "Please enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(form.email))
    next.email = "Please enter a valid email address.";
  if (!/^[+()\d\s.-]{7,30}$/.test(form.phone.trim()))
    next.phone = "Please enter a valid phone number.";
  if (!form.service)
    next.service = "Please select the type of website you need.";
  if (form.description.trim().length < 20)
    next.description =
      "Please share at least 20 characters about your project.";
  if (!form.consent)
    next.consent = "Please confirm that we may respond to your inquiry.";
  errors.value = next;
  return !Object.keys(next).length;
}
async function send() {
  if (!validate()) return;
  status.value = "sending";
  message.value = "";
  submission.start(form.name);
  try {
    await $fetch("/api/inquiries", {
      method: "POST",
      body: { ...form, startedAt },
    });
    status.value = "success";
    message.value =
      "Your inquiry was received. We’ll reply within 1–2 business days.";
    submission.succeed(
      "Your inquiry was received and securely saved. We’ll review your project and reply within 1–2 business days.",
    );
  } catch (e: unknown) {
    const failure = e as { data?: { statusMessage?: string } };
    status.value = "error";
    message.value =
      failure.data?.statusMessage ||
      "We could not save your inquiry. Please try again or email webonovasupport@gmail.com.";
    submission.fail(message.value);
  }
}
</script>
<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div>
        <p>START A CONVERSATION</p>
        <h1>
          Tell us what you
          <br >
          want to build.
        </h1>
        <span>
          Share a little about your business and your website goals.
          <br >
          We’ll review your inquiry and get back to you with the best next step.
        </span>
        <div>
          <b>
            ◌
            <small>No-pressure consultation</small>
          </b>
          <b>
            ◷
            <small>Replies within 1–2 business days</small>
          </b>
        </div>
      </div>
      <div class="contact-diagram" aria-hidden="true">
        <div class="inbox-box">
          ○ &nbsp; ───
          <br >
          <br >
          ─────
          <br >
          ────
          <br >
          <br >
          ◇
        </div>
        <div class="db-icon">
          ▤
          <small>secure</small>
        </div>
        <div class="lead-cards">
          <i>◎ &nbsp; ─────</i>
          <i>◎ &nbsp; ─────</i>
          <i>◎ &nbsp; ─────</i>
        </div>
      </div>
    </section>
    <section class="inquiry-area">
      <aside>
        <p>LET’S WORK TOGETHER</p>
        <h2>
          A few details are
          <br >
          all we need.
        </h2>
        <span>
          Whether you already know the package you want or you’re still
          exploring, send us the basics and we’ll help you shape the right
          solution.
        </span>
        <div class="contact-facts">
          <b>
            ✉
            <small>
              Email
              <br >
              <a href="mailto:webonovasupport@gmail.com">webonovasupport@gmail.com</a>
            </small>
          </b>
          <b>
            ⌖
            <small>
              Location
              <br >
              Philippines · Available worldwide
            </small>
          </b>
          <b>
            ◷
            <small>
              Availability
              <br >
              Accepting new projects
            </small>
          </b>
        </div>
        <div class="after-submit space-y-3">
          <h3>What happens after you submit?</h3>
          <p>
            <b>01</b>
            We review your inquiry
          </p>
          <p>
            <b>02</b>
            We reply with questions or recommendations
          </p>
          <p>
            <b>03</b>
            We confirm scope, timeline, and package
          </p>
        </div>
        <NuxtLink to="/work">
          Prefer to see our work first?
          <br >
          <strong>View Projects ↗</strong>
        </NuxtLink>
      </aside>
      <form id="project-inquiry" class="inquiry-form" novalidate @submit.prevent="send">
        <div class="form-heading">
          <h2>Project inquiry</h2>
          <small>Fields marked with * are required.</small>
        </div>
        <div v-if="status === 'success'" class="form-success" role="status">
          <b>✓ Inquiry received</b>
          <p>{{ message }}</p>
        </div>
        <div v-else-if="status === 'error'" class="form-error" role="alert">
          {{ message }}
        </div>
        <div class="field-grid">
          <label>
            Full name *
            <input
              v-model="form.name"
              autocomplete="name"
              placeholder="Your name"
              :aria-invalid="!!errors.name"
            >
            <small v-if="errors.name" role="alert">{{ errors.name }}</small>
          </label>
          <label>
            Email address *
            <input
              v-model="form.email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              :aria-invalid="!!errors.email"
            >
            <small v-if="errors.email" role="alert">{{ errors.email }}</small>
          </label>
          <label>
            Business or brand name
            <input
              v-model="form.company"
              autocomplete="organization"
              placeholder="Your business name"
            >
          </label>
          <label>
            Phone number *
            <input
              v-model="form.phone"
              type="tel"
              autocomplete="tel"
              placeholder="+63 9XX XXX XXXX"
              required
              :aria-invalid="!!errors.phone"
            >
            <small v-if="errors.phone" role="alert">{{ errors.phone }}</small>
          </label>
        </div>
        <fieldset>
          <legend>What type of website do you need? *</legend>
          <div class="service-options">
            <label
              v-for="s in services"
              :key="s[0]"
              :class="{ selected: form.service === s[0] }"
            >
              <input v-model="form.service" type="radio" :value="s[0]" >
              <i>{{ s[1] }}</i>
              <span>{{ s[2] }}</span>
            </label>
          </div>
          <small v-if="errors.service" class="field-error" role="alert">
            {{ errors.service }}
          </small>
        </fieldset>
        <fieldset>
          <legend>Do you have a package in mind?</legend>
          <div class="package-options">
            <label :class="{ selected: form.package === 'essential' }">
              <input v-model="form.package" type="radio" value="essential" >
              <span>
                <b>Essential</b>
                <small>₱10,000</small>
              </span>
            </label>
            <label :class="{ selected: form.package === 'premium' }">
              <input v-model="form.package" type="radio" value="premium" >
              <span>
                <b>Premium</b>
                <small>₱25,000</small>
              </span>
            </label>
            <label :class="{ selected: form.package === 'unsure' }">
              <input v-model="form.package" type="radio" value="unsure" >
              <span><b>Not sure yet</b></span>
            </label>
          </div>
        </fieldset>
        <div class="field-grid">
          <label>
            When would you like to launch?
            <select v-model="form.launch">
              <option value="">Select a preferred timeline</option>
              <option>Within 1 month</option>
              <option>1–2 months</option>
              <option>3+ months</option>
              <option>Flexible</option>
            </select>
          </label>
          <label>
            Estimated budget
            <select v-model="form.budget">
              <option value="">Select a budget range</option>
              <option>₱10,000</option>
              <option>₱25,000</option>
            </select>
          </label>
        </div>
        <label class="full-field">
          Tell us about your project *
          <textarea
            v-model="form.description"
            maxlength="1500"
            rows="6"
            placeholder="What does your business do, what pages or features do you need, and what would make this project successful?"
            :aria-invalid="!!errors.description"
          ></textarea>
          <small>{{ form.description.length }} / 1,500</small>
          <em v-if="errors.description" role="alert">{{ errors.description }}</em>
        </label>
        <label class="consent">
          <input v-model="form.consent" type="checkbox" >
          I agree that Webonova may use the information provided to respond to
          my inquiry.
        </label>
        <small v-if="errors.consent" class="field-error" role="alert">
          {{ errors.consent }}
        </small>
        <label class="honeypot" aria-hidden="true">
          Website
          <input v-model="form.website" tabindex="-1" autocomplete="off" >
        </label>
        <button
          class="orange-cta submit-inquiry"
          :class="{ 'is-loading': status === 'sending' }"
          type="submit"
          :disabled="status === 'sending' || status === 'success'"
        >
          {{
            status === "sending"
              ? "Securely saving…"
              : status === "success"
                ? "Inquiry received"
                : "Send Project Inquiry"
          }}
        </button>
        <p class="secure-note">
          ▣ &nbsp; Your inquiry is securely stored and used only to respond to
          your project request.
        </p>
      </form>
    </section>
    <section class="contact-links">
      <h2>Looking for something specific?</h2>
      <div>
        <NuxtLink to="/pricing">
          <i>▤</i>
          <span>
            <b>View Packages</b>
            <small>Compare the Essential and Premium options.</small>
            <strong>See Pricing ↗</strong>
          </span>
        </NuxtLink>
        <NuxtLink to="/work">
          <i>▣</i>
          <span>
            <b>Browse Projects</b>
            <small>
              See websites across hospitality, booking, construction, and
              events.
            </small>
            <strong>View Work ↗</strong>
          </span>
        </NuxtLink>
        <a href="mailto:webonovasupport@gmail.com">
          <i>◌</i>
          <span>
            <b>Ask a Quick Question</b>
            <small>Not ready for a full project brief?</small>
            <strong>Send an Email ↗</strong>
          </span>
        </a>
      </div>
    </section>
    <section class="contact-faq">
      <h2>Before you hit send</h2>
      <div>
        <article
          v-for="(faq, index) in faqs"
          :key="faq.question"
          class="border-b border-white/20"
        >
          <h3>
            <button
              type="button"
              class="flex w-full items-center justify-between gap-6 py-5 text-left"
              :aria-expanded="openFaq === index"
              :aria-controls="`faq-answer-${index}`"
              @click="toggleFaq(index)"
            >
              <span>{{ faq.question }}</span>
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
            :id="`faq-answer-${index}`"
            class="faq-answer grid"
            :class="openFaq === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
          >
            <div class="overflow-hidden">
              <p class="pb-5 pr-12">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
    <section class="contact-bottom">
      <h2>You don’t need to have everything figured out.</h2>
      <p>Start with what you know. We’ll help organize the rest.</p>
      <a class="orange-cta" href="#project-inquiry">Send Your Inquiry</a>
    </section>
  </div>
</template>

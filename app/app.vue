<script setup lang="ts">
const config = useRuntimeConfig();
const siteUrl = String(config.public.siteUrl).replace(/\/$/, "");
useHead({
  titleTemplate: (title) => {
    if (!title) return "Webonova | Website Design and Development";
    return title.includes("Webonova") ? title : `${title} | Webonova`;
  },
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": `${siteUrl}/#organization`,
          name: "Webonova",
          url: siteUrl,
          logo: `${siteUrl}/brand/webonova-logo.webp`,
          image: `${siteUrl}/og.png`,
          email: "webonovasupport@gmail.com",
          areaServed: "Worldwide",
          description:
            "Webonova designs and develops modern websites, booking systems, and responsive digital experiences for growing businesses.",
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          name: "Webonova",
          url: siteUrl,
          publisher: { "@id": `${siteUrl}/#organization` },
        },
      ]),
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

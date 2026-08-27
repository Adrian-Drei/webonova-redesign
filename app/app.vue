<script setup lang="ts">
const config = useRuntimeConfig();
const siteUrl = String(config.public.siteUrl).replace(/\/$/, "");
const googleAnalyticsId = /^G-[A-Z0-9]+$/i.test(
  String(config.public.googleAnalyticsId),
)
  ? String(config.public.googleAnalyticsId)
  : "";
const microsoftClarityId = /^[a-z0-9]+$/i.test(
  String(config.public.microsoftClarityId),
)
  ? String(config.public.microsoftClarityId)
  : "";

const analyticsScripts = [
  ...(googleAnalyticsId
    ? [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsId)}`,
          async: true,
        },
        {
          innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAnalyticsId}');`,
        },
      ]
    : []),
  ...(microsoftClarityId
    ? [
        {
          innerHTML: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script','${microsoftClarityId}');`,
        },
      ]
    : []),
];

useHead({
  titleTemplate: (title) => {
    if (!title) return "Webonova | Website Design and Development";
    return title.includes("Webonova") ? title : `${title} | Webonova`;
  },
  script: [
    ...analyticsScripts,
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": `${siteUrl}/#organization`,
          name: "Webonova",
          url: siteUrl,
          logo: `${siteUrl}/brand/webonova-logo-dark.webp`,
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

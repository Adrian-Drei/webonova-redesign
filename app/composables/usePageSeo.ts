interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export function usePageSeo(options: PageSeoOptions) {
  const config = useRuntimeConfig();
  const siteUrl = String(config.public.siteUrl).replace(/\/$/, "");
  const canonical = `${siteUrl}${options.path === "/" ? "/" : options.path}`;
  const imagePath = options.image || "/og.png";
  const image = `${siteUrl}${imagePath}`;
  const imageType = imagePath.toLowerCase().endsWith(".png")
    ? "image/png"
    : "image/webp";

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: "website",
    ogUrl: canonical,
    ogImage: image,
    ogImageAlt:
      options.imageAlt || "Webonova website design and development preview",
    ogImageWidth: options.imageWidth || 1200,
    ogImageHeight: options.imageHeight || 630,
    ogImageType: imageType,
    ogSiteName: "Webonova",
    twitterCard: "summary_large_image",
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: image,
    twitterImageAlt:
      options.imageAlt || "Webonova website design and development preview",
  });
  useHead({
    link: [{ rel: "canonical", href: canonical }],
    meta: config.public.facebookAppId
      ? [
          {
            property: "fb:app_id",
            content: String(config.public.facebookAppId),
          },
        ]
      : [],
  });
}

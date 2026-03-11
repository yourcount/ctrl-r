import groq from "groq";

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    title,
    intro,
    trustItems,
    "services": services[]->{title, summary},
    "primaryCta": primaryCta->{label, href, variant, trackingId},
    "secondaryCta": secondaryCta->{label, href, variant, trackingId}
  }
`;

export const projectCasesQuery = groq`
  *[_type == "projectCase"] | order(coalesce(orderRank, publishedAt) desc) {
    "slug": slug.current,
    title,
    subtitle,
    summary,
    body,
    liveUrl,
    "imageUrl": coalesce(imageUrl, image.asset->url),
    publishedAt
  }
`;

export const projectCaseBySlugQuery = groq`
  *[_type == "projectCase" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    subtitle,
    summary,
    body,
    liveUrl,
    "imageUrl": coalesce(imageUrl, image.asset->url),
    publishedAt
  }
`;

export const contactInfoQuery = groq`
  *[_type == "contactInfo"][0]{
    email,
    phone,
    intro
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteTitle,
    siteUrl,
    organizationName,
    organizationDescription,
    "primaryCta": primaryCta->{label, href, variant, trackingId}
  }
`;

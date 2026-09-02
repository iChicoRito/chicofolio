const fallbackSiteOrigin = "http://localhost:3000";
const configuredSiteOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = new URL(configuredSiteOrigin || fallbackSiteOrigin);

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

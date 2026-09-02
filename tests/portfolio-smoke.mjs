import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:3000";

async function getPage(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`);
  const html = await response.text();
  assert.equal(response.status, 200, `${pathname} returned ${response.status}`);
  return html;
}

test("home exposes the focused value proposition and contact path", async () => {
  const html = await getPage("/");
  assert.match(html, /I turn complex workflows into clear, useful products\./);
  assert.match(html, /Let's work together|Let’s work together/);
  assert.match(html, /#contact/);
});

test("project details expose a useful action label", async () => {
  const html = await getPage("/projects/7");
  assert.match(html, /View repository/);
  assert.doesNotMatch(html, />Visit Site</);
});

test("project details expose project-specific metadata", async () => {
  const html = await getPage("/projects/7");
  assert.match(html, /<title>RemindLy — ChicoFolio<\/title>/);
});

test("SEO routes expose sitemap entries and robots sitemap", async () => {
  const [sitemapResponse, robotsResponse] = await Promise.all([
    fetch(`${baseUrl}/sitemap.xml`),
    fetch(`${baseUrl}/robots.txt`),
  ]);
  const [sitemap, robots] = await Promise.all([sitemapResponse.text(), robotsResponse.text()]);

  assert.equal(sitemapResponse.status, 200, `/sitemap.xml returned ${sitemapResponse.status}`);
  assert.equal(robotsResponse.status, 200, `/robots.txt returned ${robotsResponse.status}`);
  assert.match(sitemap, /\/projects\/7/);
  assert.match(sitemap, /\/about/);
  assert.match(robots, /\/sitemap\.xml/);
});

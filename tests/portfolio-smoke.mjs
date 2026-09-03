import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:3000";

async function getPage(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`);
  const html = await response.text();
  assert.equal(response.status, 200, `${pathname} returned ${response.status}`);
  return html;
}

test("home exposes the profile identity, image, and contact path", async () => {
  const html = await getPage("/");
  assert.match(html, /Mark Adrianne Salunga/);
  assert.match(html, /profile-photo\.png/);
  assert.match(html, /Let's work together|Let’s work together/);
  assert.match(html, /#contact/);
});

test("contact section exposes configured social links", async () => {
  const html = await getPage("/");

  assert.match(html, /href="https:\/\/github\.com\/iChicoRito"/);
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/in\/salungamarkadrianne\/"/);
  assert.match(html, />GitHub</);
  assert.match(html, />LinkedIn</);
  assert.match(html, /Find me online/);
  assert.match(html, /Social profiles/);
  assert.match(html, /public links/);
  assert.match(html, /aria-label="Open GitHub profile in a new tab"/);
  assert.match(html, /aria-label="Open LinkedIn profile in a new tab"/);
  assert.match(html, /rel="noopener noreferrer"/);
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

test("contact section exposes an accessible working-form contract", async () => {
  const html = await getPage("/");
  assert.match(html, /id="contact-name"/);
  assert.match(html, /auto[Cc]omplete="name"/);
  assert.match(html, /id="contact-email"/);
  assert.match(html, /type="email"/);
  assert.match(html, /id="contact-message"/);
  assert.match(html, />Send message</);
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

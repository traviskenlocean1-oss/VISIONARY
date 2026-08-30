const BASE = 'https://getvisionarywebstudio.com';

/* Mirrors the client-side per-route title/description map in index.html
   (the "Dynamic per-page title + meta description for SPA SEO" block) so a
   crawler that never runs the JS still sees correct, page-specific tags. */
const PAGES = {
  '/':        { title: 'Visionary Web Studio | Custom Web Design Agency Miami, FL',
                desc:  'Miami-based custom web design agency. High-converting websites built from scratch — no templates, no shortcuts. Get a free quote today.' },
  '/about':   { title: 'About Us | Visionary Web Studio — Miami Web Design Agency',
                desc:  'Meet the team behind Visionary Web Studio. Miami-based designers obsessed with helping businesses grow through powerful, custom-built websites.' },
  '/services':{ title: 'Web Design Services Miami | Custom Websites, SEO & Branding',
                desc:  'Custom web design, e-commerce development, brand identity, and SEO services in Miami, FL. Every project built from scratch — no shortcuts.' },
  '/pricing': { title: 'Web Design Pricing Miami | Transparent & Affordable | VWS',
                desc:  'Clear, upfront pricing for custom web design. No hidden fees. See what you get and start building the website your business deserves.' },
  '/work':    { title: 'Portfolio | Our Web Design Work | Visionary Web Studio Miami',
                desc:  'Browse our portfolio of custom websites built for businesses across South Florida and beyond. See what Visionary Web Studio can do for your brand.' },
  '/contact': { title: 'Contact Us | Start Your Project | Visionary Web Studio Miami',
                desc:  'Ready to transform your online presence? Contact Visionary Web Studio in Miami, FL. We respond within 24 hours — usually same day.' }
};

class TextContentRewriter {
  // NOTE: do not name this field "text" — HTMLRewriter's handler binding
  // treats any "text" property on a handler object as the text-node
  // callback slot and throws if it isn't a function (this broke every
  // route through the title rewriter in production the first time).
  constructor(value) { this.value = value; }
  element(element) { element.setInnerContent(this.value); }
}
class AttrRewriter {
  constructor(attr, value) { this.attr = attr; this.value = value; }
  element(element) { element.setAttribute(this.attr, this.value); }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);

    // HTML routes (no file extension, or ends with .html) must stay fresh.
    // Hashed asset files (e.g. assets/index-CNkA1Y-Q.js) keep their default CDN cache.
    const isHTML = !url.pathname.match(/\.[a-z0-9]{2,8}(\?.*)?$/i)
      || url.pathname.endsWith('.html');

    if (!isHTML) return response;

    const headers = new Headers(response.headers);
    // Short, safe cache instead of no-store: lets repeat visits/crawls reuse
    // the page for a minute instead of re-downloading the full ~1MB bundle
    // every single time, while still catching edits within minutes.
    headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    headers.delete('Pragma');

    const slug = url.pathname.replace(/\/$/, '') || '/';
    const meta = PAGES[slug];

    const base = new Response(response.body, { status: response.status, headers });
    if (!meta) return base;

    const canonical = BASE + (slug === '/' ? '/' : slug + '/');
    return new HTMLRewriter()
      .on('title', new TextContentRewriter(meta.title))
      .on('meta[name="description"]', new AttrRewriter('content', meta.desc))
      .on('meta[property="og:url"]', new AttrRewriter('content', canonical))
      .on('meta[property="og:title"]', new AttrRewriter('content', meta.title))
      .on('meta[property="og:description"]', new AttrRewriter('content', meta.desc))
      .on('meta[name="twitter:title"]', new AttrRewriter('content', meta.title))
      .on('meta[name="twitter:description"]', new AttrRewriter('content', meta.desc))
      .on('link[rel="canonical"]', new AttrRewriter('href', canonical))
      .transform(base);
  }
};

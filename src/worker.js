export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);

    // HTML routes (no file extension, or ends with .html) must never be cached.
    // Hashed asset files (e.g. assets/index-CNkA1Y-Q.js) keep their default CDN cache.
    const isHTML = !url.pathname.match(/\.[a-z0-9]{2,8}(\?.*)?$/i)
      || url.pathname.endsWith('.html');

    if (isHTML) {
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
      headers.set('Pragma', 'no-cache');
      return new Response(response.body, { status: response.status, headers });
    }

    return response;
  }
};

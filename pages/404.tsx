import Head from "next/head";
import ErrorPage from "next/error";

// GitHub Pages serves this page for every unknown path. Vercel used to redirect "/x/" to "/x",
// and GitHub Pages does not, so retry once without the trailing slash (and in lowercase). The
// sessionStorage guard stops a retry loop when the retried path is missing too.
const RECOVER_URL_SCRIPT = `(function () {
  var path = location.pathname;
  var target = path.replace(/\\/+$/, '').toLowerCase() || '/';
  if (target === path) return;
  try {
    var last = JSON.parse(sessionStorage.getItem('june-404-retry') || 'null');
    if (last && last.target === target && Date.now() - last.at < 10000) return;
    sessionStorage.setItem('june-404-retry', JSON.stringify({ target: target, at: Date.now() }));
  } catch (e) {
    return;
  }
  location.replace(location.origin + target + location.search + location.hash);
})();`;

export default function NotFound() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <script dangerouslySetInnerHTML={{ __html: RECOVER_URL_SCRIPT }} />
      </Head>
      <ErrorPage statusCode={404} />
    </>
  );
}

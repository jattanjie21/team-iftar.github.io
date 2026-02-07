import { readBodyFromHtmlFile, stripScriptTags } from '../lib/static-html';

export default function Home({ bodyHtml }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
      <script src="/assets/vendor/aos/aos.js"></script>
      <script src="/assets/vendor/swiper/swiper-bundle.min.js"></script>
      <script src="/assets/vendor/purecounter/purecounter.js"></script>
      <script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
      <script src="/assets/vendor/glightbox/js/glightbox.min.js"></script>
      <script src="/assets/js/main.js"></script>
    </>
  );
}

export function getStaticProps() {
  const bodyHtml = stripScriptTags(readBodyFromHtmlFile('index.html'));
  return {
    props: {
      bodyHtml
    }
  };
}

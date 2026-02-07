import { readBodyFromHtmlFile } from '../lib/static-html';

export default function AboutUs({ bodyHtml }) {
  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}

export function getStaticProps() {
  const bodyHtml = readBodyFromHtmlFile('about-us.html');
  return {
    props: {
      bodyHtml
    }
  };
}

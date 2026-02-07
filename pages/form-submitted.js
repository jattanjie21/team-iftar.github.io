import { readBodyFromHtmlFile } from '../lib/static-html';

export default function FormSubmitted({ bodyHtml }) {
  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}

export function getStaticProps() {
  const bodyHtml = readBodyFromHtmlFile('form-submitted.html');
  return {
    props: {
      bodyHtml
    }
  };
}

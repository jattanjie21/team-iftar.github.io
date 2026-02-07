import fs from 'fs';
import path from 'path';

function extractBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1].trim() : '';
}

function readHtmlFile(fileName) {
  const filePath = path.join(process.cwd(), fileName);
  return fs.readFileSync(filePath, 'utf8');
}

function extractRequired(content, regex, label) {
  const match = content.match(regex);
  if (!match) {
    throw new Error(`Unable to extract ${label} from index.html`);
  }
  return match[0].trim();
}

export function readBodyFromHtmlFile(fileName) {
  const html = readHtmlFile(fileName);
  return extractBody(html);
}

export function stripScriptTags(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, '').trim();
}

export function readIndexShell() {
  const bodyHtml = stripScriptTags(readBodyFromHtmlFile('index.html'));

  const headerHtml = extractRequired(
    bodyHtml,
    /<header id="header"[\s\S]*?<\/header><!-- End Header -->/i,
    'header'
  );

  const footerHtml = extractRequired(
    bodyHtml,
    /<footer id="footer"[\s\S]*?<\/footer><!-- End Footer -->/i,
    'footer'
  );

  return {
    headerHtml,
    footerHtml
  };
}

export function readIndexSection(sectionId) {
  const bodyHtml = stripScriptTags(readBodyFromHtmlFile('index.html'));
  const sectionRegex = new RegExp(
    `<section id="${sectionId}"[\\s\\S]*?<\\/section>(?:<!--[^>]*-->)?`,
    'i'
  );

  const match = bodyHtml.match(sectionRegex);
  if (!match) {
    throw new Error(`Unable to extract section #${sectionId} from index.html`);
  }

  return match[0].trim();
}

export function readIndexGetStartedBlock() {
  const bodyHtml = stripScriptTags(readBodyFromHtmlFile('index.html'));

  return extractRequired(
    bodyHtml,
    /<div id="get-started" class="footer-volunteer section-header">[\s\S]*?<\/div>\s*<\/div>/i,
    'get-started block'
  );
}

export function readIndexFooterWithoutGetStarted() {
  const { footerHtml } = readIndexShell();
  return footerHtml
    .replace(
      /<div id="get-started" class="footer-volunteer section-header">[\s\S]*?<\/div>\s*<\/div>/i,
      ''
    )
    .trim();
}

import axios from 'axios';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

// Cache for loaded documents to prevent redundant network requests
const docCache = new Map();

/**
 * Creates and configures a TurndownService instance optimized for Google Docs HTML.
 */
export function createDocTurndownService() {
  const service = new TurndownService({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '*'
  });

  service.use(gfm);

  // Clean Google redirect links (e.g., https://www.google.com/url?q=https://...)
  service.addRule('cleanGoogleRedirects', {
    filter: function (node) {
      return (
        node.nodeName === 'A' &&
        node.getAttribute('href') &&
        node.getAttribute('href').includes('google.com/url?q=')
      );
    },
    replacement: function (content, node) {
      const href = node.getAttribute('href');
      try {
        const match = href.match(/[?&]q=([^&]+)/);
        const cleanHref = match ? decodeURIComponent(match[1]) : href;
        return `[${content}](${cleanHref})`;
      } catch (e) {
        return `[${content}](${href})`;
      }
    }
  });

  // Handle Google Docs tables cleanly, even when <th> / <thead> are missing
  service.addRule('googleDocsTable', {
    filter: 'table',
    replacement: function (content, node) {
      const rows = Array.from(node.querySelectorAll('tr'));
      if (rows.length === 0) return '';

      const tableData = rows
        .map(row => {
          const cells = Array.from(row.querySelectorAll('td, th'));
          return cells.map(cell =>
            cell.textContent.trim().replace(/\|/g, '\\|').replace(/\s+/g, ' ')
          );
        })
        .filter(row => row.some(cell => cell.length > 0));

      if (tableData.length === 0) return '';
      const colCount = Math.max(...tableData.map(r => r.length));
      if (colCount === 0) return '';

      const pad = arr => {
        const copy = [...arr];
        while (copy.length < colCount) copy.push('');
        return copy;
      };

      const hasTh = rows[0].querySelector('th') !== null;
      let header = [];
      let dataRows = [];

      if (hasTh) {
        header = pad(tableData[0]);
        dataRows = tableData.slice(1);
      } else {
        const firstRow = tableData[0];
        const isFirstRowHeader = firstRow.every(
          c =>
            /^[A-Z\s]+$/.test(c) ||
            ['Rule', 'Rule #', 'Code', 'Title', 'Description', 'Item', 'Name'].includes(c)
        );

        if (isFirstRowHeader) {
          header = pad(firstRow);
          dataRows = tableData.slice(1);
        } else if (colCount === 2) {
          header = ['Rule', 'Description'];
          dataRows = tableData;
        } else {
          header = Array.from({ length: colCount }, (_, i) => `Col ${i + 1}`);
          dataRows = tableData;
        }
      }

      let md = '\n\n| ' + header.join(' | ') + ' |\n';
      md += '| ' + Array(colCount).fill('---').join(' | ') + ' |\n';
      dataRows.forEach(r => {
        md += '| ' + pad(r).join(' | ') + ' |\n';
      });
      md += '\n';

      return md;
    }
  });

  return service;
}

/**
 * Extracts the inner HTML representing the actual document content from a Google Docs pub page.
 */
export function extractDocHtml(fullHtml) {
  if (typeof fullHtml !== 'string') return '';

  const idx = fullHtml.indexOf('doc-content');
  if (idx !== -1) {
    const startDiv = fullHtml.lastIndexOf('<div', idx);
    const scriptIdx = fullHtml.indexOf('<script', idx);
    if (startDiv !== -1 && scriptIdx !== -1) {
      return fullHtml.slice(startDiv, scriptIdx);
    }
    if (startDiv !== -1) {
      return fullHtml.slice(startDiv);
    }
  }

  const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    return bodyMatch[1];
  }

  return fullHtml;
}

/**
 * Returns candidate URLs to fetch for a given Google Doc URL:
 * - If it's a direct doc ID (e.g. /d/1xxx), prioritizes export?format=md
 * - Fallbacks to published URL
 */
export function getCandidateDocUrls(url) {
  const urls = [];
  const directMatch = url.match(/\/document\/d\/([a-zA-Z0-9_-]{25,})(?:\/|$)/);

  if (directMatch && !url.includes('/document/d/e/')) {
    const docId = directMatch[1];
    urls.push(`https://docs.google.com/document/d/${docId}/export?format=md`);
    urls.push(`https://docs.google.com/document/d/${docId}/pub?embedded=true`);
  } else {
    urls.push(url);
  }

  return urls;
}

/**
 * Fetches a Google Doc and converts/returns its content as Markdown.
 *
 * @param {string} docUrl - Google Doc URL (either /pub or /d/<id> format)
 * @param {boolean} [forceRefresh=false] - If true, bypasses the memory cache
 * @returns {Promise<string>} The document content formatted as Markdown
 */
export async function loadGoogleDocAsMarkdown(docUrl, forceRefresh = false) {
  if (!forceRefresh && docCache.has(docUrl)) {
    return docCache.get(docUrl);
  }

  const candidateUrls = getCandidateDocUrls(docUrl);
  let lastError = null;

  for (const url of candidateUrls) {
    try {
      const response = await axios.get(url, {
        headers: {
          Accept: 'text/x-markdown, text/markdown, text/html, */*'
        }
      });

      const data = response.data;
      const contentType = response.headers['content-type'] || '';

      // If it returned direct Markdown
      if (
        contentType.includes('markdown') ||
        (typeof data === 'string' &&
          !data.trim().startsWith('<!DOCTYPE') &&
          !data.trim().startsWith('<html') &&
          data.includes('#'))
      ) {
        docCache.set(docUrl, data);
        return data;
      }

      // If it returned HTML, convert with Turndown
      if (typeof data === 'string') {
        const docHtml = extractDocHtml(data);
        const turndownService = createDocTurndownService();
        const markdown = turndownService.turndown(docHtml);

        docCache.set(docUrl, markdown);
        return markdown;
      }
    } catch (err) {
      lastError = err;
      // Try next candidate URL
    }
  }

  throw lastError || new Error(`Failed to load Google Doc from ${docUrl}`);
}


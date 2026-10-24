/**
 * Backward compatibility wrapper for markdown documentation loader.
 * Documentation is now fetched directly as Markdown from https://github.com/CheeseLad/cablenetwork-docs.
 */

import { loadMarkdownDoc, clearDocCache } from './markdownDocs';

export { loadMarkdownDoc, clearDocCache };

/**
 * Loads document as markdown. Kept for backwards compatibility with any existing imports.
 * @param {string} docUrl - Doc URL or path
 * @param {boolean} [forceRefresh=false] - Force cache bypass
 * @returns {Promise<string>} Markdown content
 */
export async function loadGoogleDocAsMarkdown(docUrl, forceRefresh = false) {
  return loadMarkdownDoc(docUrl, forceRefresh);
}

export default loadMarkdownDoc;

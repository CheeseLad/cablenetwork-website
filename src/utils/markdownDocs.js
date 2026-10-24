// Cache for loaded markdown documents to prevent redundant network requests
const docCache = new Map();

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/CheeseLad/cablenetwork-docs/main/';
const JSDELIVR_BASE = 'https://cdn.jsdelivr.net/gh/CheeseLad/cablenetwork-docs@main/';

/**
 * Resolves a doc path or URL into candidate fetch URLs (primary raw GitHub, secondary CDN mirror).
 * @param {string} target - Doc path or full URL
 * @returns {string[]} Array of candidate fetch URLs
 */
export function getMarkdownFetchUrls(target) {
  if (!target || typeof target !== 'string') return [];

  const trimmed = target.trim();

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    const urls = [trimmed];
    const rawMarker = 'raw.githubusercontent.com/CheeseLad/cablenetwork-docs/main/';
    if (trimmed.includes(rawMarker)) {
      const relPath = trimmed.split(rawMarker)[1];
      urls.push(`${JSDELIVR_BASE}${relPath}`);
    }
    return urls;
  }

  const cleanPath = trimmed.replace(/^\/+/, '');
  return [
    `${GITHUB_RAW_BASE}${cleanPath}`,
    `${JSDELIVR_BASE}${cleanPath}`
  ];
}

/**
 * Fetches a markdown document from the CheeseLad/cablenetwork-docs repository.
 * Supports in-memory caching and cache-busting when forceRefresh is true.
 *
 * @param {string} docPathOrUrl - Either a relative path (e.g. 'crp-info/commands.md') or full URL
 * @param {boolean} [forceRefresh=false] - Whether to bypass memory and browser caches
 * @returns {Promise<string>} The raw markdown content
 */
export async function loadMarkdownDoc(docPathOrUrl, forceRefresh = false) {
  if (!docPathOrUrl) {
    throw new Error('No document path or URL provided');
  }

  // Return cached result if available and refresh not requested
  if (!forceRefresh && docCache.has(docPathOrUrl)) {
    return docCache.get(docPathOrUrl);
  }

  const urls = getMarkdownFetchUrls(docPathOrUrl);
  let lastError = null;

  for (const url of urls) {
    try {
      const fetchUrl = forceRefresh
        ? `${url}${url.includes('?') ? '&' : '?'}_t=${Date.now()}`
        : url;

      const response = await fetch(fetchUrl, {
        cache: forceRefresh ? 'no-store' : 'default',
        headers: {
          Accept: 'text/plain, text/markdown, */*'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const content = await response.text();
      docCache.set(docPathOrUrl, content);
      return content;
    } catch (err) {
      lastError = err;
      console.warn(`Failed to fetch doc from ${url}:`, err);
    }
  }

  throw lastError || new Error(`Failed to load document: ${docPathOrUrl}`);
}

/**
 * Clear the in-memory document cache.
 */
export function clearDocCache() {
  docCache.clear();
}


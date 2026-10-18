import { useEffect } from 'react';

export const BASE_TITLE = 'Cable Creative Roleplay';

/**
 * Returns a formatted document title.
 * If title already contains BASE_TITLE, it returns title as-is.
 * Otherwise, returns `${title} | ${BASE_TITLE}`.
 */
export function getFullTitle(title) {
  if (!title) return BASE_TITLE;
  if (title.includes(BASE_TITLE)) return title;
  return `${title} | ${BASE_TITLE}`;
}

/**
 * Hook to dynamically update document.title.
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = getFullTitle(title);
    }
  }, [title]);
}

export default useDocumentTitle;


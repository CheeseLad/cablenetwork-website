import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2, RefreshCw, ExternalLink, AlertCircle, Search, FileText } from 'lucide-react';
import { loadGoogleDocAsMarkdown } from '../utils/googleDocs';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const GoogleDocViewer = ({
  docUrl,
  title,
  description,
  externalUrl,
  className = ''
}) => {
  useDocumentTitle(title);
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDoc = useCallback(
    async (force = false) => {
      if (!docUrl) return;
      setLoading(true);
      setError(null);
      try {
        const md = await loadGoogleDocAsMarkdown(docUrl, force);
        setMarkdown(md);
        setLastUpdated(new Date());
      } catch (err) {
        console.error('Error loading Google Doc as markdown:', err);
        setError(
          err.response?.status
            ? `Failed to load document (${err.response.status}: ${err.response.statusText})`
            : err.message || 'Unable to fetch document from Google Docs.'
        );
      } finally {
        setLoading(false);
      }
    },
    [docUrl]
  );

  useEffect(() => {
    fetchDoc(false);
  }, [fetchDoc]);

  // Fallback direct URL to view on Google Docs
  const viewUrl = externalUrl || docUrl?.replace(/\/(export\?.*|pub\?.*)$/, '/pub');

  // Filter markdown lines if user enters a search query
  const displayedMarkdown = useMemo(() => {
    if (!searchQuery.trim() || !markdown) return markdown;
    const query = searchQuery.toLowerCase();

    // If table exists, filter table rows or keep relevant sections
    const lines = markdown.split('\n');
    const filteredLines = [];
    let inTable = false;
    let tableHeader = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Detect table boundary
      if (line.trim().startsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableHeader = [line];
          if (lines[i + 1] && lines[i + 1].includes('---')) {
            tableHeader.push(lines[i + 1]);
            i++;
          }
          filteredLines.push(...tableHeader);
          continue;
        }

        // Table body row
        if (line.toLowerCase().includes(query)) {
          filteredLines.push(line);
        }
        continue;
      } else {
        inTable = false;
      }

      // Normal text / headings
      if (
        line.startsWith('#') ||
        line.toLowerCase().includes(query) ||
        (lines[i + 1] && lines[i + 1].toLowerCase().includes(query)) ||
        (lines[i - 1] && lines[i - 1].toLowerCase().includes(query))
      ) {
        filteredLines.push(line);
      }
    }

    return filteredLines.length > 0
      ? filteredLines.join('\n')
      : `_No matching content found for "${searchQuery}". Try a different keyword._`;
  }, [markdown, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-6 transition-colors duration-200">
      <div className="max-w-5xl mx-auto">
        {/* <div className="bg-white dark:bg-[#131316] p-6 rounded-xl shadow-md dark:border dark:border-[#27272a] mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-6 h-6 text-green-500" />
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-[#fafafa]">
                  {title || 'Document'}
                </h1>
              </div>
              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search document..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg bg-gray-50 dark:bg-[#1a1a20] border border-gray-200 dark:border-[#27272a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="button"
                onClick={() => fetchDoc(true)}
                disabled={loading}
                title="Refresh document"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1a1a20] dark:hover:bg-[#27272a] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-[#27272a] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              {viewUrl && (
                <a
                  href={viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on Google Docs"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Google Doc</span>
                </a>
              )}
            </div>
          </div> 

          {lastUpdated && !loading && (
            <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
              Synced: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>*/}

        {/* Content Card */}
        <div className="bg-white dark:bg-[#131316] p-6 sm:p-10 rounded-xl shadow-md dark:border dark:border-[#27272a]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-10 h-10 text-green-500 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Loading document...
              </p>
              {/*<p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Fetching and rendering latest markdown from Google Docs
              </p>*/}
            </div>
          ) : error ? (
            <div className="py-12 flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
                Failed to load document
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => fetchDoc(true)}
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                >
                  Try Again
                </button>
                {viewUrl && (
                  <a
                    href={viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-100 dark:bg-[#1a1a20] hover:bg-gray-200 dark:hover:bg-[#27272a] text-gray-800 dark:text-gray-200 transition-colors border border-gray-200 dark:border-[#27272a]"
                  >
                    Open in Google Docs
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="prose dark:prose-invert lg:prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Enhance headings
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-[#fafafa] border-b border-gray-200 dark:border-neutral-800 pb-3 mt-8 mb-4 first:mt-0"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-3 border-b border-gray-100 dark:border-neutral-800/60 pb-2"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="text-gray-700 dark:text-gray-300 leading-relaxed my-3"
                      {...props}
                    />
                  ),
                  // Styled external links
                  a: ({ node, href, children, ...props }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline font-medium break-words"
                      {...props}
                    >
                      {children}
                    </a>
                  ),
                  // Responsive styled tables
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-6 border border-gray-200 dark:border-[#27272a] rounded-lg shadow-sm">
                      <table
                        className="min-w-full divide-y divide-gray-200 dark:divide-[#27272a] text-left text-sm"
                        {...props}
                      />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead
                      className="bg-gray-100 dark:bg-[#1a1a20] text-gray-900 dark:text-gray-100 font-semibold"
                      {...props}
                    />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="px-4 py-3 text-xs uppercase tracking-wider font-bold" {...props} />
                  ),
                  tbody: ({ node, ...props }) => (
                    <tbody
                      className="divide-y divide-gray-200 dark:divide-[#27272a] bg-white dark:bg-[#131316]"
                      {...props}
                    />
                  ),
                  tr: ({ node, ...props }) => (
                    <tr
                      className="hover:bg-gray-50/80 dark:hover:bg-[#1a1a20]/60 transition-colors"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 align-top" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-5 my-3 space-y-1.5 text-gray-700 dark:text-gray-300" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-5 my-3 space-y-1.5 text-gray-700 dark:text-gray-300" {...props} />
                  ),
                  li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                  hr: ({ node, ...props }) => (
                    <hr className="my-6 border-gray-200 dark:border-[#27272a]" {...props} />
                  ),
                  code: ({ node, inline, ...props }) => (
                    <code
                      className="bg-gray-100 dark:bg-[#1a1a20] text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded text-sm font-mono"
                      {...props}
                    />
                  )
                }}
              >
                {displayedMarkdown}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleDocViewer;


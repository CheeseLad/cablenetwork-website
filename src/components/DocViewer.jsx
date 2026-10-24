import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2, RefreshCw, ExternalLink, AlertCircle, Search, FileText, Github } from 'lucide-react';
import { loadMarkdownDoc } from '../utils/markdownDocs';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const DocViewer = ({
  docUrl,
  githubUrl,
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
        const md = await loadMarkdownDoc(docUrl, force);
        setMarkdown(md);
        setLastUpdated(new Date());
      } catch (err) {
        console.error('Error loading markdown document:', err);
        setError(
          err.response?.status
            ? `Failed to load document (${err.response.status}: ${err.response.statusText})`
            : err.message || 'Unable to fetch document from GitHub.'
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

  // Direct URL to view source on GitHub or external location
  const viewUrl =
    externalUrl ||
    githubUrl ||
    (docUrl?.includes('raw.githubusercontent.com')
      ? docUrl.replace('raw.githubusercontent.com', 'github.com').replace('/main/', '/blob/main/')
      : docUrl);

  // Filter markdown lines if user enters a search query
  const displayedMarkdown = useMemo(() => {
    if (!searchQuery.trim() || !markdown) return markdown;
    const query = searchQuery.toLowerCase();

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
    <div className={`container mx-auto px-4 py-6 transition-colors duration-200 ${className}`}>
      <div className="max-w-5xl mx-auto">
        {/* Content Card */}
        <div className="bg-white dark:bg-[#131316] p-6 sm:p-10 rounded-xl shadow-md dark:border dark:border-[#27272a]">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-10 h-10 text-green-500 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Loading document...
              </p>
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-gray-100 dark:bg-[#1a1a20] hover:bg-gray-200 dark:hover:bg-[#27272a] text-gray-800 dark:text-gray-200 transition-colors border border-gray-200 dark:border-[#27272a]"
                  >
                    <Github className="w-4 h-4" />
                    <span>Open in GitHub</span>
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
                  h4: ({ node, ...props }) => (
                    <h4
                      className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200 mt-4 mb-2"
                      {...props}
                    />
                  ),
                  h5: ({ node, ...props }) => (
                    <h5
                      className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200 mt-3 mb-1"
                      {...props}
                    />
                  ),
                  h6: ({ node, ...props }) => (
                    <h6
                      className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mt-3 mb-1"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="text-gray-700 dark:text-gray-300 leading-relaxed my-3"
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props} />
                  ),
                  em: ({ node, ...props }) => (
                    <em className="italic text-gray-800 dark:text-gray-200" {...props} />
                  ),
                  del: ({ node, ...props }) => (
                    <del className="line-through text-gray-500 dark:text-gray-400" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-green-500 pl-4 py-1.5 my-4 italic text-gray-700 dark:text-gray-300 bg-gray-50/70 dark:bg-[#1a1a20]/40 rounded-r"
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
                  input: ({ node, ...props }) => (
                    <input className="mr-2 rounded text-green-600 focus:ring-green-500 align-middle" {...props} />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr className="my-6 border-gray-200 dark:border-[#27272a]" {...props} />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre
                      className="bg-gray-100 dark:bg-[#1a1a20] p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono border border-gray-200 dark:border-[#27272a] text-gray-800 dark:text-gray-200 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit"
                      {...props}
                    />
                  ),
                  code: ({ node, className, ...props }) => (
                    <code
                      className={
                        className
                          ? className
                          : "bg-gray-100 dark:bg-[#1a1a20] text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded text-sm font-mono"
                      }
                      {...props}
                    />
                  ),
                  img: ({ node, alt, src, ...props }) => (
                    <img
                      src={src}
                      alt={alt || ''}
                      className="rounded-lg shadow-md max-w-full h-auto my-4 border border-gray-200 dark:border-[#27272a]"
                      loading="lazy"
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

export default DocViewer;


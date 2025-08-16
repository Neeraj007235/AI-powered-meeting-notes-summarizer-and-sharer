import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SummaryEditor = ({ summary, onChange }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Generated Summary (Preview)</h2>

      {/* Markdown-rendered preview */}
      <div className="prose prose-blue max-w-none border p-4 rounded bg-gray-50">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {summary}
        </ReactMarkdown>
      </div>

      {/* Editable text area */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Edit Summary (Optional)</h3>
      <textarea
        rows="10"
        className="w-full p-2 border rounded"
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="You can make any changes to the summary here before sharing..."
      />
    </div>
  );
};

export default SummaryEditor;

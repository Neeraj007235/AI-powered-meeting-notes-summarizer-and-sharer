import React, { useState, useEffect, useRef } from 'react';
import mammoth from 'mammoth';

const UploadForm = ({ onSubmit, resetTrigger }) => {
  const [text, setText] = useState('');
  const [prompt, setPrompt] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text, prompt);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    if (file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setText(e.target.result);
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.docx')) {
      const reader = new FileReader();
      reader.onload = async function (e) {
        try {
          const arrayBuffer = e.target.result;
          const result = await mammoth.extractRawText({ arrayBuffer });
          setText(result.value);
        } catch (err) {
          console.error('Error parsing DOCX:', err);
          toast.error('Failed to parse .docx file');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      toast.error('Unsupported file format. Only .txt and .docx are allowed.');
    }
  };

  // Clear form when resetTrigger changes
  useEffect(() => {
    setText('');
    setPrompt('');
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // reset file input manually
    }
  }, [resetTrigger]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Upload .txt File (optional)</label>
        <input
          type="file"
          accept=".txt,.docx"
          onChange={handleFileUpload}
          className="border p-2 rounded w-full"
          ref={fileInputRef}
        />

        {fileName && <p className="text-sm text-gray-500 mt-1">📄 Loaded: {fileName}</p>}
      </div>

      <div>
        <label className="block font-semibold mb-1">Or paste transcript</label>
        <textarea
          rows="6"
          className="w-full p-2 border rounded"
          placeholder="Paste transcript here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder='Enter custom prompt (e.g., "Summarize in bullet points")'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Generate Summary
      </button>
    </form>
  );
};

export default UploadForm;

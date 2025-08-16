import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import UploadForm from './components/UploadForm';
import SummaryEditor from './components/SummaryEditor';
import EmailSender from './components/EmailSender';


const API_BASE =
  import.meta.env.MODE === 'development' ? 'http://localhost:4000/api' : '/api';

const App = () => {
  const [summary, setSummary] = useState('');
  const [formResetTrigger, setFormResetTrigger] = useState(0); // Trigger form reset

  const handleGenerate = async (text, prompt) => {
    try {
      const response = await axios.post(`${API_BASE}/summaries/generate`, {
        originalText: text,
        customPrompt: prompt,
      });
      setSummary(response.data.summary);
      toast.success('Summary generated successfully!');
    } catch (err) {
      toast.error('Error generating summary');
      console.error(err);
    }
  };

  const handleSendEmail = async (recipients) => {
    try {
      await axios.post(`${API_BASE}/summaries/send`, {
        summary,
        recipients,
      });
      toast.success('Email sent successfully!');

      // Clear everything after sending
      setSummary('');
      setFormResetTrigger((prev) => prev + 1); // Trigger form reset
    } catch (err) {
      toast.error('Failed to send email');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">
          🧠 AI Meeting Notes Summarizer
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Upload your transcript, generate a smart summary, and share it via email.
        </p>

        {/* Upload form */}
        <UploadForm onSubmit={handleGenerate} resetTrigger={formResetTrigger} />

        {/* Summary & Email section */}
        {summary && (
          <div className="mt-8 space-y-6">
            <SummaryEditor summary={summary} onChange={setSummary} />
            <EmailSender summary={summary} onSend={handleSendEmail} />
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default App; 

import React, { useState } from 'react';

const EmailSender = ({ summary, onSend }) => {
  const [recipients, setRecipients] = useState('');

  const handleSend = () => {
    const emails = recipients.split(',').map((email) => email.trim());
    onSend(emails);
    setRecipients(''); // clear input after send
  };

  return (
    <div className="mt-4 space-y-2">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Enter recipient emails (comma-separated)"
        value={recipients}
        onChange={(e) => setRecipients(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={handleSend}
      >
        Send Summary via Email
      </button>
    </div>
  );
};

export default EmailSender;

# 🧠 AI-Powered Meeting Notes Summarizer and Email Sharer

This project allows users to upload meeting transcripts or Copy-Past transcripts, generate structured AI summaries using custom prompts, edit the summaries, and email them to recipients — all powered by Groq’s LLM.

## 🎯 Project Overview

Meetings are often long and cluttered with information. Manually summarizing them is time-consuming and inefficient. This AI-powered full-stack application solves that by:

- Accepting raw meeting or call transcripts
- Using Groq’s LLM to generate summaries based on user prompts
- Allowing users to edit the summaries
- Emailing the final version to desired recipients

> Ideal for executives, team leaders, and anyone who wants to automate note summarization and distribution.

---

## 🔮 Features

1. **Upload Transcript**
   - Paste or type in raw meeting notes or call transcripts

2. **Custom AI Prompt**
   - Use a tailored instruction like:
     - “Summarize in bullet points for executives”
     - “Extract only action items”
     - “Create an email summary”

3. **AI Summary Generation**
   - Uses Groq’s LLM to generate meaningful summaries

4. **Summary Editing**
   - Make manual edits to the AI-generated text

5. **Email Distribution**
   - Enter email addresses and send the final summary with one click

---

## 🧰 Tech Stack

| Layer        | Technology                |
|--------------|---------------------------|
| Frontend     | React.js, TailwindCSS, React Markdown, remark-gfm|
| Backend      | Node.js, Express.js       |
| AI           | Groq SDK (`openai/gpt-oss-20b`) |
| Database     | MongoDB Atlas (Cloud)     |
| Email        | Nodemailer (Gmail + App Password) |
| Deployment   | Vercel / Render (Optional) |
| API Client   | Axios                     |

---

## 🖼️ UI Features (Basic)

- Clean, minimal UI using Tailwind
- Textarea input for transcripts and prompts
- Editable summary text area
- Input for recipient email(s)
- Toast-style alerts for success or failure

---

## 📂 Project Structure

```bash
ai-meeting-summary/
│
├── backend/
│   ├── controllers/          # Handles request logic
│   ├── routes/               # Express routes
│   ├── services/             # Groq + Email services
│   ├── models/               # MongoDB Summary schema
│   ├── .env                  # Environment variables
│   └── server.js             # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Upload, Editor, Email form
│   │   ├── App.jsx            # Main logic
│   │   └── index.css

```

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Gmail account with App Password enabled
- Groq API key

---
1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Neeraj007235/AI-powered-meeting-notes-summarizer-and-sharer.git
   ```

2. **Create .env file:**
   Inside the Backend directories create `.env` and set:

   Backend:

   ```bash
   PORT=4000
   MONGO_URI=your_mongodb_cloud_uri
   GROQ_API_KEY=your_groq_api_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_16_digit_app_password
   NODE_ENV = development
   ```

3. **Install dependencies:**
   ```bash
   npm install     # Run in both Frontend and Backend directories
   ```

4. **Start the servers:**
   Frontend:
   ```bash
   cd frontend
   npm run dev
   ```
   Backend:
   ```bash
   cd backend
   npm run dev
   ```
5. **Access the application:**
   ```bash
   http://localhost:5173/
   ```
# 🎓 Smart Campus Virtual Assistant

A lightweight, browser-based virtual assistant that helps students get instant answers to common campus queries — timetables, faculty contacts, events, canteen menus, complaints, and more. Built with plain **HTML, CSS, and JavaScript** — no frameworks, no backend, no build tools.

**Live Demo:** `https://<your-username>.github.io/<repo-name>/`

---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 Chat Interface | Real-time, conversational Q&A with quick-reply buttons |
| 🕐 Live Clock | Displays current date and time in the header |
| 📅 Timetable Lookup | Class schedule by day of the week |
| 👨‍🏫 Faculty Directory | Contact info by subject, with smart follow-up prompts |
| 📢 Campus Events | Upcoming fests, lectures, and activities |
| 🍽️ Canteen Menu | Daily menu lookup |
| 📚 Quick FAQs | Library timings, fee payment, Wi-Fi login, ID card, hostel info |
| 📝 Complaint Box | Multi-step complaint filing, saved locally in the browser |
| 🌗 Adaptive Theme | Automatically matches system light/dark mode |
| 📱 Responsive Design | Works on desktop, tablet, and mobile |

---

## 🛠️ Tech Stack

- **HTML5** – page structure
- **CSS3** – styling, theming, responsive layout
- **Vanilla JavaScript** – chatbot logic and interactivity
- **Browser `localStorage`** – persists filed complaints on the device

No external libraries, APIs, or backend server required.

---

## 📁 Project Structure

```
campus-assistant/
├── index.html      # Page structure and layout
├── style.css       # Styling and theming
├── script.js       # Chatbot data, logic, and UI wiring
└── README.md       # Project documentation
```

---

## 🚀 Getting Started

### Run Locally
1. Download or clone this repository.
2. Open `index.html` directly in any browser — that's it.
   - *Optional:* use the VS Code "Live Server" extension for auto-reload while editing.

### Deploy on GitHub Pages
1. Push `index.html`, `style.css`, and `script.js` to your repository's root.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`, folder `/ (root)`
4. Click **Save** and wait a minute.
5. Your site will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

---

## 💡 Usage

Type a message or tap a quick-action button:

| Command | Example |
|---|---|
| Timetable | `timetable monday` |
| Faculty info | `faculty` → then `english` |
| Events | `events` |
| Canteen menu | `canteen friday` |
| Library / Fees / Wi-Fi / ID Card / Hostel | `library`, `fee`, `wifi`, `id card`, `hostel` |
| File a complaint | `complaint` → follow the prompts |
| See all commands | `help` |
| End chat | `bye` / `exit` / `quit` |

---

## 🔧 Customization

All campus-specific data lives at the top of **`script.js`**:
- `faculty` – subject-wise teacher contacts
- `timetable` – class schedule by day
- `canteenMenu` – daily menu
- `events` – upcoming campus events
- `faqs` – library, fee, Wi-Fi, ID card, hostel answers

Update these objects with your own college's information. Colors and theme are controlled by the CSS variables at the top of **`style.css`**.

---

## 🎯 Future Enhancements

- Backend integration (e.g. Firebase or a REST API) for shared, persistent data
- Admin panel to view and resolve submitted complaints
- Voice input/output support
- Natural language understanding for more flexible queries

---

## 📄 License

This project was built for academic/educational purposes. Feel free to use, modify, and extend it for your own coursework.

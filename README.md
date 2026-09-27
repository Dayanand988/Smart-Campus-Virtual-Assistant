# 🎓 Smart Campus Virtual Assistant

A dashboard-style campus companion built with plain **HTML, CSS, and JavaScript** — no frameworks, no backend, no build tools. Students get a sidebar-driven dashboard for notices, events, timetable, and faculty info, plus a built-in chat assistant for quick questions.

**Live Demo:** `https://<your-username>.github.io/<repo-name>/`

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧭 Sidebar Dashboard | Navigate between Dashboard, Notices, Events, Timetable, Faculty, Assistant, and Settings |
| 🏠 Dashboard Home | Welcome banner + quick-access cards summarizing what's new |
| 📢 Notices | Latest campus announcements, tagged by category |
| 📅 Events | Upcoming fests, lectures, and activities |
| 🕐 Timetable | Class schedule with day tabs |
| 👨‍🏫 Faculty Directory | Browsable grid of subject-wise teacher contacts |
| 🤖 Campus Assistant | Built-in chatbot for typed questions, with quick-reply buttons |
| 📝 Complaint Filing | Multi-step complaint flow, saved locally in the browser |
| ⚙️ Settings | Set your name, or clear your locally saved data |
| 📱 Responsive | Sidebar collapses to a hamburger menu on mobile |
| 🌗 Adaptive Theme | Matches system light/dark mode automatically |
| ✨ Smooth Interactions | Hover/press feedback and animated view transitions throughout |

---

## 🛠️ Tech Stack

- **HTML5** – page structure (sidebar + multi-section dashboard)
- **CSS3** – theming, responsive layout, transitions/animations
- **Vanilla JavaScript** – view routing, chatbot logic, and rendering
- **Browser `localStorage`** – persists your name and filed complaints on that device

No external libraries, APIs, or backend server required (Google Fonts is loaded from a CDN for typography only).

---

## 📁 Project Structure

```
campus-assistant/
├── index.html      # Sidebar + all dashboard sections
├── style.css       # Theming, layout, responsive rules, animations
├── script.js       # Campus data, chatbot logic, view switching, rendering
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

> When updating files later, replace the *entire* contents of each file rather than pasting on top of old code, then hard-refresh (`Ctrl+Shift+R`) or test in an incognito window to avoid seeing a cached version.

---

## 💡 Usage

- Click any sidebar item, or a dashboard card, to jump to that section.
- On **Timetable**, click a day tab to see that day's classes.
- On **Assistant**, type a message or tap a quick-action button:

| Command | Example |
|---|---|
| Timetable | `timetable monday` |
| Faculty info | `faculty` → then `english` |
| Notices | `notices` |
| Events | `events` |
| Canteen menu | `canteen friday` |
| Library / Fees / Wi-Fi / ID Card / Hostel | `library`, `fee`, `wifi`, `id card`, `hostel` |
| File a complaint | `complaint` → follow the prompts |
| See all commands | `help` |
| End chat | `bye` / `exit` / `quit` |

The dashboard's "Ask something..." box sends your question straight to the Assistant section.

---

## 🔧 Customization

All campus-specific data lives at the top of **`script.js`**:
- `faculty` – subject-wise teacher contacts
- `timetable` – class schedule by day
- `canteenMenu` – daily menu
- `events` – upcoming campus events
- `notices` – campus announcements (date, tag, title)
- `faqs` – library, fee, Wi-Fi, ID card, hostel answers

Update these objects/arrays with your own college's information. Colors, fonts, and spacing live in the CSS variables and rules in **`style.css`**.

---

## 🎯 Future Enhancements

- Backend integration (e.g. Firebase or a REST API) for shared, persistent data across devices
- Admin panel to view and resolve submitted complaints
- Voice input/output support
- Natural language understanding for more flexible queries

---

## 📄 License

This project was built for academic/educational purposes. Feel free to use, modify, and extend it for your own coursework.

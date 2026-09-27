# 🎓 Smart Campus Virtual Assistant (Console Version)

A simple, console-based chatbot built in **Python** that helps students get instant answers to common campus queries — timetables, faculty contacts, events, canteen menus, and general FAQs. No external libraries or setup required — runs with plain Python.

---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 Conversational Chat | Text-based Q&A in the terminal |
| 📅 Timetable Lookup | Class schedule by day of the week |
| 👨‍🏫 Faculty Directory | Contact info by subject (math, physics, chemistry, cs, electronics, english) |
| 📢 Campus Events | Upcoming fests, lectures, and activities |
| 🍽️ Canteen Menu | Daily menu lookup |
| 📚 Quick FAQs | Library timings, fee payment, Wi-Fi login, ID card, hostel info |
| 🧠 Keyword-Based Intent Matching | Understands natural phrasing, not just exact commands |

---

## 🛠️ Tech Stack

- **Python 3** (standard library only — `re`, `sys`, `datetime`)
- No installations, frameworks, or internet connection required

---

## 📁 Project Structure

```
smart-campus-assistant/
├── smart_campus_assistant.py   # Main chatbot script
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Requirements
- Python 3.6 or later installed on your system

### Run It
1. Download `smart_campus_assistant.py`.
2. Open a terminal (or VS Code's integrated terminal) in that folder.
3. Run:
   ```
   python smart_campus_assistant.py
   ```
4. Enter your name when prompted, then start chatting.

---

## 💡 Usage

Type a message in plain English. Examples:

| Command | Example |
|---|---|
| Timetable | `timetable monday` |
| Faculty info | `faculty` → then `english` |
| Events | `events` |
| Canteen menu | `canteen friday` |
| Library / Fees / Wi-Fi / ID Card / Hostel | `library`, `fee`, `wifi`, `id card`, `hostel` |
| See all commands | `help` |
| End chat | `bye` / `exit` / `quit` |

**Sample session:**
```
Enter your name: Sumit
===================================================
   SMART CAMPUS VIRTUAL ASSISTANT
===================================================
Type 'help' anytime to see available commands.

Sumit: timetable monday
Assistant: Timetable for Monday:
  - 9:00 Math
  - 10:00 Physics
  - 11:00 CS Lab
  - 1:00 English

Sumit: faculty
Assistant: Please mention a subject (math, physics, chemistry, cs, electronics, english) to get faculty contact details.

Sumit: english
Assistant: English Faculty: Ms. P. Nair - Room 101 - p.nair@campus.edu
```

---

## 🔧 Customization

All campus-specific data lives inside the `CampusAssistant.__init__` method:
- `self.timetable` – class schedule by day
- `self.faculty` – subject-wise teacher contacts
- `self.events` – upcoming campus events
- `self.canteen_menu` – daily menu
- `self.faqs` – library, fee, Wi-Fi, ID card, hostel answers

Update these dictionaries with your own college's information.

---

## 🎯 Future Enhancements

- Graphical interface (Tkinter) or web version (HTML/CSS/JS)
- Persistent storage (database) for complaints and chat history
- Voice input/output support
- Natural language understanding for more flexible queries

---

## 📄 License

This project was built for academic/educational purposes. Feel free to use, modify, and extend it for your own coursework.

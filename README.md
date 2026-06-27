 
# 💻 DevShell

> **An interactive browser-based Linux shell simulator and developer workspace built with HTML, CSS, and JavaScript.**

DevShell recreates a Linux-like terminal entirely in the browser, allowing users to navigate a virtual filesystem, manage files, organize todos, practice Bash commands, and improve command-line proficiency through an interactive gamified learning system.

Unlike traditional todo applications, DevShell focuses on **developer productivity**, **terminal workflow simulation**, and **Linux command practice** while maintaining persistent workspaces using browser storage.

---

# ✨ Features

## 🖥️ Interactive Terminal

- Linux-inspired terminal interface
- Custom command interpreter
- Command parsing engine
- Modular command architecture
- Keyboard-first workflow
- Dynamic terminal prompt

---

## 📁 Virtual File System

Supports a hierarchical filesystem with nested directories and files.

Commands:

```bash
mkdir
cd
ls
tree
pwd
touch
cat
write
search

```

Features:

* Nested directories
* Recursive traversal
* File searching
* Pattern matching
* Persistent filesystem

---

## ✅ Productivity Tools

Manage your workspace without leaving the terminal.

```bash
todo add
todo list
todo remove
todo delete

```

---

## 👤 User Session

```bash
login
logout
whoami

```

---

## 📜 Command History

* Previous command navigation (↑ / ↓)
* History command
* Command recall

---

## ⚡ Autocomplete

Press **Tab** to automatically complete:

* Commands
* Directories
* File names

Just like a real Linux shell.

---

## 🎨 Themes

Switch between multiple terminal themes.

Examples:

```bash
theme matrix
theme ubuntu
theme dracula
theme github

```

---

## 🎮 Bash Practice Mode

Practice real Linux commands through interactive challenges.

Example:

```text
Level 1

Create a directory named projects.

```

User:

```bash
mkdir projects

```

```text
✅ Correct
+10 XP

```

Includes:

* Guided exercises
* Progressive levels

---

## 🏆 XP & Achievements

Gamified learning system featuring:

* XP
* Levels
* Achievement badges
* Progress tracking

---

## 🔍 Search Utilities

Search your workspace using Linux-style commands.

```bash
find notes.txt


```

---

## 📦 Workspace Export

Export your complete workspace as a ZIP archive.

Includes:

* Files
* Directories
* Todos
* Notes

---

## 💾 Persistent Workspace

Workspace automatically persists using LocalStorage.

No data is lost after refreshing the browser.

---

# 🏗 Architecture

```text
                User Input
                     │
                     ▼
              Command Parser
                     │
                     ▼
           Command Dispatcher
                     │
 ┌───────────┬─────────────┬────────────┐
 ▼           ▼             ▼            ▼
Filesystem Todo Engine User Session Search Engine
                     │
                     ▼
               LocalStorage

```

---

# 🛠 Technologies

* HTML5
* CSS3
* JavaScript (ES6)
* Browser LocalStorage

---

# 📸 Demo

## Filesystem

```bash
mkdir projects
cd projects
touch app.js
write app.js console.log("Hello")
cat app.js

```

---

## Bash Practice

```bash
practice

```

---

## Search

```bash
search "React" notes.txt

```

---

## Export

```bash
download /file.txt

```

---

# 🚀 Future Improvements

* **Full-Stack Migration:** Rebuilding with a React frontend, Node.js backend, and MongoDB database for better scalability.
* **Robust Authentication:** Proper user login system secured with JWT authentication.
* **Advanced Task Management:** Creating a powerful, "Todoist-style" task manager operated entirely through CLI commands (including sub-tasks, priorities, and scheduling).
* **Interactive UI/UX Side Panel:** A visual side panel that reacts in real-time, showing exactly what happens under the hood (e.g., visual filesystem changes) when a command is executed.
* **AI Integration:** Implementing an AI command assistant and AI-driven dynamic Bash practice scenarios to adapt to the user's skill level.
* **Cloud Sync:** Synchronize workspaces and settings across multiple devices.
* **Collaborative Workspaces:** Real-time terminal sharing for collaborative debugging or learning.
* **Plugin System:** Allow developers to write and install custom commands via plugins.

```

```

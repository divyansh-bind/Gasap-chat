<p align="center">
  <img src="public/gapas.webp" alt="Gapas Chat logo" width="96" height="96" />
</p>

<h1 align="center">Gapas Chat</h1>

<p align="center">
  A modern, professional chat application interface built with React, TypeScript, and Tailwind CSS.
</p>

---

## Overview

Gapas Chat is a polished, production-quality messaging UI template. It is a **pure frontend template** — there is no backend, database, or authentication layer. All conversations, contacts, and messages are driven by typed mock data, making it an ideal starting point for building your own real-time chat product on top of any backend of your choice.

## Features

- **Three-pane messaging layout** — navigation rail, conversation list, message thread, and a contextual details panel
- **Conversation list** with live search, pinned conversations, unread badges, and an all/unread filter
- **Message thread** with sender grouping, read receipts (sent / delivered / read), date separators, and an animated typing indicator
- **Message composer** with Enter-to-send (Shift+Enter for a new line) and IME-safe input handling for CJK languages
- **Working local state** — sending a message appends it to the active conversation; opening a conversation clears its unread count
- **Contact details panel** with shared media, files, links, and per-conversation settings
- **Presence indicators** — online, away, and offline states across avatars and headers
- **Fully responsive** — mobile-first list/thread navigation, tablet two-pane, and desktop three-pane layouts
- **Accessible by design** — semantic landmarks, ARIA roles, keyboard-friendly controls, and screen-reader-only labels throughout

## Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Build tool | Vite                              |
| UI Library | React 19                          |
| Language   | TypeScript                        |
| Styling    | Tailwind CSS v4                   |
| Icons      | lucide-react                      |
| Fonts      | Geist &amp; Geist Mono            |

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm (comes with Node.js), pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/gapas-chat.git
cd gapas-chat

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the app.

### Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
├── index.html               # Vite entry HTML
├── vite.config.ts           # Vite + React + Tailwind plugin config
├── src/
│   ├── main.tsx             # App entry point, mounts React and imports global styles
│   ├── App.tsx              # Root component rendering the chat shell
│   ├── globals.css          # Theme tokens and global styles
│   ├── components/
│   │   ├── chat/
│   │   │   ├── gapas-chat.tsx       # App shell: layout + state management
│   │   │   ├── nav-rail.tsx         # Left navigation rail with logo
│   │   │   ├── conversation-list.tsx# Searchable, filterable conversation list
│   │   │   ├── chat-thread.tsx      # Message history and composer
│   │   │   ├── message-bubble.tsx   # Individual message rendering
│   │   │   ├── details-panel.tsx    # Contact and conversation details
│   │   │   └── user-avatar.tsx      # Avatar with presence indicator
│   │   └── ui/
│   │       └── button.tsx           # Base button primitive
│   └── lib/
│       ├── chat-data.ts     # Typed mock users, conversations, messages
│       └── utils.ts         # Shared utilities (e.g. `cn`)
└── public/
    └── gapas.webp           # Brand logo
```

## Customization

- **Theme** — All colors are defined as semantic design tokens in `src/globals.css`. Adjust the `--primary`, `--sidebar`, and accent variables to rebrand the entire app in one place.
- **Data** — Replace the mock data in `src/lib/chat-data.ts` with your own API layer. The `User`, `Message`, and `Conversation` interfaces define the exact shape the UI expects.
- **Layout** — Each pane is an isolated component under `src/components/chat/`, so panels can be added, removed, or rearranged with minimal effort.

## Contributing

Contributions are welcome! If you would like to improve Gapas Chat:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-improvement`)
3. Commit your changes (`git commit -m "Add my improvement"`)
4. Push to your branch (`git push origin feature/my-improvement`)
5. Open a Pull Request

Please keep pull requests focused and include a clear description of the change.

## License

Gapas Chat is free and open source software, released under the **MIT License**.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software, as long as the copyright and license notice are included.

See the [LICENSE](LICENSE) file for the full license text.

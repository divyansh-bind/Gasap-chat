import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  conversations as initialConversations,
  type Conversation,
} from '@/lib/chat-data'
import { NavRail } from './nav-rail'
import { ConversationList } from './conversation-list'
import { ChatThread } from './chat-thread'
import { DetailsPanel } from './details-panel'
import { MobileNavTabs, WorkspaceSections } from './workspace-sections'

export function GapasChat() {
  const [conversations, setConversations] = useState<Conversation[]>(
    initialConversations,
  )
  const [activeNav, setActiveNav] = useState('chats')
  const [activeId, setActiveId] = useState(initialConversations[0].id)
  const [threadOpenMobile, setThreadOpenMobile] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(true)

  const activeConversation =
    conversations.find((c) => c.id === activeId) ?? conversations[0]
  const isChatsView = activeNav === 'chats'

  function selectNav(id: string) {
    setActiveNav(id)
    if (id !== 'chats') {
      setThreadOpenMobile(false)
      setDetailsOpen(false)
    }
  }

  function selectConversation(id: string) {
    setActiveId(id)
    setThreadOpenMobile(true)
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    )
  }

  function sendMessage(text: string) {
    const now = new Date()
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              typing: false,
              messages: [
                ...c.messages,
                {
                  id: `m-${Date.now()}`,
                  senderId: 'me',
                  text,
                  time,
                  status: 'sent' as const,
                },
              ],
            }
          : c,
      ),
    )
  }

  return (
    <main className="flex h-dvh overflow-hidden">
      <div className="hidden md:flex">
        <NavRail activeItem={activeNav} onSelect={selectNav} />
      </div>

      <div className="flex h-full min-w-0 flex-1 flex-col">
        <MobileNavTabs activeItem={activeNav} onSelect={selectNav} />

        {isChatsView ? (
          <div className="flex min-h-0 flex-1">
            <div
              className={cn(
                'h-full w-full md:flex md:w-auto',
                threadOpenMobile ? 'hidden' : 'flex',
              )}
            >
              <ConversationList
                conversations={conversations}
                activeId={activeId}
                onSelect={selectConversation}
              />
            </div>

            <div
              className={cn(
                'h-full min-w-0 flex-1 md:flex',
                threadOpenMobile ? 'flex' : 'hidden',
              )}
            >
              <ChatThread
                conversation={activeConversation}
                onSend={sendMessage}
                onBack={() => setThreadOpenMobile(false)}
                onToggleDetails={() => setDetailsOpen((open) => !open)}
                detailsOpen={detailsOpen}
              />
            </div>
          </div>
        ) : (
          <WorkspaceSections
            section={activeNav as 'contacts' | 'calls' | 'notifications' | 'saved'}
          />
        )}
      </div>

      {isChatsView && detailsOpen && (
        <div className="hidden xl:flex">
          <DetailsPanel
            conversation={activeConversation}
            onClose={() => setDetailsOpen(false)}
          />
        </div>
      )}
    </main>
  )
}

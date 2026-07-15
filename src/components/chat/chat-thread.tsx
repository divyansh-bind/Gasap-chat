import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  Phone,
  Video,
  Info,
  Paperclip,
  Smile,
  Send,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  users,
  currentUser,
  type Conversation,
  type Message,
} from '@/lib/chat-data'
import { UserAvatar } from './user-avatar'
import { MessageBubble } from './message-bubble'

const presenceLabel = {
  online: 'Active now',
  away: 'Away',
  offline: 'Offline',
}

export function ChatThread({
  conversation,
  onSend,
  onBack,
  onToggleDetails,
  detailsOpen,
}: {
  conversation: Conversation
  onSend: (text: string) => void
  onBack: () => void
  onToggleDetails: () => void
  detailsOpen: boolean
}) {
  const user = users[conversation.userId]
  const [draft, setDraft] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [conversation.id, conversation.messages.length])

  function submit() {
    const text = draft.trim()
    if (!text) return
    onSend(text)
    setDraft('')
  }

  return (
    <section
      aria-label={`Conversation with ${user.name}`}
      className="flex h-full min-w-0 flex-1 flex-col bg-background"
    >
      <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary md:hidden"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
          <span className="sr-only">Back to conversations</span>
        </button>
        <UserAvatar user={user} size="md" />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-bold text-foreground">
            {user.name}
          </h2>
          <p
            className={cn(
              'truncate text-xs',
              user.presence === 'online'
                ? 'text-success'
                : 'text-muted-foreground',
            )}
          >
            {conversation.typing ? 'Typing…' : presenceLabel[user.presence]}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Phone className="size-4.5" aria-hidden="true" />
            <span className="sr-only">Start voice call</span>
          </button>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Video className="size-4.5" aria-hidden="true" />
            <span className="sr-only">Start video call</span>
          </button>
          <button
            type="button"
            onClick={onToggleDetails}
            aria-pressed={detailsOpen}
            className={cn(
              'flex size-9 items-center justify-center rounded-lg transition-colors',
              detailsOpen
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            )}
          >
            <Info className="size-4.5" aria-hidden="true" />
            <span className="sr-only">Toggle conversation details</span>
          </button>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 md:px-6"
        role="log"
        aria-label="Message history"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          <div className="mb-2 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
            <span className="text-xs font-medium text-muted-foreground">
              Today
            </span>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>
          {conversation.messages.map((message: Message, i) => {
            const isOwn = message.senderId === 'me'
            const prev = conversation.messages[i - 1]
            const showAvatar = !prev || prev.senderId !== message.senderId
            return (
              <MessageBubble
                key={message.id}
                message={message}
                sender={isOwn ? currentUser : user}
                isOwn={isOwn}
                showAvatar={showAvatar}
              />
            )
          })}
          {conversation.typing && (
            <div className="flex items-end gap-2.5">
              <div
                className={cn(
                  'flex size-8 items-center justify-center rounded-full text-xs font-semibold text-primary-foreground',
                  user.color,
                )}
                aria-hidden="true"
              >
                {user.initials}
              </div>
              <div className="rounded-2xl rounded-bl-md bg-card px-4 py-3 shadow-sm ring-1 ring-border">
                <span className="flex gap-1" aria-label={`${user.name} is typing`}>
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-border bg-card px-4 py-3 md:px-6">
        <form
          className="mx-auto flex max-w-3xl items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
        >
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Paperclip className="size-5" aria-hidden="true" />
            <span className="sr-only">Attach file</span>
          </button>
          <div className="relative flex-1">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing &&
                  e.keyCode !== 229
                ) {
                  e.preventDefault()
                  submit()
                }
              }}
              rows={1}
              placeholder={`Message ${user.name}`}
              aria-label={`Message ${user.name}`}
              className="w-full resize-none rounded-xl border border-input bg-background py-2.5 pr-10 pl-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <Smile className="size-5" aria-hidden="true" />
              <span className="sr-only">Add emoji</span>
            </button>
          </div>
          <button
            type="submit"
            disabled={!draft.trim()}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Send className="size-4.5" aria-hidden="true" />
            <span className="sr-only">Send message</span>
          </button>
        </form>
      </footer>
    </section>
  )
}

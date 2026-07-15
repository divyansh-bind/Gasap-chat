import { useMemo, useState } from 'react'
import { Search, SquarePen, Pin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { users, type Conversation } from '@/lib/chat-data'

function lastMessage(conversation: Conversation) {
  return conversation.messages[conversation.messages.length - 1]
}

function ConversationRow({
  conversation,
  isActive,
  onSelect,
}: {
  conversation: Conversation
  isActive: boolean
  onSelect: () => void
}) {
  const user = users[conversation.userId]
  const last = lastMessage(conversation)

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-current={isActive ? 'true' : undefined}
        className={cn(
          'flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors',
          isActive ? 'bg-accent' : 'hover:bg-secondary',
        )}
      >
        <div
          className={cn(
            'flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-primary-foreground',
            user.color,
          )}
          aria-hidden="true"
        >
          {user.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                'truncate text-sm font-semibold',
                isActive ? 'text-accent-foreground' : 'text-foreground',
              )}
            >
              {user.name}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {last.time}
            </span>
          </div>
          <div className="mt-0.5 flex items-center justify-between gap-2">
            <span
              className={cn(
                'truncate text-sm',
                conversation.unread > 0
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground',
              )}
            >
              {conversation.typing ? (
                <span className="font-medium text-primary">typing…</span>
              ) : (
                <>
                  {last.senderId === 'me' && (
                    <span className="text-muted-foreground">You: </span>
                  )}
                  {last.text}
                </>
              )}
            </span>
            <span className="flex shrink-0 items-center gap-1.5">
              {conversation.pinned && (
                <Pin
                  className="size-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
              )}
              {conversation.unread > 0 && (
                <span
                  className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground"
                  aria-label={`${conversation.unread} unread messages`}
                >
                  {conversation.unread}
                </span>
              )}
            </span>
          </div>
        </div>
      </button>
    </li>
  )
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
}: {
  conversations: Conversation[]
  activeId: string
  onSelect: (id: string) => void
}) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const filtered = useMemo(() => {
    return conversations.filter((c) => {
      const user = users[c.userId]
      const matchesQuery = user.name
        .toLowerCase()
        .includes(query.trim().toLowerCase())
      const matchesFilter = filter === 'all' || c.unread > 0
      return matchesQuery && matchesFilter
    })
  }, [conversations, query, filter])

  const pinned = filtered.filter((c) => c.pinned)
  const recent = filtered.filter((c) => !c.pinned)

  return (
    <section
      aria-label="Conversations"
      className="flex h-full w-full flex-col border-r border-border bg-card md:w-80 lg:w-88"
    >
      <header className="flex items-center justify-between gap-2 px-4 pt-5 pb-3">
        <h1 className="text-lg font-bold tracking-tight text-foreground">
          Messages
        </h1>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90"
        >
          <SquarePen className="size-4" aria-hidden="true" />
          <span className="sr-only">New message</span>
        </button>
      </header>

      <div className="px-4 pb-3">
        <div className="relative">
          <Search
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations"
            aria-label="Search conversations"
            className="w-full rounded-lg border border-input bg-background py-2 pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
      </div>

      <div className="flex gap-1 px-4 pb-2" role="tablist" aria-label="Filter">
        {(['all', 'unread'] as const).map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors',
              filter === f
                ? 'bg-foreground text-card'
                : 'bg-secondary text-secondary-foreground hover:bg-accent',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {pinned.length > 0 && (
          <>
            <h2 className="px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Pinned
            </h2>
            <ul className="flex flex-col gap-0.5">
              {pinned.map((c) => (
                <ConversationRow
                  key={c.id}
                  conversation={c}
                  isActive={c.id === activeId}
                  onSelect={() => onSelect(c.id)}
                />
              ))}
            </ul>
          </>
        )}
        {recent.length > 0 && (
          <>
            <h2 className="px-3 pt-3 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Recent
            </h2>
            <ul className="flex flex-col gap-0.5">
              {recent.map((c) => (
                <ConversationRow
                  key={c.id}
                  conversation={c}
                  isActive={c.id === activeId}
                  onSelect={() => onSelect(c.id)}
                />
              ))}
            </ul>
          </>
        )}
        {filtered.length === 0 && (
          <p className="px-3 py-8 text-center text-sm text-muted-foreground">
            No conversations found.
          </p>
        )}
      </div>
    </section>
  )
}

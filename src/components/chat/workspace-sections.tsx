import {
  Bell,
  Bookmark,
  Clock3,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Users,
  Video,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  bookmarks,
  calls,
  contacts,
  notifications,
  users,
} from '@/lib/chat-data'
import { UserAvatar } from './user-avatar'

type SectionId = 'contacts' | 'calls' | 'notifications' | 'saved'

const sectionMeta: Record<SectionId, { title: string; subtitle: string }> = {
  contacts: {
    title: 'Contacts',
    subtitle: 'People across your active workstreams.',
  },
  calls: {
    title: 'Calls',
    subtitle: 'Recent call history and follow-up context.',
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'Priority updates from conversations and teams.',
  },
  saved: {
    title: 'Bookmarks',
    subtitle: 'Saved highlights from your conversations.',
  },
}

export function WorkspaceSections({ section }: { section: SectionId }) {
  return (
    <section className="flex h-full min-w-0 flex-1 flex-col bg-background">
      <header className="border-b border-border bg-card px-5 py-4">
        <h1 className="text-lg font-bold text-foreground">{sectionMeta[section].title}</h1>
        <p className="text-sm text-muted-foreground">{sectionMeta[section].subtitle}</p>
      </header>

      <div className="border-b border-border bg-card px-5 py-3">
        <div className="relative max-w-md">
          <Search
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder={`Search ${sectionMeta[section].title.toLowerCase()}`}
            className="w-full rounded-lg border border-input bg-background py-2 pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-5">
        {section === 'contacts' && <ContactsPanel />}
        {section === 'calls' && <CallsPanel />}
        {section === 'notifications' && <NotificationsPanel />}
        {section === 'saved' && <BookmarksPanel />}
      </div>
    </section>
  )
}

function ContactsPanel() {
  return (
    <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {contacts.map((contact) => {
        const user = users[contact.userId]
        return (
          <li
            key={contact.id}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-secondary"
          >
            <div className="flex items-start gap-3">
              <UserAvatar user={user} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{contact.team}</p>
                <p
                  className={cn(
                    'mt-2 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold',
                    contact.status === 'Available'
                      ? 'bg-success/15 text-success'
                      : 'bg-accent text-accent-foreground',
                  )}
                >
                  {contact.status}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="size-3.5" aria-hidden="true" />
                {contact.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-3.5" aria-hidden="true" />
                {contact.phone}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function CallsPanel() {
  return (
    <ul className="space-y-2">
      {calls.map((call) => {
        const user = users[call.userId]
        return (
          <li key={call.id}>
            <article className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <UserAvatar user={user} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {call.direction} {call.type} call · {call.time}
                </p>
              </div>
              <p className="text-xs font-medium text-muted-foreground">{call.duration}</p>
              <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                {call.type === 'Video' ? (
                  <Video className="size-4" aria-hidden="true" />
                ) : (
                  <Phone className="size-4" aria-hidden="true" />
                )}
              </span>
            </article>
          </li>
        )
      })}
    </ul>
  )
}

function NotificationsPanel() {
  return (
    <ul className="space-y-2">
      {notifications.map((item) => (
        <li key={item.id}>
          <article
            className={cn(
              'rounded-xl border px-4 py-3',
              item.read ? 'border-border bg-card' : 'border-primary/30 bg-primary/5',
            )}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg',
                  item.priority === 'high'
                    ? 'bg-destructive/15 text-destructive'
                    : 'bg-accent text-accent-foreground',
                )}
              >
                <Bell className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.message}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock3 className="size-3.5" aria-hidden="true" />
                  {item.time}
                </p>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

function BookmarksPanel() {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {bookmarks.map((item) => (
        <li key={item.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Bookmark className="size-3.5" aria-hidden="true" />
            {item.savedAt}
          </div>
          <p className="mt-2 text-sm font-semibold text-foreground">{item.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{item.context}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
              {item.tag}
            </span>
            <span className="text-xs text-muted-foreground">Saved snippet</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function MobileNavTabs({
  activeItem,
  onSelect,
}: {
  activeItem: string
  onSelect: (id: string) => void
}) {
  const items = [
    { id: 'chats', label: 'Chats', icon: MessageSquare },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'calls', label: 'Calls', icon: Phone },
    { id: 'notifications', label: 'Alerts', icon: Bell },
    { id: 'saved', label: 'Saved', icon: Bookmark },
  ]

  return (
    <nav className="grid grid-cols-5 border-b border-border bg-card md:hidden">
      {items.map((item) => {
        const Icon = item.icon
        const active = activeItem === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              'flex flex-col items-center gap-1 px-2 py-2 text-[11px] font-medium',
              active ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}

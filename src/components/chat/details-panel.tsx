import {
  Bell,
  FileText,
  ImageIcon,
  Link2,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'
import { users, type Conversation } from '@/lib/chat-data'
import { UserAvatar } from './user-avatar'

const sharedItems = [
  { icon: ImageIcon, label: 'Media', count: 24 },
  { icon: FileText, label: 'Files', count: 9 },
  { icon: Link2, label: 'Links', count: 13 },
]

export function DetailsPanel({
  conversation,
  onClose,
}: {
  conversation: Conversation
  onClose: () => void
}) {
  const user = users[conversation.userId]

  return (
    <aside
      aria-label="Conversation details"
      className="flex h-full w-full shrink-0 flex-col overflow-y-auto border-l border-border bg-card lg:w-80"
    >
      <div className="flex items-center justify-between px-5 pt-5">
        <h2 className="text-sm font-bold text-foreground">Details</h2>
        <button
          type="button"
          onClick={onClose}
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Close details panel</span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 px-5 py-6 text-center">
        <UserAvatar user={user} size="lg" />
        <div>
          <p className="text-base font-bold text-foreground">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.role}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            View profile
          </button>
          <button
            type="button"
            className="rounded-lg bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-accent"
          >
            Mute
          </button>
        </div>
      </div>

      <div className="border-t border-border px-5 py-4">
        <h3 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Shared
        </h3>
        <ul className="flex flex-col gap-1">
          {sharedItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
                >
                  <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-left font-medium">
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.count}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="border-t border-border px-5 py-4">
        <h3 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Settings
        </h3>
        <ul className="flex flex-col gap-1">
          <li>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Bell className="size-4 text-muted-foreground" aria-hidden="true" />
              Notifications
            </button>
          </li>
          <li>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <ShieldCheck
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
              Privacy &amp; safety
            </button>
          </li>
          <li>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-secondary"
            >
              <UserRound className="size-4" aria-hidden="true" />
              Block {user.name.split(' ')[0]}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}

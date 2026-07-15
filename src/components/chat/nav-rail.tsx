import {
  MessageSquare,
  Users,
  Phone,
  Bell,
  Bookmark,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { currentUser } from '@/lib/chat-data'
import { UserAvatar } from './user-avatar'

const navItems = [
  { id: 'chats', label: 'Chats', icon: MessageSquare, badge: 3 },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'calls', label: 'Calls', icon: Phone },
  { id: 'notifications', label: 'Notifications', icon: Bell, badge: 1 },
  { id: 'saved', label: 'Saved', icon: Bookmark },
]

export function NavRail({
  activeItem,
  onSelect,
}: {
  activeItem: string
  onSelect: (id: string) => void
}) {
  return (
    <nav
      aria-label="Primary"
      className="flex h-full w-16 shrink-0 flex-col items-center gap-2 bg-sidebar py-4"
    >
      <a href="#" className="mb-4 flex items-center justify-center">
        <span className="flex size-10 items-center justify-center rounded-xl bg-sidebar-primary-foreground p-1.5">
          <img
            src="/gapas.webp"
            alt="Gapas Chat home"
            width={32}
            height={32}
            className="size-full object-contain"
          />
        </span>
      </a>

      <ul className="flex flex-1 flex-col items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex size-11 items-center justify-center rounded-xl transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
                <span className="sr-only">{item.label}</span>
                {item.badge && (
                  <span
                    className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-primary-foreground"
                    aria-label={`${item.badge} unread`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        className="flex size-11 items-center justify-center rounded-xl text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <Settings className="size-5" aria-hidden="true" />
        <span className="sr-only">Settings</span>
      </button>

      <button type="button" className="mt-2">
        <UserAvatar user={currentUser} size="sm" showPresence={false} />
        <span className="sr-only">Your profile</span>
      </button>
    </nav>
  )
}

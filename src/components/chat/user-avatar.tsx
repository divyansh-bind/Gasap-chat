import { cn } from '@/lib/utils'
import type { Presence, User } from '@/lib/chat-data'

const presenceColor: Record<Presence, string> = {
  online: 'bg-success',
  away: 'bg-destructive',
  offline: 'bg-muted-foreground/50',
}

export function UserAvatar({
  user,
  size = 'md',
  showPresence = true,
}: {
  user: User
  size?: 'sm' | 'md' | 'lg'
  showPresence?: boolean
}) {
  const sizeClasses = {
    sm: 'size-8 text-xs',
    md: 'size-10 text-sm',
    lg: 'size-16 text-xl',
  }

  return (
    <div className="relative shrink-0">
      <div
        className={cn(
          'flex items-center justify-center rounded-full font-semibold text-primary-foreground',
          user.color,
          sizeClasses[size],
        )}
        aria-hidden="true"
      >
        {user.initials}
      </div>
      {showPresence && (
        <span
          className={cn(
            'absolute right-0 bottom-0 block rounded-full ring-2 ring-card',
            presenceColor[user.presence],
            size === 'lg' ? 'size-4' : 'size-2.5',
          )}
        >
          <span className="sr-only">{user.presence}</span>
        </span>
      )}
    </div>
  )
}

import { Check, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Message, User } from '@/lib/chat-data'

export function MessageBubble({
  message,
  sender,
  isOwn,
  showAvatar,
}: {
  message: Message
  sender: User
  isOwn: boolean
  showAvatar: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-end gap-2.5',
        isOwn ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      {!isOwn && (
        <div className="w-8 shrink-0">
          {showAvatar && (
            <div
              className={cn(
                'flex size-8 items-center justify-center rounded-full text-xs font-semibold text-primary-foreground',
                sender.color,
              )}
              aria-hidden="true"
            >
              {sender.initials}
            </div>
          )}
        </div>
      )}
      <div
        className={cn(
          'flex max-w-[75%] flex-col gap-1 md:max-w-[60%]',
          isOwn ? 'items-end' : 'items-start',
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
            isOwn
              ? 'rounded-br-md bg-primary text-primary-foreground'
              : 'rounded-bl-md bg-card text-card-foreground shadow-sm ring-1 ring-border',
          )}
        >
          <p className="text-pretty">{message.text}</p>
        </div>
        <div className="flex items-center gap-1 px-1">
          <span className="text-xs text-muted-foreground">{message.time}</span>
          {isOwn && message.status && (
            <span className="text-muted-foreground" aria-label={message.status}>
              {message.status === 'read' ? (
                <CheckCheck className="size-3.5 text-primary" aria-hidden="true" />
              ) : message.status === 'delivered' ? (
                <CheckCheck className="size-3.5" aria-hidden="true" />
              ) : (
                <Check className="size-3.5" aria-hidden="true" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

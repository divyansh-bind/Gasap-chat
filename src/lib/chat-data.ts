export type Presence = 'online' | 'away' | 'offline'

export interface User {
  id: string
  name: string
  role: string
  initials: string
  presence: Presence
  color: string
}

export interface Message {
  id: string
  senderId: string
  text: string
  time: string
  status?: 'sent' | 'delivered' | 'read'
}

export interface Conversation {
  id: string
  userId: string
  unread: number
  pinned: boolean
  typing?: boolean
  messages: Message[]
}

export const currentUser: User = {
  id: 'me',
  name: 'Jordan Reyes',
  role: 'Product Designer',
  initials: 'JR',
  presence: 'online',
  color: 'bg-primary',
}

export const users: Record<string, User> = {
  'u-amara': {
    id: 'u-amara',
    name: 'Amara Osei',
    role: 'Engineering Lead',
    initials: 'AO',
    presence: 'online',
    color: 'bg-primary',
  },
  'u-liam': {
    id: 'u-liam',
    name: 'Liam Carter',
    role: 'Frontend Engineer',
    initials: 'LC',
    presence: 'online',
    color: 'bg-success',
  },
  'u-sofia': {
    id: 'u-sofia',
    name: 'Sofia Marchetti',
    role: 'Brand Designer',
    initials: 'SM',
    presence: 'away',
    color: 'bg-destructive',
  },
  'u-noah': {
    id: 'u-noah',
    name: 'Noah Kim',
    role: 'Product Manager',
    initials: 'NK',
    presence: 'offline',
    color: 'bg-foreground',
  },
  'u-priya': {
    id: 'u-priya',
    name: 'Priya Nair',
    role: 'Data Analyst',
    initials: 'PN',
    presence: 'online',
    color: 'bg-primary',
  },
  'u-mateo': {
    id: 'u-mateo',
    name: 'Mateo Alvarez',
    role: 'QA Engineer',
    initials: 'MA',
    presence: 'offline',
    color: 'bg-success',
  },
}

export const conversations: Conversation[] = [
  {
    id: 'c-1',
    userId: 'u-amara',
    unread: 2,
    pinned: true,
    typing: true,
    messages: [
      {
        id: 'm-1',
        senderId: 'u-amara',
        text: 'Morning! Did you get a chance to look at the new onboarding flow?',
        time: '09:12',
      },
      {
        id: 'm-2',
        senderId: 'me',
        text: 'Just finished reviewing it. The step reduction from 6 to 3 screens is a big win.',
        time: '09:15',
        status: 'read',
      },
      {
        id: 'm-3',
        senderId: 'u-amara',
        text: 'Great. Engineering can pick it up this sprint if the specs are final.',
        time: '09:16',
      },
      {
        id: 'm-4',
        senderId: 'me',
        text: 'Specs are final. I attached the interaction notes to the ticket — the only open question is the empty state illustration.',
        time: '09:18',
        status: 'read',
      },
      {
        id: 'm-5',
        senderId: 'u-amara',
        text: 'Perfect, I saw the notes. One thing: can we lazy-load the avatar upload step? It pulls in the cropper bundle.',
        time: '09:21',
      },
      {
        id: 'm-6',
        senderId: 'u-amara',
        text: 'Also, standup moved to 10:30 today.',
        time: '09:22',
      },
    ],
  },
  {
    id: 'c-2',
    userId: 'u-liam',
    unread: 0,
    pinned: true,
    messages: [
      {
        id: 'm-7',
        senderId: 'u-liam',
        text: 'The message list virtualization is in. Scrolling 10k messages is smooth now.',
        time: '08:47',
      },
      {
        id: 'm-8',
        senderId: 'me',
        text: 'That is fantastic. Any regressions on the scroll-to-bottom behavior?',
        time: '08:52',
        status: 'read',
      },
      {
        id: 'm-9',
        senderId: 'u-liam',
        text: 'None that I found. QA is running the full pass this afternoon.',
        time: '08:54',
      },
    ],
  },
  {
    id: 'c-3',
    userId: 'u-sofia',
    unread: 1,
    pinned: false,
    messages: [
      {
        id: 'm-10',
        senderId: 'me',
        text: 'The new brand palette looks great in the app shell. The navy sidebar really anchors it.',
        time: 'Yesterday',
        status: 'read',
      },
      {
        id: 'm-11',
        senderId: 'u-sofia',
        text: 'Thank you! I pushed the final tokens to the design library — blue, red, and green accents are all locked in.',
        time: 'Yesterday',
      },
      {
        id: 'm-12',
        senderId: 'u-sofia',
        text: 'Sending over the dark mode exploration tomorrow.',
        time: '07:30',
      },
    ],
  },
  {
    id: 'c-4',
    userId: 'u-noah',
    unread: 0,
    pinned: false,
    messages: [
      {
        id: 'm-13',
        senderId: 'u-noah',
        text: 'Roadmap review is set for Thursday at 2pm. Can you present the messaging milestones?',
        time: 'Yesterday',
      },
      {
        id: 'm-14',
        senderId: 'me',
        text: 'Absolutely. I will have the deck ready by Wednesday evening.',
        time: 'Yesterday',
        status: 'delivered',
      },
    ],
  },
  {
    id: 'c-5',
    userId: 'u-priya',
    unread: 0,
    pinned: false,
    messages: [
      {
        id: 'm-15',
        senderId: 'u-priya',
        text: 'Weekly retention is up 14% since the notification revamp shipped.',
        time: 'Mon',
      },
      {
        id: 'm-16',
        senderId: 'me',
        text: 'That is a strong signal. Can you break it down by cohort for the Thursday review?',
        time: 'Mon',
        status: 'read',
      },
      {
        id: 'm-17',
        senderId: 'u-priya',
        text: 'On it. Dashboard link coming your way by tomorrow.',
        time: 'Mon',
      },
    ],
  },
  {
    id: 'c-6',
    userId: 'u-mateo',
    unread: 0,
    pinned: false,
    messages: [
      {
        id: 'm-18',
        senderId: 'u-mateo',
        text: 'Filed three issues from the accessibility audit — all keyboard navigation related.',
        time: 'Sun',
      },
      {
        id: 'm-19',
        senderId: 'me',
        text: 'Thanks Mateo. Tagging them for the current sprint.',
        time: 'Sun',
        status: 'read',
      },
    ],
  },
]

export interface ContactProfile {
  id: string
  userId: string
  team: string
  email: string
  phone: string
  status: 'Available' | 'In a meeting' | 'Focused'
}

export interface CallRecord {
  id: string
  userId: string
  type: 'Voice' | 'Video'
  direction: 'Incoming' | 'Outgoing' | 'Missed'
  time: string
  duration: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  priority: 'high' | 'normal'
  read: boolean
}

export interface BookmarkItem {
  id: string
  title: string
  context: string
  tag: string
  savedAt: string
}

export const contacts: ContactProfile[] = [
  {
    id: 'ct-1',
    userId: 'u-amara',
    team: 'Engineering',
    email: 'amara.osei@gasap.app',
    phone: '+1 (415) 555-0134',
    status: 'Available',
  },
  {
    id: 'ct-2',
    userId: 'u-liam',
    team: 'Frontend',
    email: 'liam.carter@gasap.app',
    phone: '+1 (415) 555-0171',
    status: 'Focused',
  },
  {
    id: 'ct-3',
    userId: 'u-sofia',
    team: 'Design',
    email: 'sofia.marchetti@gasap.app',
    phone: '+1 (415) 555-0195',
    status: 'In a meeting',
  },
  {
    id: 'ct-4',
    userId: 'u-noah',
    team: 'Product',
    email: 'noah.kim@gasap.app',
    phone: '+1 (415) 555-0182',
    status: 'Available',
  },
]

export const calls: CallRecord[] = [
  {
    id: 'cl-1',
    userId: 'u-amara',
    type: 'Video',
    direction: 'Outgoing',
    time: 'Today, 10:12',
    duration: '24m 18s',
  },
  {
    id: 'cl-2',
    userId: 'u-noah',
    type: 'Voice',
    direction: 'Incoming',
    time: 'Today, 08:35',
    duration: '8m 42s',
  },
  {
    id: 'cl-3',
    userId: 'u-sofia',
    type: 'Video',
    direction: 'Missed',
    time: 'Yesterday, 17:09',
    duration: '--',
  },
  {
    id: 'cl-4',
    userId: 'u-priya',
    type: 'Voice',
    direction: 'Outgoing',
    time: 'Yesterday, 13:44',
    duration: '15m 06s',
  },
]

export const notifications: NotificationItem[] = [
  {
    id: 'nt-1',
    title: 'Roadmap review moved',
    message: 'Product roadmap sync now starts at 2:30 PM.',
    time: '5m ago',
    priority: 'high',
    read: false,
  },
  {
    id: 'nt-2',
    title: 'Design handoff complete',
    message: 'Sofia shared final dark-mode assets in Figma.',
    time: '35m ago',
    priority: 'normal',
    read: false,
  },
  {
    id: 'nt-3',
    title: 'QA summary available',
    message: 'Mateo posted accessibility findings in #release-triage.',
    time: '2h ago',
    priority: 'normal',
    read: true,
  },
  {
    id: 'nt-4',
    title: 'Weekly analytics updated',
    message: 'Priya added retention cohorts to the dashboard.',
    time: 'Yesterday',
    priority: 'normal',
    read: true,
  },
]

export const bookmarks: BookmarkItem[] = [
  {
    id: 'bm-1',
    title: 'Onboarding empty-state copy',
    context: 'Conversation with Amara Osei',
    tag: 'Product',
    savedAt: 'Today',
  },
  {
    id: 'bm-2',
    title: 'Virtualized message list notes',
    context: 'Conversation with Liam Carter',
    tag: 'Engineering',
    savedAt: 'Yesterday',
  },
  {
    id: 'bm-3',
    title: 'Dark mode token palette',
    context: 'Conversation with Sofia Marchetti',
    tag: 'Design',
    savedAt: 'Mon',
  },
  {
    id: 'bm-4',
    title: 'Retention cohort drill-down',
    context: 'Conversation with Priya Nair',
    tag: 'Analytics',
    savedAt: 'Sun',
  },
]

export type TrackerTabKey =
  | 'events'
  | 'attendees'
  | 'venues'
  | 'tickets'
  | 'tracker'

export type TrackerTab = {
  key: TrackerTabKey
  label: string
  iconClass: string
  actionLabel: string
  title: string
  description: string
  emptyTitle: string
  emptyDescription: string
}

export const trackerTabs: TrackerTab[] = [
  {
    key: 'events',
    label: 'Events',
    iconClass: 'bi bi-calendar-event',
    actionLabel: 'New Event',
    title: 'Events',
    description: 'Create and orchestrate event timelines, schedules, and launch milestones.',
    emptyTitle: 'No Data Yet',
    emptyDescription: 'Real event data will appear here once added.',
  },
  {
    key: 'attendees',
    label: 'Attendees',
    iconClass: 'bi bi-people',
    actionLabel: 'New Attendee',
    title: 'Attendees',
    description: 'Track people, check-ins, and attendance history for each event.',
    emptyTitle: 'No Attendees Yet',
    emptyDescription: 'Attendee records will appear here once added.',
  },
  {
    key: 'venues',
    label: 'Venues',
    iconClass: 'bi bi-building',
    actionLabel: 'New Venue',
    title: 'Venues',
    description: 'Maintain venue details, capacities, and logistics information.',
    emptyTitle: 'No Venues Yet',
    emptyDescription: 'Venue records will appear here once added.',
  },
  {
    key: 'tickets',
    label: 'Tickets',
    iconClass: 'bi bi-ticket-perforated',
    actionLabel: 'Issue Ticket',
    title: 'Tickets',
    description: 'Manage ticket issuance, statuses, and purchase summaries.',
    emptyTitle: 'No Tickets Yet',
    emptyDescription: 'Ticket activity will appear here once added.',
  },
  {
    key: 'tracker',
    label: 'Tracker',
    iconClass: 'bi bi-bullseye',
    actionLabel: 'New Payment',
    title: 'Tracker',
    description: 'Monitor payment progress, balances, and event revenue snapshots.',
    emptyTitle: 'No Payment Data Yet',
    emptyDescription: 'Payment tracking data will appear here once added.',
  },
]

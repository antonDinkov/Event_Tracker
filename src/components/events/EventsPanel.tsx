import type { Event, Ticket } from '../../data'
import { EventsTable } from './EventsTable'

type EventsPanelProps = {
  events: Event[]
  tickets: Ticket[]
  venueNameById: Map<string, string>
  currencySymbol: string
  onAdd: () => void
  onEdit: (eventItem: Event) => void
  onDelete: (eventItem: Event) => void
}

export function EventsPanel({
  events,
  tickets,
  venueNameById,
  currencySymbol,
  onAdd,
  onEdit,
  onDelete,
}: EventsPanelProps) {
  return (
    <section className="tracker-panel events-panel">
      <div className="tracker-panel-header">
        <div className="tracker-panel-title-wrap">
          <span className="tracker-panel-icon" aria-hidden="true">
            <i className="bi bi-calendar-event" />
          </span>
          <div>
            <h2 className="tracker-panel-title">Events</h2>
            <p className="tracker-panel-description">
              Create, edit, and manage event records with live attendee and revenue metrics.
            </p>
          </div>
        </div>

        <button type="button" className="btn tracker-primary-btn" onClick={onAdd}>
          New Event
        </button>
      </div>

      <EventsTable
        events={events}
        tickets={tickets}
        currencySymbol={currencySymbol}
        venueNameById={venueNameById}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </section>
  )
}

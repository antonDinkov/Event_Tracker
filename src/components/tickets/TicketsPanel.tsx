import type { Ticket } from '../../data'
import { TicketsTable } from './TicketsTable'

type TicketsPanelProps = {
  tickets: Ticket[]
  eventNameById: Map<string, string>
  attendeeNameById: Map<string, string>
  currencySymbol: string
  onAdd: () => void
  onEdit: (ticket: Ticket) => void
  onDelete: (ticket: Ticket) => void
}

export function TicketsPanel({
  tickets,
  eventNameById,
  attendeeNameById,
  currencySymbol,
  onAdd,
  onEdit,
  onDelete,
}: TicketsPanelProps) {
  return (
    <section className="tracker-panel tickets-panel">
      <div className="tracker-panel-header">
        <div className="tracker-panel-title-wrap">
          <span className="tracker-panel-icon" aria-hidden="true">
            <i className="bi bi-ticket-perforated-fill" />
          </span>
          <div>
            <h2 className="tracker-panel-title">Tickets</h2>
            <p className="tracker-panel-description">
              Create and manage tickets with attendee assignment, pricing, and status.
            </p>
          </div>
        </div>

        <button type="button" className="btn tracker-primary-btn" onClick={onAdd}>
          Add Ticket
        </button>
      </div>

      <TicketsTable
        tickets={tickets}
        eventNameById={eventNameById}
        attendeeNameById={attendeeNameById}
        currencySymbol={currencySymbol}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </section>
  )
}

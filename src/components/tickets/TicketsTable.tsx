import type { Ticket } from '../../data'

type TicketsTableProps = {
  tickets: Ticket[]
  eventNameById: Map<string, string>
  attendeeNameById: Map<string, string>
  currencySymbol: string
  onEdit: (ticket: Ticket) => void
  onDelete: (ticket: Ticket) => void
}

const statusClassByValue: Record<Ticket['status'], string> = {
  issued: 'status-pill-issued',
  paid: 'status-pill-paid',
  cancelled: 'status-pill-cancelled',
}

export function TicketsTable({
  tickets,
  eventNameById,
  attendeeNameById,
  currencySymbol,
  onEdit,
  onDelete,
}: TicketsTableProps) {
  if (tickets.length === 0) {
    return (
      <div className="tracker-empty-state mt-0">
        <h3>No Tickets Yet</h3>
        <p>Ticket records will appear here once added.</p>
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table tickets-table align-middle mb-0">
        <thead>
          <tr>
            <th>Event</th>
            <th>Attendee</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td className="fw-semibold">{eventNameById.get(ticket.event) ?? 'Unknown event'}</td>
              <td>{attendeeNameById.get(ticket.attendee) ?? 'Unknown attendee'}</td>
              <td>
                {currencySymbol}
                {ticket.price.toFixed(2)}
              </td>
              <td>
                <span className={`status-pill ${statusClassByValue[ticket.status]}`}>
                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </span>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary events-action-btn"
                    onClick={() => onEdit(ticket)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger events-action-btn"
                    onClick={() => onDelete(ticket)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

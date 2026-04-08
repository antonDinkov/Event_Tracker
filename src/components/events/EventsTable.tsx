import type { Event, Ticket } from '../../data'

type EventsTableProps = {
  events: Event[]
  tickets: Ticket[]
  currencySymbol: string
  venueNameById: Map<string, string>
  onEdit: (eventItem: Event) => void
  onDelete: (eventItem: Event) => void
}

const formatEventDate = (value: string): string => {
  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function EventsTable({
  events,
  tickets,
  currencySymbol,
  venueNameById,
  onEdit,
  onDelete,
}: EventsTableProps) {
  if (events.length === 0) {
    return (
      <div className="tracker-empty-state mt-0">
        <h3>No Data Yet</h3>
        <p>Real event data will appear here once added.</p>
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table events-table align-middle mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Description</th>
            <th>Attendees</th>
            <th>Total Revenue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((eventItem) => {
            const eventTickets = tickets.filter((ticket) => ticket.event === eventItem.id)
            const attendeesCount = eventTickets.length
            const totalRevenue = eventTickets
              .filter((ticket) => ticket.status === 'paid')
              .reduce((sum, ticket) => sum + ticket.price, 0)

            return (
              <tr key={eventItem.id}>
                <td className="fw-semibold">{eventItem.name}</td>
                <td>{formatEventDate(eventItem.date)}</td>
                <td>{venueNameById.get(eventItem.venue) ?? 'Unknown venue'}</td>
                <td className="events-description-cell">{eventItem.description}</td>
                <td>
                  <span className="events-stat-pill">{attendeesCount}</span>
                </td>
                <td className="fw-semibold">
                  {currencySymbol}
                  {totalRevenue.toFixed(2)}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary events-action-btn"
                      onClick={() => onEdit(eventItem)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger events-action-btn"
                      onClick={() => onDelete(eventItem)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

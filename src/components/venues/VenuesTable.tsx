import type { Venue } from '../../data'

type VenuesTableProps = {
  venues: Venue[]
  onEdit: (venue: Venue) => void
  onDelete: (venue: Venue) => void
}

export function VenuesTable({ venues, onEdit, onDelete }: VenuesTableProps) {
  if (venues.length === 0) {
    return (
      <div className="tracker-empty-state mt-0">
        <h3>No Data Yet</h3>
        <p>Real venue data will appear here once added.</p>
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table venues-table align-middle mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id}>
              <td className="fw-semibold">{venue.name}</td>
              <td>{venue.address}</td>
              <td>
                <span className="events-stat-pill">{venue.capacity}</span>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary events-action-btn"
                    onClick={() => onEdit(venue)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger events-action-btn"
                    onClick={() => onDelete(venue)}
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

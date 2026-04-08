import type { Attendee } from '../../data'

type AttendeesTableProps = {
  attendees: Attendee[]
  onEdit: (attendee: Attendee) => void
  onDelete: (attendee: Attendee) => void
}

export function AttendeesTable({ attendees, onEdit, onDelete }: AttendeesTableProps) {
  if (attendees.length === 0) {
    return (
      <div className="tracker-empty-state mt-0">
        <h3>No Data Yet</h3>
        <p>Real attendee data will appear here once added.</p>
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table attendees-table align-middle mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <tr key={attendee.id}>
              <td className="fw-semibold">{attendee.name}</td>
              <td>{attendee.email}</td>
              <td>{attendee.phone}</td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary events-action-btn"
                    onClick={() => onEdit(attendee)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger events-action-btn"
                    onClick={() => onDelete(attendee)}
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

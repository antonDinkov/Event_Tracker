import type { Attendee } from '../../data'
import { AttendeesTable } from './AttendeesTable'

type AttendeesPanelProps = {
  attendees: Attendee[]
  onAdd: () => void
  onEdit: (attendee: Attendee) => void
  onDelete: (attendee: Attendee) => void
}

export function AttendeesPanel({ attendees, onAdd, onEdit, onDelete }: AttendeesPanelProps) {
  return (
    <section className="tracker-panel attendees-panel">
      <div className="tracker-panel-header">
        <div className="tracker-panel-title-wrap">
          <span className="tracker-panel-icon" aria-hidden="true">
            <i className="bi bi-people-fill" />
          </span>
          <div>
            <h2 className="tracker-panel-title">Attendees</h2>
            <p className="tracker-panel-description">
              Manage attendee records and keep participant contacts up to date.
            </p>
          </div>
        </div>

        <button type="button" className="btn tracker-primary-btn" onClick={onAdd}>
          Add Attendee
        </button>
      </div>

      <AttendeesTable attendees={attendees} onEdit={onEdit} onDelete={onDelete} />
    </section>
  )
}

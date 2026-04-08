import type { Venue } from '../../data'
import { VenuesTable } from './VenuesTable'

type VenuesPanelProps = {
  venues: Venue[]
  onAdd: () => void
  onEdit: (venue: Venue) => void
  onDelete: (venue: Venue) => void
}

export function VenuesPanel({ venues, onAdd, onEdit, onDelete }: VenuesPanelProps) {
  return (
    <section className="tracker-panel venues-panel">
      <div className="tracker-panel-header">
        <div className="tracker-panel-title-wrap">
          <span className="tracker-panel-icon" aria-hidden="true">
            <i className="bi bi-building-fill" />
          </span>
          <div>
            <h2 className="tracker-panel-title">Venues</h2>
            <p className="tracker-panel-description">
              Manage event venues with capacity and location information.
            </p>
          </div>
        </div>

        <button type="button" className="btn tracker-primary-btn" onClick={onAdd}>
          Add Venue
        </button>
      </div>

      <VenuesTable venues={venues} onEdit={onEdit} onDelete={onDelete} />
    </section>
  )
}

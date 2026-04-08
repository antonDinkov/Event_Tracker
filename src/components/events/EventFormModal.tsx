import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import type { Event, Venue } from '../../data'
import { VenueSelectionModal } from './VenueSelectionModal'

type EventPayload = Omit<Event, 'id'>

type EventFormModalProps = {
  isOpen: boolean
  isEditMode: boolean
  eventItem?: Event
  venues: Venue[]
  onSubmit: (payload: EventPayload) => void
  onClose: () => void
}

export function EventFormModal({
  isOpen,
  isEditMode,
  eventItem,
  venues,
  onSubmit,
  onClose,
}: EventFormModalProps) {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [venueId, setVenueId] = useState('')
  const [description, setDescription] = useState('')
  const [venueSelectionOpen, setVenueSelectionOpen] = useState(false)

  const venueLabel = useMemo(() => {
    if (!venueId) {
      return 'No venue selected'
    }

    return venues.find((venue) => venue.id === venueId)?.name ?? 'No venue selected'
  }, [venueId, venues])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (isEditMode && eventItem) {
      setName(eventItem.name)
      setDate(eventItem.date)
      setVenueId(eventItem.venue)
      setDescription(eventItem.description)
      return
    }

    setName('')
    setDate('')
    setVenueId('')
    setDescription('')
  }, [isOpen, isEditMode, eventItem])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!venueId) {
      return
    }

    onSubmit({
      name: name.trim(),
      date,
      venue: venueId,
      description: description.trim(),
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-dialog-wrapper"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.22 }}
          >
            <div className="modal-content event-modal">
              <div className="modal-header event-modal-header">
                <h3 className="modal-title">{isEditMode ? 'Edit Event' : 'Create Event'}</h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body d-grid gap-3">
                  <div>
                    <label className="form-label event-label" htmlFor="eventName">
                      Name
                    </label>
                    <input
                      id="eventName"
                      className="form-control form-control-lg"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label event-label" htmlFor="eventDate">
                      Date
                    </label>
                    <input
                      id="eventDate"
                      type="date"
                      className="form-control form-control-lg"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label event-label" htmlFor="eventVenue">
                      Venue
                    </label>
                    <div className="event-venue-picker">
                      <input
                        id="eventVenue"
                        className="form-control form-control-lg"
                        value={venueLabel}
                        readOnly
                      />
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-lg"
                        onClick={() => setVenueSelectionOpen(true)}
                      >
                        Select Venue
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="form-label event-label" htmlFor="eventDescription">
                      Description
                    </label>
                    <textarea
                      id="eventDescription"
                      className="form-control"
                      rows={3}
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer event-modal-footer">
                  <button type="button" className="btn btn-outline-secondary btn-lg" onClick={onClose}>
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn tracker-primary-btn"
                    disabled={!name.trim() || !date || !venueId || !description.trim()}
                  >
                    {isEditMode ? 'Save Event' : 'Add Event'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          <VenueSelectionModal
            isOpen={venueSelectionOpen}
            venues={venues}
            selectedVenueId={venueId}
            onSelect={setVenueId}
            onClose={() => setVenueSelectionOpen(false)}
          />
        </>
      )}
    </AnimatePresence>
  )
}

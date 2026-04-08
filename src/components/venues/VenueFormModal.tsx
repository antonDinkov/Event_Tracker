import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { Venue } from '../../data'

type VenuePayload = Omit<Venue, 'id'>

type VenueFormModalProps = {
  isOpen: boolean
  isEditMode: boolean
  venue?: Venue
  onSubmit: (payload: VenuePayload) => void
  onClose: () => void
}

export function VenueFormModal({
  isOpen,
  isEditMode,
  venue,
  onSubmit,
  onClose,
}: VenueFormModalProps) {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [capacity, setCapacity] = useState('')

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (isEditMode && venue) {
      setName(venue.name)
      setAddress(venue.address)
      setCapacity(String(venue.capacity))
      return
    }

    setName('')
    setAddress('')
    setCapacity('')
  }, [isOpen, isEditMode, venue])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsedCapacity = Number(capacity)
    if (!Number.isFinite(parsedCapacity) || parsedCapacity < 0) {
      return
    }

    onSubmit({
      name: name.trim(),
      address: address.trim(),
      capacity: parsedCapacity,
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
            <div className="modal-content event-modal venue-form-modal">
              <form onSubmit={handleSubmit}>
                <div className="modal-header event-modal-header d-flex justify-content-between align-items-center">
                  <h3 className="modal-title">{isEditMode ? 'Edit Venue' : 'Add Venue'}</h3>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg attendee-cancel-btn"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>

                <div className="modal-body d-grid gap-3">
                  <div>
                    <label className="form-label event-label" htmlFor="venueName">
                      Name
                    </label>
                    <input
                      id="venueName"
                      className="form-control form-control-lg"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label event-label" htmlFor="venueAddress">
                      Address
                    </label>
                    <input
                      id="venueAddress"
                      className="form-control form-control-lg"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label event-label" htmlFor="venueCapacity">
                      Capacity
                    </label>
                    <input
                      id="venueCapacity"
                      type="number"
                      min={0}
                      className="form-control form-control-lg"
                      value={capacity}
                      onChange={(event) => setCapacity(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer event-modal-footer attendee-modal-footer">
                  <button type="button" className="btn btn-outline-secondary btn-lg" onClick={onClose}>
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn tracker-primary-btn"
                    disabled={!name.trim() || !address.trim() || !capacity.trim()}
                  >
                    {isEditMode ? 'Save Venue' : 'Add Venue'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

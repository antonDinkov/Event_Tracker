import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import type { Venue } from '../../data'

type VenueSelectionModalProps = {
  isOpen: boolean
  venues: Venue[]
  selectedVenueId: string
  onSelect: (venueId: string) => void
  onClose: () => void
}

export function VenueSelectionModal({
  isOpen,
  venues,
  selectedVenueId,
  onSelect,
  onClose,
}: VenueSelectionModalProps) {
  const [search, setSearch] = useState('')

  const filteredVenues = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      return venues
    }

    return venues.filter(
      (venue) =>
        venue.name.toLowerCase().includes(query) ||
        venue.address.toLowerCase().includes(query),
    )
  }, [search, venues])

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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
          >
            <div className="modal-content event-modal venue-modal">
              <div className="modal-header event-modal-header">
                <h3 className="modal-title">Select Venue</h3>
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-search" aria-hidden="true" />
                  </span>
                  <input
                    className="form-control"
                    placeholder="Search by venue name or address"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Capacity</th>
                        <th className="text-end">Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVenues.map((venue) => {
                        const isSelected = selectedVenueId === venue.id
                        return (
                          <tr key={venue.id}>
                            <td className="fw-semibold">{venue.name}</td>
                            <td>{venue.address}</td>
                            <td>{venue.capacity}</td>
                            <td className="text-end">
                              <button
                                type="button"
                                className={
                                  isSelected
                                    ? 'btn btn-sm btn-success'
                                    : 'btn btn-sm btn-outline-primary'
                                }
                                onClick={() => {
                                  onSelect(venue.id)
                                  onClose()
                                }}
                              >
                                {isSelected ? 'Selected' : 'Select'}
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

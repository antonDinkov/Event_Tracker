import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import type { Attendee } from '../../data'

type AttendeeSelectionModalProps = {
  isOpen: boolean
  attendees: Attendee[]
  selectedAttendeeId: string
  onSelect: (attendeeId: string) => void
  onClose: () => void
}

export function AttendeeSelectionModal({
  isOpen,
  attendees,
  selectedAttendeeId,
  onSelect,
  onClose,
}: AttendeeSelectionModalProps) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      return attendees
    }

    return attendees.filter(
      (attendee) =>
        attendee.name.toLowerCase().includes(query) ||
        attendee.email.toLowerCase().includes(query),
    )
  }, [attendees, search])

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
                <h3 className="modal-title">Select Attendee</h3>
                <button type="button" className="btn-close" onClick={onClose} />
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-search" aria-hidden="true" />
                  </span>
                  <input
                    className="form-control"
                    placeholder="Search by attendee name or email"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th className="text-end">Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((attendee) => {
                        const selected = attendee.id === selectedAttendeeId
                        return (
                          <tr key={attendee.id}>
                            <td className="fw-semibold">{attendee.name}</td>
                            <td>{attendee.email}</td>
                            <td>{attendee.phone}</td>
                            <td className="text-end">
                              <button
                                type="button"
                                className={
                                  selected
                                    ? 'btn btn-sm btn-success'
                                    : 'btn btn-sm btn-outline-primary'
                                }
                                onClick={() => {
                                  onSelect(attendee.id)
                                  onClose()
                                }}
                              >
                                {selected ? 'Selected' : 'Select'}
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

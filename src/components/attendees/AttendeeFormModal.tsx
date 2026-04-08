import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { Attendee } from '../../data'

type AttendeePayload = Omit<Attendee, 'id'>

type AttendeeFormModalProps = {
  isOpen: boolean
  isEditMode: boolean
  attendee?: Attendee
  onSubmit: (payload: AttendeePayload) => void
  onClose: () => void
}

export function AttendeeFormModal({
  isOpen,
  isEditMode,
  attendee,
  onSubmit,
  onClose,
}: AttendeeFormModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (isEditMode && attendee) {
      setName(attendee.name)
      setEmail(attendee.email)
      setPhone(attendee.phone)
      return
    }

    setName('')
    setEmail('')
    setPhone('')
  }, [isOpen, isEditMode, attendee])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onSubmit({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
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
            <div className="modal-content event-modal attendee-modal">
              <form onSubmit={handleSubmit}>
                <div className="modal-header event-modal-header d-flex justify-content-between align-items-center">
                  <h3 className="modal-title">{isEditMode ? 'Edit Attendee' : 'Add Attendee'}</h3>
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
                    <label className="form-label event-label" htmlFor="attendeeName">
                      Name
                    </label>
                    <input
                      id="attendeeName"
                      className="form-control form-control-lg"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label event-label" htmlFor="attendeeEmail">
                      Email
                    </label>
                    <input
                      id="attendeeEmail"
                      type="email"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label event-label" htmlFor="attendeePhone">
                      Phone
                    </label>
                    <input
                      id="attendeePhone"
                      className="form-control form-control-lg"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
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
                    disabled={!name.trim() || !email.trim() || !phone.trim()}
                  >
                    {isEditMode ? 'Save Attendee' : 'Add Attendee'}
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

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import type { Attendee, Event, Ticket, Venue } from '../../data'
import { AttendeeSelectionModal } from './AttendeeSelectionModal'

type TicketPayload = Omit<Ticket, 'id'>

type TicketFormModalProps = {
  isOpen: boolean
  isEditMode: boolean
  ticket?: Ticket
  events: Event[]
  attendees: Attendee[]
  venues: Venue[]
  tickets: Ticket[]
  onSubmit: (payload: TicketPayload) => void
  onClose: () => void
}

export function TicketFormModal({
  isOpen,
  isEditMode,
  ticket,
  events,
  attendees,
  venues,
  tickets,
  onSubmit,
  onClose,
}: TicketFormModalProps) {
  const [eventId, setEventId] = useState('')
  const [attendeeId, setAttendeeId] = useState('')
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState<Ticket['status']>('issued')
  const [attendeeModalOpen, setAttendeeModalOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (isEditMode && ticket) {
      setEventId(ticket.event)
      setAttendeeId(ticket.attendee)
      setPrice(String(ticket.price))
      setStatus(ticket.status)
      return
    }

    setEventId(events[0]?.id ?? '')
    setAttendeeId('')
    setPrice('')
    setStatus('issued')
  }, [isOpen, isEditMode, ticket, events])

  const attendeeLabel = useMemo(() => {
    if (!attendeeId) {
      return 'No attendee selected'
    }

    const selected = attendees.find((item) => item.id === attendeeId)
    return selected ? `${selected.name} (${selected.email})` : 'No attendee selected'
  }, [attendees, attendeeId])

  const selectedEvent = useMemo(
    () => events.find((eventItem) => eventItem.id === eventId),
    [events, eventId],
  )

  const selectedVenue = useMemo(() => {
    if (!selectedEvent) {
      return undefined
    }

    return venues.find((venue) => venue.id === selectedEvent.venue)
  }, [selectedEvent, venues])

  const ticketCountsByEvent = useMemo(() => {
    const counts = new Map<string, number>()

    tickets.forEach((item) => {
      if (isEditMode && ticket && item.id === ticket.id) {
        return
      }

      counts.set(item.event, (counts.get(item.event) ?? 0) + 1)
    })

    return counts
  }, [tickets, isEditMode, ticket])

  const selectedEventTicketCount = ticketCountsByEvent.get(eventId) ?? 0
  const selectedVenueCapacity = selectedVenue?.capacity ?? 0
  const selectedEventIsFull = Boolean(
    selectedVenue && selectedEventTicketCount >= selectedVenue.capacity,
  )

  const eventOptions = useMemo(() => {
    return events.map((eventItem) => {
      const venue = venues.find((item) => item.id === eventItem.venue)
      const capacity = venue?.capacity ?? 0
      const used = ticketCountsByEvent.get(eventItem.id) ?? 0
      const isFull = capacity > 0 && used >= capacity

      return {
        id: eventItem.id,
        label: `${eventItem.name} (${used}/${capacity})`,
        isFull,
      }
    })
  }, [events, venues, ticketCountsByEvent])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsedPrice = Number(price)
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      toast.error('Please provide a valid ticket price.')
      return
    }

    if (!eventId || !attendeeId) {
      return
    }

    if (!isEditMode && selectedEventIsFull) {
      toast.error('Venue capacity reached for selected event.')
      return
    }

    onSubmit({
      event: eventId,
      attendee: attendeeId,
      price: parsedPrice,
      status,
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
            <div className="modal-content event-modal ticket-form-modal">
              <form onSubmit={handleSubmit}>
                <div className="modal-header event-modal-header d-flex justify-content-between align-items-center">
                  <h3 className="modal-title">{isEditMode ? 'Edit Ticket' : 'Add Ticket'}</h3>
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
                    <label className="form-label event-label" htmlFor="ticketEvent">
                      Event
                    </label>
                    <select
                      id="ticketEvent"
                      className="form-select form-select-lg"
                      value={eventId}
                      onChange={(event) => setEventId(event.target.value)}
                      required
                    >
                      {eventOptions.map((option) => {
                        const keepEnabled = isEditMode && option.id === ticket?.event
                        const disabled = option.isFull && !keepEnabled

                        return (
                          <option key={option.id} value={option.id} disabled={disabled}>
                            {option.label}
                          </option>
                        )
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="form-label event-label" htmlFor="ticketAttendee">
                      Attendee
                    </label>
                    <div className="event-venue-picker">
                      <input
                        id="ticketAttendee"
                        className="form-control form-control-lg"
                        value={attendeeLabel}
                        readOnly
                      />
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-lg"
                        onClick={() => setAttendeeModalOpen(true)}
                      >
                        Select Attendee
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="form-label event-label" htmlFor="ticketPrice">
                      Price
                    </label>
                    <input
                      id="ticketPrice"
                      type="number"
                      min={0}
                      step="0.01"
                      className="form-control form-control-lg"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label event-label" htmlFor="ticketStatus">
                      Status
                    </label>
                    <select
                      id="ticketStatus"
                      className="form-select form-select-lg"
                      value={status}
                      onChange={(event) => setStatus(event.target.value as Ticket['status'])}
                    >
                      <option value="issued">Issued</option>
                      <option value="paid">Paid</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <p className="ticket-capacity-note mb-0">
                    Venue capacity: {selectedVenueCapacity} | Tickets issued: {selectedEventTicketCount}
                  </p>
                  {!isEditMode && selectedEventIsFull && (
                    <p className="text-danger mb-0 small">
                      Capacity has been reached for this event. Choose another event.
                    </p>
                  )}
                </div>

                <div className="modal-footer event-modal-footer attendee-modal-footer">
                  <button type="button" className="btn btn-outline-secondary btn-lg" onClick={onClose}>
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn tracker-primary-btn"
                    disabled={
                      !eventId ||
                      !attendeeId ||
                      !price.trim() ||
                      (!isEditMode && selectedEventIsFull)
                    }
                  >
                    {isEditMode ? 'Save Ticket' : 'Add Ticket'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          <AttendeeSelectionModal
            isOpen={attendeeModalOpen}
            attendees={attendees}
            selectedAttendeeId={attendeeId}
            onSelect={setAttendeeId}
            onClose={() => setAttendeeModalOpen(false)}
          />
        </>
      )}
    </AnimatePresence>
  )
}

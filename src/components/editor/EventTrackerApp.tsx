import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import {
  loadAttendees,
  loadAppSettings,
  loadEvents,
  loadPaymentMethods,
  loadTickets,
  loadTicketPayments,
  loadVenues,
  saveAttendees,
  saveEvents,
  saveTickets,
  saveTicketPayments,
  saveVenues,
  type Attendee,
  type Event,
  type PaymentMethod,
  type Ticket,
  type TicketPayment,
  type Venue,
} from '../../data'
import { AttendeeFormModal } from '../attendees/AttendeeFormModal'
import { AttendeesPanel } from '../attendees/AttendeesPanel'
import { ConfirmDeleteModal } from '../events/ConfirmDeleteModal'
import { EventFormModal } from '../events/EventFormModal'
import { EventsPanel } from '../events/EventsPanel'
import { TicketFormModal } from '../tickets/TicketFormModal'
import { TicketsPanel } from '../tickets/TicketsPanel'
import { MarkPaidModal } from '../tracker/MarkPaidModal'
import { PaymentTrackerPanel } from '../tracker/PaymentTrackerPanel'
import { VenueFormModal } from '../venues/VenueFormModal'
import { VenuesPanel } from '../venues/VenuesPanel'
import { TrackerPanel } from '../content/TrackerPanel'
import { TrackerFooter } from '../layout/TrackerFooter'
import { TrackerHeader } from '../layout/TrackerHeader'
import { trackerTabs, type TrackerTabKey } from '../../types/tracker'

export function EventTrackerApp() {
  const [activeTab, setActiveTab] = useState<TrackerTabKey>('events')
  const [events, setEvents] = useState<Event[]>(() => loadEvents())
  const [attendees, setAttendees] = useState<Attendee[]>(() => loadAttendees())
  const [tickets, setTickets] = useState<Ticket[]>(() => loadTickets())
  const [ticketPayments, setTicketPayments] = useState<TicketPayment[]>(() =>
    loadTicketPayments(),
  )
  const [paymentMethods] = useState<PaymentMethod[]>(() => loadPaymentMethods())
  const [venues, setVenues] = useState<Venue[]>(() => loadVenues())
  const [appSettings] = useState(() => loadAppSettings())
  const [eventCreateOpen, setEventCreateOpen] = useState(false)
  const [eventEditOpen, setEventEditOpen] = useState(false)
  const [eventDeleteOpen, setEventDeleteOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>()
  const [attendeeCreateOpen, setAttendeeCreateOpen] = useState(false)
  const [attendeeEditOpen, setAttendeeEditOpen] = useState(false)
  const [attendeeDeleteOpen, setAttendeeDeleteOpen] = useState(false)
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | undefined>()
  const [venueCreateOpen, setVenueCreateOpen] = useState(false)
  const [venueEditOpen, setVenueEditOpen] = useState(false)
  const [venueDeleteOpen, setVenueDeleteOpen] = useState(false)
  const [selectedVenue, setSelectedVenue] = useState<Venue | undefined>()
  const [ticketCreateOpen, setTicketCreateOpen] = useState(false)
  const [ticketEditOpen, setTicketEditOpen] = useState(false)
  const [ticketDeleteOpen, setTicketDeleteOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>()
  const [markPaidOpen, setMarkPaidOpen] = useState(false)
  const [markUnpaidOpen, setMarkUnpaidOpen] = useState(false)
  const [selectedTrackerTicket, setSelectedTrackerTicket] = useState<Ticket | undefined>()

  useEffect(() => {
    saveEvents(events)
  }, [events])

  useEffect(() => {
    saveAttendees(attendees)
  }, [attendees])

  useEffect(() => {
    saveVenues(venues)
  }, [venues])

  useEffect(() => {
    saveTickets(tickets)
  }, [tickets])

  useEffect(() => {
    saveTicketPayments(ticketPayments)
  }, [ticketPayments])

  const currentTab = useMemo(
    () => trackerTabs.find((tab) => tab.key === activeTab) ?? trackerTabs[0],
    [activeTab],
  )

  const venueNameById = useMemo(
    () => new Map(venues.map((venue) => [venue.id, venue.name])),
    [venues],
  )

  const eventNameById = useMemo(
    () => new Map(events.map((eventItem) => [eventItem.id, eventItem.name])),
    [events],
  )

  const attendeeNameById = useMemo(
    () => new Map(attendees.map((attendee) => [attendee.id, attendee.name])),
    [attendees],
  )

  const currencySymbol = useMemo(() => {
    if (appSettings.defaultCurrency === 'EUR') {
      return 'EUR '
    }

    if (appSettings.defaultCurrency === 'GBP') {
      return 'GBP '
    }

    return 'USD '
  }, [appSettings.defaultCurrency])

  const handlePrimaryAction = () => {
    if (activeTab === 'events') {
      setSelectedEvent(undefined)
      setEventCreateOpen(true)
      return
    }

    if (activeTab === 'attendees') {
      setSelectedAttendee(undefined)
      setAttendeeCreateOpen(true)
      return
    }

    if (activeTab === 'venues') {
      setSelectedVenue(undefined)
      setVenueCreateOpen(true)
      return
    }

    if (activeTab === 'tickets') {
      setSelectedTicket(undefined)
      setTicketCreateOpen(true)
      return
    }

    toast.info(`${currentTab.actionLabel} form is ready to be implemented.`)
  }

  const handleCreateEvent = (payload: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      id: `evt-${crypto.randomUUID()}`,
      ...payload,
    }

    setEvents((current) => [newEvent, ...current])
    setEventCreateOpen(false)
    toast.success('Event added')
  }

  const handleEditEvent = (payload: Omit<Event, 'id'>) => {
    if (!selectedEvent) {
      return
    }

    setEvents((current) =>
      current.map((eventItem) =>
        eventItem.id === selectedEvent.id
          ? {
              ...eventItem,
              ...payload,
            }
          : eventItem,
      ),
    )
    setEventEditOpen(false)
    setSelectedEvent(undefined)
    toast.info('Event updated')
  }

  const handleDeleteEvent = () => {
    if (!selectedEvent) {
      return
    }

    setEvents((current) => current.filter((eventItem) => eventItem.id !== selectedEvent.id))
    setEventDeleteOpen(false)
    toast.warn('Event deleted')
    setSelectedEvent(undefined)
  }

  const handleCreateAttendee = (payload: Omit<Attendee, 'id'>) => {
    const newAttendee: Attendee = {
      id: `att-${crypto.randomUUID()}`,
      ...payload,
    }

    setAttendees((current) => [...current, newAttendee])
    setAttendeeCreateOpen(false)
    toast.success('Attendee added')
  }

  const handleEditAttendee = (payload: Omit<Attendee, 'id'>) => {
    if (!selectedAttendee) {
      return
    }

    setAttendees((current) =>
      current.map((attendee) =>
        attendee.id === selectedAttendee.id
          ? {
              ...attendee,
              ...payload,
            }
          : attendee,
      ),
    )

    setAttendeeEditOpen(false)
    setSelectedAttendee(undefined)
    toast.info('Attendee updated')
  }

  const handleDeleteAttendee = () => {
    if (!selectedAttendee) {
      return
    }

    setAttendees((current) =>
      current.filter((attendee) => attendee.id !== selectedAttendee.id),
    )
    setAttendeeDeleteOpen(false)
    setSelectedAttendee(undefined)
    toast.warn('Attendee deleted')
  }

  const handleCreateVenue = (payload: Omit<Venue, 'id'>) => {
    const newVenue: Venue = {
      id: `ven-${crypto.randomUUID()}`,
      ...payload,
    }

    setVenues((current) => [...current, newVenue])
    setVenueCreateOpen(false)
    toast.success('Venue added')
  }

  const handleEditVenue = (payload: Omit<Venue, 'id'>) => {
    if (!selectedVenue) {
      return
    }

    setVenues((current) =>
      current.map((venue) =>
        venue.id === selectedVenue.id
          ? {
              ...venue,
              ...payload,
            }
          : venue,
      ),
    )

    setVenueEditOpen(false)
    setSelectedVenue(undefined)
    toast.info('Venue updated')
  }

  const handleDeleteVenue = () => {
    if (!selectedVenue) {
      return
    }

    setVenues((current) => current.filter((venue) => venue.id !== selectedVenue.id))
    setVenueDeleteOpen(false)
    setSelectedVenue(undefined)
    toast.warn('Venue deleted')
  }

  const handleCreateTicket = (payload: Omit<Ticket, 'id'>) => {
    const newTicket: Ticket = {
      id: `tkt-${crypto.randomUUID()}`,
      ...payload,
    }

    setTickets((current) => [...current, newTicket])
    setTicketCreateOpen(false)
    toast.success('Ticket added')
  }

  const handleEditTicket = (payload: Omit<Ticket, 'id'>) => {
    if (!selectedTicket) {
      return
    }

    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === selectedTicket.id
          ? {
              ...ticket,
              ...payload,
            }
          : ticket,
      ),
    )

    setTicketEditOpen(false)
    setSelectedTicket(undefined)
    toast.info('Ticket updated')
  }

  const handleDeleteTicket = () => {
    if (!selectedTicket) {
      return
    }

    setTickets((current) => current.filter((ticket) => ticket.id !== selectedTicket.id))
    setTicketDeleteOpen(false)
    setSelectedTicket(undefined)
    toast.warn('Ticket deleted')
  }

  const handleOpenMarkPaid = (ticket: Ticket) => {
    setSelectedTrackerTicket(ticket)
    setMarkPaidOpen(true)
  }

  const handleConfirmMarkPaid = (payload: {
    datePaid: string
    paymentMethod: 'bank' | 'card' | 'cash'
  }) => {
    if (!selectedTrackerTicket) {
      return
    }

    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === selectedTrackerTicket.id
          ? {
              ...ticket,
              status: 'paid',
            }
          : ticket,
      ),
    )

    setTicketPayments((current) => {
      const existing = current.find((payment) => payment.ticket === selectedTrackerTicket.id)
      if (existing) {
        return current.map((payment) =>
          payment.ticket === selectedTrackerTicket.id
            ? {
                ...payment,
                datePaid: payload.datePaid,
                paymentMethod: payload.paymentMethod,
              }
            : payment,
        )
      }

      return [
        ...current,
        {
          ticket: selectedTrackerTicket.id,
          datePaid: payload.datePaid,
          paymentMethod: payload.paymentMethod,
        },
      ]
    })

    setMarkPaidOpen(false)
    setSelectedTrackerTicket(undefined)
    toast.success('Ticket marked as paid')
  }

  const handleOpenMarkUnpaid = (ticket: Ticket) => {
    setSelectedTrackerTicket(ticket)
    setMarkUnpaidOpen(true)
  }

  const handleConfirmMarkUnpaid = () => {
    if (!selectedTrackerTicket) {
      return
    }

    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === selectedTrackerTicket.id
          ? {
              ...ticket,
              status: 'issued',
            }
          : ticket,
      ),
    )

    setTicketPayments((current) =>
      current.filter((payment) => payment.ticket !== selectedTrackerTicket.id),
    )

    setMarkUnpaidOpen(false)
    setSelectedTrackerTicket(undefined)
    toast.info('Ticket marked as unpaid')
  }

  return (
    <main className="tracker-shell">
      <motion.div
        className="tracker-app"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <TrackerHeader tabs={trackerTabs} activeTab={activeTab} onChangeTab={setActiveTab} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="tracker-content"
          >
            {activeTab === 'events' ? (
              <EventsPanel
                events={events}
                tickets={tickets}
                venueNameById={venueNameById}
                currencySymbol={currencySymbol}
                onAdd={handlePrimaryAction}
                onEdit={(eventItem) => {
                  setSelectedEvent(eventItem)
                  setEventEditOpen(true)
                }}
                onDelete={(eventItem) => {
                  setSelectedEvent(eventItem)
                  setEventDeleteOpen(true)
                }}
              />
            ) : activeTab === 'attendees' ? (
              <AttendeesPanel
                attendees={attendees}
                onAdd={handlePrimaryAction}
                onEdit={(attendee) => {
                  setSelectedAttendee(attendee)
                  setAttendeeEditOpen(true)
                }}
                onDelete={(attendee) => {
                  setSelectedAttendee(attendee)
                  setAttendeeDeleteOpen(true)
                }}
              />
            ) : activeTab === 'venues' ? (
              <VenuesPanel
                venues={venues}
                onAdd={handlePrimaryAction}
                onEdit={(venue) => {
                  setSelectedVenue(venue)
                  setVenueEditOpen(true)
                }}
                onDelete={(venue) => {
                  setSelectedVenue(venue)
                  setVenueDeleteOpen(true)
                }}
              />
            ) : activeTab === 'tickets' ? (
              <TicketsPanel
                tickets={tickets}
                eventNameById={eventNameById}
                attendeeNameById={attendeeNameById}
                currencySymbol={currencySymbol}
                onAdd={handlePrimaryAction}
                onEdit={(ticket) => {
                  setSelectedTicket(ticket)
                  setTicketEditOpen(true)
                }}
                onDelete={(ticket) => {
                  setSelectedTicket(ticket)
                  setTicketDeleteOpen(true)
                }}
              />
            ) : activeTab === 'tracker' ? (
              <PaymentTrackerPanel
                tickets={tickets}
                ticketPayments={ticketPayments}
                paymentMethods={paymentMethods}
                eventNameById={eventNameById}
                attendeeNameById={attendeeNameById}
                currencySymbol={currencySymbol}
                onMarkPaid={handleOpenMarkPaid}
                onMarkUnpaid={handleOpenMarkUnpaid}
              />
            ) : (
              <TrackerPanel tab={currentTab} onPrimaryAction={handlePrimaryAction} />
            )}
          </motion.div>
        </AnimatePresence>

        <TrackerFooter />
      </motion.div>

      <EventFormModal
        isOpen={eventCreateOpen}
        isEditMode={false}
        venues={venues}
        onSubmit={handleCreateEvent}
        onClose={() => setEventCreateOpen(false)}
      />

      <EventFormModal
        isOpen={eventEditOpen}
        isEditMode
        eventItem={selectedEvent}
        venues={venues}
        onSubmit={handleEditEvent}
        onClose={() => {
          setEventEditOpen(false)
          setSelectedEvent(undefined)
        }}
      />

      <ConfirmDeleteModal
        isOpen={eventDeleteOpen}
        title="Delete Event"
        message={`Are you sure you want to delete "${selectedEvent?.name ?? 'this event'}"?`}
        confirmLabel="Delete"
        onConfirm={handleDeleteEvent}
        onClose={() => {
          setEventDeleteOpen(false)
          setSelectedEvent(undefined)
        }}
      />

      <AttendeeFormModal
        isOpen={attendeeCreateOpen}
        isEditMode={false}
        onSubmit={handleCreateAttendee}
        onClose={() => setAttendeeCreateOpen(false)}
      />

      <AttendeeFormModal
        isOpen={attendeeEditOpen}
        isEditMode
        attendee={selectedAttendee}
        onSubmit={handleEditAttendee}
        onClose={() => {
          setAttendeeEditOpen(false)
          setSelectedAttendee(undefined)
        }}
      />

      <ConfirmDeleteModal
        isOpen={attendeeDeleteOpen}
        title="Delete Attendee"
        message={`Are you sure you want to delete "${selectedAttendee?.name ?? 'this attendee'}"?`}
        confirmLabel="Delete"
        onConfirm={handleDeleteAttendee}
        onClose={() => {
          setAttendeeDeleteOpen(false)
          setSelectedAttendee(undefined)
        }}
      />

      <VenueFormModal
        isOpen={venueCreateOpen}
        isEditMode={false}
        onSubmit={handleCreateVenue}
        onClose={() => setVenueCreateOpen(false)}
      />

      <VenueFormModal
        isOpen={venueEditOpen}
        isEditMode
        venue={selectedVenue}
        onSubmit={handleEditVenue}
        onClose={() => {
          setVenueEditOpen(false)
          setSelectedVenue(undefined)
        }}
      />

      <ConfirmDeleteModal
        isOpen={venueDeleteOpen}
        title="Delete Venue"
        message={`Are you sure you want to delete "${selectedVenue?.name ?? 'this venue'}"?`}
        confirmLabel="Delete"
        onConfirm={handleDeleteVenue}
        onClose={() => {
          setVenueDeleteOpen(false)
          setSelectedVenue(undefined)
        }}
      />

      <TicketFormModal
        isOpen={ticketCreateOpen}
        isEditMode={false}
        events={events}
        attendees={attendees}
        venues={venues}
        tickets={tickets}
        onSubmit={handleCreateTicket}
        onClose={() => setTicketCreateOpen(false)}
      />

      <TicketFormModal
        isOpen={ticketEditOpen}
        isEditMode
        ticket={selectedTicket}
        events={events}
        attendees={attendees}
        venues={venues}
        tickets={tickets}
        onSubmit={handleEditTicket}
        onClose={() => {
          setTicketEditOpen(false)
          setSelectedTicket(undefined)
        }}
      />

      <ConfirmDeleteModal
        isOpen={ticketDeleteOpen}
        title="Delete Ticket"
        message={`Are you sure you want to delete this ticket for "${eventNameById.get(selectedTicket?.event ?? '') ?? 'selected event'}"?`}
        confirmLabel="Delete"
        onConfirm={handleDeleteTicket}
        onClose={() => {
          setTicketDeleteOpen(false)
          setSelectedTicket(undefined)
        }}
      />

      <MarkPaidModal
        isOpen={markPaidOpen}
        paymentMethods={paymentMethods}
        initialDatePaid={
          ticketPayments.find((payment) => payment.ticket === selectedTrackerTicket?.id)
            ?.datePaid
        }
        initialMethod={
          ticketPayments.find((payment) => payment.ticket === selectedTrackerTicket?.id)
            ?.paymentMethod
        }
        onConfirm={handleConfirmMarkPaid}
        onClose={() => {
          setMarkPaidOpen(false)
          setSelectedTrackerTicket(undefined)
        }}
      />

      <ConfirmDeleteModal
        isOpen={markUnpaidOpen}
        title="Mark as Unpaid"
        message="Do you want to mark this ticket as unpaid and remove its payment record?"
        confirmLabel="Mark Unpaid"
        onConfirm={handleConfirmMarkUnpaid}
        onClose={() => {
          setMarkUnpaidOpen(false)
          setSelectedTrackerTicket(undefined)
        }}
      />
    </main>
  )
}

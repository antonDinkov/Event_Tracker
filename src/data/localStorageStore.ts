import {
  sampleAppSettings,
  sampleAttendees,
  sampleCurrencies,
  sampleEvents,
  samplePaymentMethods,
  sampleTicketPayments,
  sampleTickets,
  sampleVenues,
} from './sampleData'
import type {
  AppSettings,
  Attendee,
  Currency,
  CurrencyCode,
  Event,
  EventTrackerDataStore,
  PaymentMethod,
  PaymentMethodName,
  Ticket,
  TicketPayment,
  TicketStatus,
  Venue,
} from './types'

const STORAGE_KEY = 'event-tracker/data-store-v6'

const PAYMENT_METHODS: PaymentMethodName[] = ['bank', 'card', 'cash']
const CURRENCIES: CurrencyCode[] = ['EUR', 'USD', 'GBP']
const TICKET_STATUSES: TicketStatus[] = ['issued', 'paid', 'cancelled']

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object'

const isString = (value: unknown): value is string => typeof value === 'string'
const isNumber = (value: unknown): value is number => typeof value === 'number'

const isPaymentMethodName = (value: unknown): value is PaymentMethodName =>
  isString(value) && PAYMENT_METHODS.includes(value as PaymentMethodName)

const isCurrencyCode = (value: unknown): value is CurrencyCode =>
  isString(value) && CURRENCIES.includes(value as CurrencyCode)

const isTicketStatus = (value: unknown): value is TicketStatus =>
  isString(value) && TICKET_STATUSES.includes(value as TicketStatus)

const isEvent = (value: unknown): value is Event => {
  if (!isRecord(value)) {
    return false
  }

  return (
    isString(value.id) &&
    isString(value.name) &&
    isString(value.date) &&
    isString(value.venue) &&
    isString(value.description)
  )
}

const isAttendee = (value: unknown): value is Attendee => {
  if (!isRecord(value)) {
    return false
  }

  return (
    isString(value.id) &&
    isString(value.name) &&
    isString(value.email) &&
    isString(value.phone)
  )
}

const isVenue = (value: unknown): value is Venue => {
  if (!isRecord(value)) {
    return false
  }

  return (
    isString(value.id) &&
    isString(value.name) &&
    isString(value.address) &&
    isNumber(value.capacity)
  )
}

const isTicket = (value: unknown): value is Ticket => {
  if (!isRecord(value)) {
    return false
  }

  return (
    isString(value.id) &&
    isString(value.event) &&
    isString(value.attendee) &&
    isNumber(value.price) &&
    isTicketStatus(value.status)
  )
}

const isPaymentMethod = (value: unknown): value is PaymentMethod => {
  if (!isRecord(value)) {
    return false
  }

  return isPaymentMethodName(value.name) && isString(value.description)
}

const isTicketPayment = (value: unknown): value is TicketPayment => {
  if (!isRecord(value)) {
    return false
  }

  return (
    isString(value.ticket) &&
    isString(value.datePaid) &&
    isPaymentMethodName(value.paymentMethod)
  )
}

const isCurrency = (value: unknown): value is Currency => {
  if (!isRecord(value)) {
    return false
  }

  return isCurrencyCode(value.name) && isString(value.description)
}

const isAppSettings = (value: unknown): value is AppSettings => {
  if (!isRecord(value)) {
    return false
  }

  return isCurrencyCode(value.defaultCurrency)
}

const isEventTrackerDataStore = (value: unknown): value is EventTrackerDataStore => {
  if (!isRecord(value)) {
    return false
  }

  return (
    Array.isArray(value.events) &&
    value.events.every(isEvent) &&
    Array.isArray(value.attendees) &&
    value.attendees.every(isAttendee) &&
    Array.isArray(value.venues) &&
    value.venues.every(isVenue) &&
    Array.isArray(value.tickets) &&
    value.tickets.every(isTicket) &&
    Array.isArray(value.paymentMethods) &&
    value.paymentMethods.every(isPaymentMethod) &&
    Array.isArray(value.ticketPayments) &&
    value.ticketPayments.every(isTicketPayment) &&
    Array.isArray(value.currencies) &&
    value.currencies.every(isCurrency) &&
    isAppSettings(value.appSettings)
  )
}

export const createDefaultDataStore = (): EventTrackerDataStore => ({
  events: sampleEvents,
  attendees: sampleAttendees,
  venues: sampleVenues,
  tickets: sampleTickets,
  paymentMethods: samplePaymentMethods,
  ticketPayments: sampleTicketPayments,
  currencies: sampleCurrencies,
  appSettings: sampleAppSettings,
})

const writeDataStore = (store: EventTrackerDataStore): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export const loadDataStore = (): EventTrackerDataStore => {
  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    const defaults = createDefaultDataStore()
    writeDataStore(defaults)
    return defaults
  }

  try {
    const parsed = JSON.parse(raw)

    if (isEventTrackerDataStore(parsed)) {
      return parsed
    }
  } catch {
    // fall through to reset invalid data
  }

  const defaults = createDefaultDataStore()
  writeDataStore(defaults)
  return defaults
}

export const saveDataStore = (store: EventTrackerDataStore): void => {
  writeDataStore(store)
}

export const clearDataStore = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}

export const loadEvents = (): Event[] => loadDataStore().events
export const saveEvents = (events: Event[]): void => {
  const current = loadDataStore()
  saveDataStore({ ...current, events })
}

export const loadAttendees = (): Attendee[] => loadDataStore().attendees
export const saveAttendees = (attendees: Attendee[]): void => {
  const current = loadDataStore()
  saveDataStore({ ...current, attendees })
}

export const loadVenues = (): Venue[] => loadDataStore().venues
export const saveVenues = (venues: Venue[]): void => {
  const current = loadDataStore()
  saveDataStore({ ...current, venues })
}

export const loadTickets = (): Ticket[] => loadDataStore().tickets
export const saveTickets = (tickets: Ticket[]): void => {
  const current = loadDataStore()
  saveDataStore({ ...current, tickets })
}

export const loadPaymentMethods = (): PaymentMethod[] => loadDataStore().paymentMethods
export const savePaymentMethods = (paymentMethods: PaymentMethod[]): void => {
  const current = loadDataStore()
  saveDataStore({ ...current, paymentMethods })
}

export const loadTicketPayments = (): TicketPayment[] => loadDataStore().ticketPayments
export const saveTicketPayments = (ticketPayments: TicketPayment[]): void => {
  const current = loadDataStore()
  saveDataStore({ ...current, ticketPayments })
}

export const loadCurrencies = (): Currency[] => loadDataStore().currencies
export const saveCurrencies = (currencies: Currency[]): void => {
  const current = loadDataStore()
  saveDataStore({ ...current, currencies })
}

export const loadAppSettings = (): AppSettings => loadDataStore().appSettings
export const saveAppSettings = (appSettings: AppSettings): void => {
  const current = loadDataStore()
  saveDataStore({ ...current, appSettings })
}

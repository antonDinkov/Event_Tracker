export type Event = {
  id: string
  name: string
  date: string
  venue: string
  description: string
}

export type Attendee = {
  id: string
  name: string
  email: string
  phone: string
}

export type Venue = {
  id: string
  name: string
  address: string
  capacity: number
}

export type TicketStatus = 'issued' | 'paid' | 'cancelled'

export type Ticket = {
  id: string
  event: string
  attendee: string
  price: number
  status: TicketStatus
}

export type PaymentMethodName = 'bank' | 'card' | 'cash'

export type PaymentMethod = {
  name: PaymentMethodName
  description: string
}

export type TicketPayment = {
  ticket: string
  datePaid: string
  paymentMethod: PaymentMethodName
}

export type CurrencyCode = 'EUR' | 'USD' | 'GBP'

export type Currency = {
  name: CurrencyCode
  description: string
}

export type AppSettings = {
  defaultCurrency: CurrencyCode
}

export type EventTrackerDataStore = {
  events: Event[]
  attendees: Attendee[]
  venues: Venue[]
  tickets: Ticket[]
  paymentMethods: PaymentMethod[]
  ticketPayments: TicketPayment[]
  currencies: Currency[]
  appSettings: AppSettings
}

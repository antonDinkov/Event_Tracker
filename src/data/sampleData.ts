import type {
  AppSettings,
  Attendee,
  Currency,
  Event,
  PaymentMethod,
  Ticket,
  TicketPayment,
  Venue,
} from './types'

export const sampleEvents: Event[] = [
  {
    id: 'evt-ai-product-summit',
    name: 'AI Product Summit',
    date: '2026-05-10',
    venue: 'ven-harbor-convention',
    description: 'Conference focused on practical AI product delivery.',
  },
  {
    id: 'evt-frontend-architecture-day',
    name: 'Frontend Architecture Day',
    date: '2026-06-18',
    venue: 'ven-city-tech-hall',
    description: 'Talks and workshops on modern React architecture.',
  },
  {
    id: 'evt-ai-business-seminar',
    name: 'AI for Business Seminar',
    date: '2026-07-10',
    venue: 'ven-north-bridge-arena',
    description: 'A practical seminar on introducing AI in business teams.',
  },
]

export const sampleAttendees: Attendee[] = [
  {
    id: 'att-elena-markovic',
    name: 'Elena Markovic',
    email: 'elena.markovic@example.com',
    phone: '+49-30-555-1201',
  },
  {
    id: 'att-daniel-brooks',
    name: 'Daniel Brooks',
    email: 'daniel.brooks@example.com',
    phone: '+1-202-555-0188',
  },
  {
    id: 'att-priya-shah',
    name: 'Priya Shah',
    email: 'priya.shah@example.com',
    phone: '+44-20-555-0142',
  },
  {
    id: 'att-maria-gonzalez',
    name: 'Maria Gonzalez',
    email: 'mari.gonzalez@gmail.com',
    phone: '0879777777',
  },
]

export const sampleVenues: Venue[] = [
  {
    id: 'ven-harbor-convention',
    name: 'Harbor Convention Center',
    address: '12 Harbor Way, Rotterdam',
    capacity: 1200,
  },
  {
    id: 'ven-city-tech-hall',
    name: 'City Tech Hall',
    address: '88 Midtown Ave, London',
    capacity: 700,
  },
  {
    id: 'ven-north-bridge-arena',
    name: 'Grand Event Hall',
    address: '221B Baker Street, London',
    capacity: 2,
  },
]

export const sampleTickets: Ticket[] = [
  {
    id: 'tkt-ai-001',
    event: 'evt-ai-product-summit',
    attendee: 'att-daniel-brooks',
    price: 249,
    status: 'issued',
  },
  {
    id: 'tkt-fe-001',
    event: 'evt-frontend-architecture-day',
    attendee: 'att-priya-shah',
    price: 179,
    status: 'paid',
  },
  {
    id: 'tkt-biz-001',
    event: 'evt-ai-business-seminar',
    attendee: 'att-maria-gonzalez',
    price: 50,
    status: 'issued',
  },
  {
    id: 'tkt-biz-002',
    event: 'evt-ai-business-seminar',
    attendee: 'att-daniel-brooks',
    price: 20,
    status: 'paid',
  },
]

export const samplePaymentMethods: PaymentMethod[] = [
  {
    name: 'bank',
    description: 'Bank transfer payment',
  },
  {
    name: 'card',
    description: 'Debit or credit card payment',
  },
  {
    name: 'cash',
    description: 'Cash payment',
  },
]

export const sampleTicketPayments: TicketPayment[] = [
  {
    ticket: 'tkt-fe-001',
    datePaid: '2026-03-25',
    paymentMethod: 'bank',
  },
  {
    ticket: 'tkt-biz-002',
    datePaid: '2026-04-01',
    paymentMethod: 'card',
  },
]

export const sampleCurrencies: Currency[] = [
  {
    name: 'EUR',
    description: 'Euro',
  },
  {
    name: 'USD',
    description: 'United States Dollar',
  },
  {
    name: 'GBP',
    description: 'British Pound Sterling',
  },
]

export const sampleAppSettings: AppSettings = {
  defaultCurrency: 'EUR',
}

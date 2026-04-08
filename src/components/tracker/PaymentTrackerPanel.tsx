import { useMemo, useState } from 'react'
import type { PaymentMethod, Ticket, TicketPayment } from '../../data'

type TrackerRow = {
  ticket: Ticket
  eventName: string
  attendeeName: string
  paymentStatus: 'Paid' | 'Unpaid'
  datePaid: string
  methodLabel: string
}

type PaymentTrackerPanelProps = {
  tickets: Ticket[]
  ticketPayments: TicketPayment[]
  paymentMethods: PaymentMethod[]
  eventNameById: Map<string, string>
  attendeeNameById: Map<string, string>
  currencySymbol: string
  onMarkPaid: (ticket: Ticket) => void
  onMarkUnpaid: (ticket: Ticket) => void
}

const formatDate = (value: string): string => {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return '-'
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

export function PaymentTrackerPanel({
  tickets,
  ticketPayments,
  paymentMethods,
  eventNameById,
  attendeeNameById,
  currencySymbol,
  onMarkPaid,
  onMarkUnpaid,
}: PaymentTrackerPanelProps) {
  const [search, setSearch] = useState('')

  const paymentByTicketId = useMemo(
    () => new Map(ticketPayments.map((payment) => [payment.ticket, payment])),
    [ticketPayments],
  )

  const paymentMethodDescription = useMemo(
    () => new Map(paymentMethods.map((method) => [method.name, method.description])),
    [paymentMethods],
  )

  const rows = useMemo<TrackerRow[]>(
    () =>
      tickets.map((ticket) => {
        const payment = paymentByTicketId.get(ticket.id)
        const paid = ticket.status === 'paid' && Boolean(payment)

        return {
          ticket,
          eventName: eventNameById.get(ticket.event) ?? 'Unknown event',
          attendeeName: attendeeNameById.get(ticket.attendee) ?? 'Unknown attendee',
          paymentStatus: paid ? 'Paid' : 'Unpaid',
          datePaid: paid ? formatDate(payment?.datePaid ?? '') : '-',
          methodLabel: paid
            ? paymentMethodDescription.get(payment?.paymentMethod ?? 'bank') ?? '-'
            : '-',
        }
      }),
    [
      tickets,
      paymentByTicketId,
      eventNameById,
      attendeeNameById,
      paymentMethodDescription,
    ],
  )

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      return rows
    }

    return rows.filter((row) => {
      const fullText = [
        row.eventName,
        row.attendeeName,
        row.paymentStatus,
        row.methodLabel,
      ]
        .join(' ')
        .toLowerCase()

      return fullText.includes(query)
    })
  }, [rows, search])

  return (
    <section className="tracker-panel tracker-tab-panel">
      <div className="tracker-panel-header">
        <div className="tracker-panel-title-wrap">
          <span className="tracker-panel-icon" aria-hidden="true">
            <i className="bi bi-bar-chart-line-fill" />
          </span>
          <div>
            <h2 className="tracker-panel-title">Tracker</h2>
            <p className="tracker-panel-description">
              Monitor ticket payment status, dates, and payment methods across all events.
            </p>
          </div>
        </div>
      </div>

      <div className="input-group tracker-search mt-3">
        <span className="input-group-text bg-white">
          <i className="bi bi-search" aria-hidden="true" />
        </span>
        <input
          className="form-control"
          placeholder="Search by event, attendee, status, payment method..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {search && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setSearch('')}
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="table-responsive">
        <table className="table tracker-table align-middle mb-0">
          <thead>
            <tr>
              <th>Event</th>
              <th>Attendee</th>
              <th>Price</th>
              <th>Payment Status</th>
              <th>Date Paid</th>
              <th>Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.ticket.id}>
                <td className="fw-semibold">{row.eventName}</td>
                <td>{row.attendeeName}</td>
                <td>
                  {currencySymbol}
                  {row.ticket.price.toFixed(2)}
                </td>
                <td>
                  <span
                    className={
                      row.paymentStatus === 'Paid'
                        ? 'status-pill status-pill-paid'
                        : 'status-pill status-pill-issued'
                    }
                  >
                    {row.paymentStatus}
                  </span>
                </td>
                <td>{row.datePaid}</td>
                <td>{row.methodLabel}</td>
                <td>
                  {row.paymentStatus === 'Paid' ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger tracker-action-btn"
                      onClick={() => onMarkUnpaid(row.ticket)}
                    >
                      Mark Unpaid
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary tracker-action-btn"
                      onClick={() => onMarkPaid(row.ticket)}
                    >
                      <i className="bi bi-check-circle-fill me-1" aria-hidden="true" />
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

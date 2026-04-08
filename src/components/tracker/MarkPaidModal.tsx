import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { PaymentMethod, PaymentMethodName } from '../../data'

type MarkPaidModalProps = {
  isOpen: boolean
  paymentMethods: PaymentMethod[]
  initialDatePaid?: string
  initialMethod?: PaymentMethodName
  onConfirm: (payload: { datePaid: string; paymentMethod: PaymentMethodName }) => void
  onClose: () => void
}

export function MarkPaidModal({
  isOpen,
  paymentMethods,
  initialDatePaid,
  initialMethod,
  onConfirm,
  onClose,
}: MarkPaidModalProps) {
  const [datePaid, setDatePaid] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodName>('bank')

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const today = new Date().toISOString().slice(0, 10)
    setDatePaid(initialDatePaid ?? today)
    setPaymentMethod(initialMethod ?? paymentMethods[0]?.name ?? 'bank')
  }, [isOpen, initialDatePaid, initialMethod, paymentMethods])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onConfirm({
      datePaid,
      paymentMethod,
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
            transition={{ duration: 0.2 }}
          >
            <div className="modal-content event-modal ticket-payment-modal">
              <form onSubmit={handleSubmit}>
                <div className="modal-header event-modal-header d-flex justify-content-between align-items-center">
                  <h3 className="modal-title">Mark as Paid</h3>
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
                    <label className="form-label event-label" htmlFor="trackerDatePaid">
                      Date of Payment
                    </label>
                    <input
                      id="trackerDatePaid"
                      type="date"
                      className="form-control form-control-lg"
                      value={datePaid}
                      onChange={(event) => setDatePaid(event.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label event-label" htmlFor="trackerPaymentMethod">
                      Payment Method
                    </label>
                    <select
                      id="trackerPaymentMethod"
                      className="form-select form-select-lg"
                      value={paymentMethod}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value as PaymentMethodName)
                      }
                    >
                      {paymentMethods.map((method) => (
                        <option key={method.name} value={method.name}>
                          {method.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="modal-footer event-modal-footer attendee-modal-footer">
                  <button type="button" className="btn btn-outline-secondary btn-lg" onClick={onClose}>
                    Close
                  </button>
                  <button type="submit" className="btn tracker-primary-btn" disabled={!datePaid}>
                    Confirm Payment
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

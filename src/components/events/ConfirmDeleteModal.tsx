import { AnimatePresence, motion } from 'framer-motion'

type ConfirmDeleteModalProps = {
  isOpen: boolean
  title: string
  message: string
  confirmLabel: string
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmDeleteModal({
  isOpen,
  title,
  message,
  confirmLabel,
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) {
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
            <div className="modal-content event-modal confirm-delete-modal">
              <div className="modal-header event-modal-header">
                <h3 className="modal-title">{title}</h3>
              </div>
              <div className="modal-body">
                <p className="mb-0 text-secondary">{message}</p>
              </div>
              <div className="modal-footer event-modal-footer">
                <button type="button" className="btn btn-outline-secondary btn-lg" onClick={onClose}>
                  Cancel
                </button>
                <button type="button" className="btn btn-outline-danger btn-lg" onClick={onConfirm}>
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

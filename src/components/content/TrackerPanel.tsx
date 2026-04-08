import type { TrackerTab } from '../../types/tracker'

type TrackerPanelProps = {
  tab: TrackerTab
  onPrimaryAction: () => void
}

export function TrackerPanel({ tab, onPrimaryAction }: TrackerPanelProps) {
  return (
    <section className="tracker-panel">
      <div className="tracker-panel-header">
        <div className="tracker-panel-title-wrap">
          <span className="tracker-panel-icon" aria-hidden="true">
            <i className={tab.iconClass} />
          </span>
          <div>
            <h2 className="tracker-panel-title">{tab.title}</h2>
            <p className="tracker-panel-description">{tab.description}</p>
          </div>
        </div>

        <button type="button" className="btn tracker-primary-btn" onClick={onPrimaryAction}>
          {tab.actionLabel}
        </button>
      </div>

      <div className="tracker-empty-state">
        <h3>{tab.emptyTitle}</h3>
        <p>{tab.emptyDescription}</p>
      </div>
    </section>
  )
}

import type { TrackerTab, TrackerTabKey } from '../../types/tracker'

type TrackerHeaderProps = {
  tabs: TrackerTab[]
  activeTab: TrackerTabKey
  onChangeTab: (tab: TrackerTabKey) => void
}

export function TrackerHeader({ tabs, activeTab, onChangeTab }: TrackerHeaderProps) {
  return (
    <header className="tracker-header">
      <div>
        <h1 className="tracker-title">Event Tracker</h1>
        <p className="tracker-subtitle">Manage events, attendees, venues, tickets, and payments</p>
      </div>

      <nav className="tracker-tabs" aria-label="Event tracker navigation">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab

          return (
            <button
              key={tab.key}
              type="button"
              className={isActive ? 'tracker-tab active' : 'tracker-tab'}
              onClick={() => onChangeTab(tab.key)}
            >
              <i className={`${tab.iconClass} me-2`} aria-hidden="true" />
              {tab.label}
            </button>
          )
        })}
      </nav>
    </header>
  )
}

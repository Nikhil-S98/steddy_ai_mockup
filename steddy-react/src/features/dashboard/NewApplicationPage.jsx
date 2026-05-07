import DashboardShell from "./components/DashboardShell"
import { CARD_VARIANTS } from "./data/dashboardData"

export default function NewApplicationPage({
  onBackToDashboard,
  activeCard,
  setActiveCard,
  colorMode,
  setColorMode,
  colorThemes,
  uiFont,
  setUiFont,
  uiFontOptions,
}) {
  return (
    <div className="h-full min-h-0 flex flex-col">
      <DashboardShell
        colorMode={colorMode}
        setColorMode={setColorMode}
        colorThemes={colorThemes}
        uiFont={uiFont}
        setUiFont={setUiFont}
        uiFontOptions={uiFontOptions}
        activeCard={activeCard}
        setActiveCard={(key) => {
          setActiveCard(key)
          onBackToDashboard()
        }}
        cardVariants={CARD_VARIANTS}
      >
        <div className="flex h-full min-h-0 w-full max-w-[1260px] flex-1 flex-col min-w-0 self-center">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d9d9d9] pb-4">
            <div className="min-w-0">
              <h1 className="text-xl font-semibold leading-tight tracking-tight text-[#1c1b1f] sm:text-2xl">
                New application
              </h1>
              <p className="mt-1 text-[11px] text-[#4c4f69]">
                Start a new underwriting file. Form fields and steps can be added here.
              </p>
            </div>
            <button
              type="button"
              onClick={onBackToDashboard}
              className="interactive-pop shrink-0 rounded-md border border-[#4c4f69] bg-[#fafafa] px-4 py-2 text-xs font-semibold text-[#4c4f69] transition hover:bg-[#efefef]"
            >
              Back to dashboard
            </button>
          </header>

          <div className="mt-6 flex min-h-[240px] flex-1 flex-col rounded-lg border border-[#d9d9d9] bg-[#fafafa] p-6">
            <p className="text-sm text-[#4c4f69]">
              This is a placeholder for the new application workflow. Use the sidebar to change theme or font; use{" "}
              <span className="font-medium text-[#1c1b1f]">Back to dashboard</span> to return to the applications list.
            </p>
          </div>
        </div>
      </DashboardShell>
    </div>
  )
}

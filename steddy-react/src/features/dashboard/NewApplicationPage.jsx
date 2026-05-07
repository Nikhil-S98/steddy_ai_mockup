import { useEffect, useRef, useState } from "react"

const MCA_FILE_NAME = "MCA Application Form.pdf"
const REQUIRED_BANK_FILES = ["Bank Statement - Jan.pdf", "Bank Statement - Feb.pdf", "Bank Statement - Mar.pdf"]

const STATUS_STYLES = {
  uploaded: "border-[#b9c7de] bg-[#eef3ff] text-[#4e6aa1]",
  processing: "border-[#f2d68d] bg-[#fff7df] text-[#8a6723]",
  complete: "border-[#a9dfbf] bg-[#eafaf0] text-[#24734d]",
}

const EMPTY_FORM_VALUES = {
  companyName: "",
  ownerName: "",
  ein: "",
  email: "",
  phone: "",
  addressLine1: "",
  city: "",
  stateCode: "",
  postalCode: "",
}

const AUTOFILLED_FORM_VALUES = {
  companyName: "Northwind Hospitality LLC",
  ownerName: "Avery Thompson",
  ein: "84-2193341",
  email: "avery@northwindhospitality.com",
  phone: "(212) 555-0189",
  addressLine1: "114 W 27th St",
  city: "New York",
  stateCode: "NY",
  postalCode: "10001",
}

export default function NewApplicationPage({ isOpen, onClose, onCreateApplication }) {
  const [mcaRow, setMcaRow] = useState(null)
  const [bankRows, setBankRows] = useState([])
  const [formValues, setFormValues] = useState(EMPTY_FORM_VALUES)
  const mcaIntervalRef = useRef(null)
  const bankIntervalRef = useRef(null)
  const isMcaComplete = mcaRow?.status === "complete"
  const canUploadBankStatements = Boolean(mcaRow)
  const allBankStatementsComplete =
    bankRows.length === REQUIRED_BANK_FILES.length && bankRows.every((row) => row.status === "complete")
  const canCreateApplication = isMcaComplete && allBankStatementsComplete

  useEffect(() => {
    const clearTimers = () => {
      if (mcaIntervalRef.current) {
        window.clearInterval(mcaIntervalRef.current)
        mcaIntervalRef.current = null
      }
      if (bankIntervalRef.current) {
        window.clearInterval(bankIntervalRef.current)
        bankIntervalRef.current = null
      }
    }

    return () => {
      clearTimers()
    }
  }, [])

  useEffect(() => {
    if (isOpen) return

    if (mcaIntervalRef.current) {
      window.clearInterval(mcaIntervalRef.current)
      mcaIntervalRef.current = null
    }
    if (bankIntervalRef.current) {
      window.clearInterval(bankIntervalRef.current)
      bankIntervalRef.current = null
    }
    setMcaRow(null)
    setBankRows([])
    setFormValues(EMPTY_FORM_VALUES)
  }, [isOpen])

  const handleMcaDropMock = () => {
    if (mcaIntervalRef.current) {
      window.clearInterval(mcaIntervalRef.current)
      mcaIntervalRef.current = null
    }
    if (bankIntervalRef.current) {
      window.clearInterval(bankIntervalRef.current)
      bankIntervalRef.current = null
    }

    setMcaRow({ fileName: MCA_FILE_NAME, status: "uploaded" })
    setBankRows([])
    setFormValues(EMPTY_FORM_VALUES)

    let tick = 0
    mcaIntervalRef.current = window.setInterval(() => {
      tick += 1
      if (tick === 1) setMcaRow({ fileName: MCA_FILE_NAME, status: "processing" })
      if (tick >= 2) {
        window.clearInterval(mcaIntervalRef.current)
        mcaIntervalRef.current = null
        setMcaRow({ fileName: MCA_FILE_NAME, status: "complete" })
        setFormValues(AUTOFILLED_FORM_VALUES)
      }
    }, 550)
  }

  const handleBankDropMock = () => {
    if (!isMcaComplete) return
    if (bankIntervalRef.current) {
      window.clearInterval(bankIntervalRef.current)
      bankIntervalRef.current = null
    }

    setBankRows(REQUIRED_BANK_FILES.map((fileName) => ({ fileName, status: "uploaded" })))

    let tick = 0
    const totalTicks = REQUIRED_BANK_FILES.length * 2
    bankIntervalRef.current = window.setInterval(() => {
      tick += 1
      setBankRows((previousRows) =>
        previousRows.map((row, index) => {
          if (tick === index + 1) return { ...row, status: "processing" }
          if (tick === REQUIRED_BANK_FILES.length + index + 1) return { ...row, status: "complete" }
          return row
        }),
      )

      if (tick >= totalTicks) {
        window.clearInterval(bankIntervalRef.current)
        bankIntervalRef.current = null
      }
    }, 450)
  }

  const updateField = (fieldName) => (event) => {
    const nextValue = event.target.value
    setFormValues((previousValues) => ({ ...previousValues, [fieldName]: nextValue }))
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#fafafa]">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d9d9d9] px-5 py-4">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold leading-tight tracking-tight text-[#1c1b1f]">New application</h1>
          <p className="mt-1 text-[11px] text-[#4c4f69]">
            Upload bank statements and application form. Fields can auto-fill, or be adjusted manually.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="interactive-pop shrink-0 rounded-md border border-[#4c4f69] bg-[#fafafa] px-3 py-1.5 text-xs font-semibold text-[#4c4f69] transition hover:bg-[#efefef]"
        >
          Close
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        <div className="min-h-0 flex-1 overflow-y-auto p-4 pr-3">
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleMcaDropMock}
              className="w-full rounded-lg border border-dashed border-[#9fb0cf] bg-[#e9f0ff]/60 p-3 text-left transition hover:border-[#7e98c5] hover:bg-[#e9f0ff]"
            >
              <h2 className="text-sm font-semibold text-[#1c1b1f]">MCA application form</h2>
              <p className="mt-1 text-xs text-[#4c4f69]">Drop the MCA application form first to begin autofill.</p>
              <p className="mt-2 text-[11px] font-medium text-[#3e5f95]">Click to simulate MCA form upload</p>
            </button>

            {canUploadBankStatements ? (
              <button
                type="button"
                onClick={handleBankDropMock}
                className={`w-full rounded-lg border border-dashed p-3 text-left transition ${
                  isMcaComplete
                    ? "border-[#9fb0cf] bg-[#e9f0ff]/60 hover:border-[#7e98c5] hover:bg-[#e9f0ff]"
                    : "cursor-not-allowed border-[#c8cfda] bg-[#f5f6f8] text-[#7e8797]"
                }`}
                disabled={!isMcaComplete}
              >
                <h2 className="text-sm font-semibold text-[#1c1b1f]">Bank statements (3 required)</h2>
                <p className="mt-1 text-xs text-[#4c4f69]">Upload January, February, and March statements.</p>
                <p className="mt-2 text-[11px] font-medium text-[#3e5f95]">Click to simulate bank statements upload</p>
              </button>
            ) : null}

            <section className="rounded-lg border border-[#d9d9d9] bg-[#fafafa] p-3">
              <h2 className="text-lg font-semibold leading-tight tracking-tight text-[#1c1b1f]">Business Information</h2>

              <div className="mt-3 space-y-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#1c1b1f]">Company Name</span>
                  <input
                    type="text"
                    value={formValues.companyName}
                    onChange={updateField("companyName")}
                    className="h-9 w-full rounded-md border border-[#d3d7de] bg-[#fafafa] px-3 text-sm text-[#1c1b1f] outline-none transition focus:border-[#8da2cc]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#1c1b1f]">Owner Name</span>
                  <input
                    type="text"
                    value={formValues.ownerName}
                    onChange={updateField("ownerName")}
                    className="h-9 w-full rounded-md border border-[#d3d7de] bg-[#fafafa] px-3 text-sm text-[#1c1b1f] outline-none transition focus:border-[#8da2cc]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#1c1b1f]">EIN</span>
                  <input
                    type="text"
                    placeholder="XX-XXXXXXX"
                    value={formValues.ein}
                    onChange={updateField("ein")}
                    className="h-9 w-full rounded-md border border-[#d3d7de] bg-[#fafafa] px-3 text-sm text-[#1c1b1f] outline-none transition placeholder:text-[#9ba3b3] focus:border-[#8da2cc]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#1c1b1f]">Email</span>
                  <input
                    type="email"
                    value={formValues.email}
                    onChange={updateField("email")}
                    className="h-9 w-full rounded-md border border-[#d3d7de] bg-[#fafafa] px-3 text-sm text-[#1c1b1f] outline-none transition focus:border-[#8da2cc]"
                  />
                </label>

                <div>
                  <span className="mb-1 block text-xs font-medium text-[#1c1b1f]">Phone</span>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-[56px] items-center justify-center rounded-md border border-[#d3d7de] bg-[#fafafa] text-sm text-[#4c4f69]">
                      +1
                    </div>
                    <input
                      type="tel"
                      placeholder="(XXX) XXX-XXXX"
                      value={formValues.phone}
                      onChange={updateField("phone")}
                      className="h-9 min-w-0 flex-1 rounded-md border border-[#d3d7de] bg-[#fafafa] px-3 text-sm text-[#1c1b1f] outline-none transition placeholder:text-[#9ba3b3] focus:border-[#8da2cc]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-[#d9d9d9] bg-[#fafafa] p-3">
              <h2 className="text-lg font-semibold leading-tight tracking-tight text-[#1c1b1f]">Business Address</h2>

              <div className="mt-3 space-y-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#1c1b1f]">Address Line 1</span>
                  <input
                    type="text"
                    placeholder="Street address"
                    value={formValues.addressLine1}
                    onChange={updateField("addressLine1")}
                    className="h-9 w-full rounded-md border border-[#d3d7de] bg-[#fafafa] px-3 text-sm text-[#1c1b1f] outline-none transition placeholder:text-[#9ba3b3] focus:border-[#8da2cc]"
                  />
                </label>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-[#1c1b1f]">City</span>
                    <input
                      type="text"
                      value={formValues.city}
                      onChange={updateField("city")}
                      className="h-9 w-full rounded-md border border-[#d3d7de] bg-[#fafafa] px-3 text-sm text-[#1c1b1f] outline-none transition focus:border-[#8da2cc]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-[#1c1b1f]">State Code</span>
                    <input
                      type="text"
                      placeholder="NY"
                      value={formValues.stateCode}
                      onChange={updateField("stateCode")}
                      className="h-9 w-full rounded-md border border-[#d3d7de] bg-[#fafafa] px-3 text-sm text-[#1c1b1f] outline-none transition placeholder:text-[#9ba3b3] focus:border-[#8da2cc]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-[#1c1b1f]">Postal Code</span>
                    <input
                      type="text"
                      value={formValues.postalCode}
                      onChange={updateField("postalCode")}
                      className="h-9 w-full rounded-md border border-[#d3d7de] bg-[#fafafa] px-3 text-sm text-[#1c1b1f] outline-none transition focus:border-[#8da2cc]"
                    />
                  </label>
                </div>
              </div>
            </section>
          </div>
        </div>

        <aside className="hidden w-[230px] shrink-0 border-l border-[#d9d9d9] bg-[#f8f9fb] p-3 lg:block">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-[#4c4f69]">Upload Activity</h3>
          <p className="mt-1 text-[11px] text-[#7082a0]">Progress appears here without shifting the form.</p>
          <div className="mt-3 space-y-1.5">
            {mcaRow ? (
              <div className="rounded-md border border-[#d9d9d9] bg-[#fafafa] px-2.5 py-2">
                <p className="truncate text-xs text-[#1c1b1f]">{mcaRow.fileName}</p>
                <span
                  className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${
                    STATUS_STYLES[mcaRow.status]
                  }`}
                >
                  {mcaRow.status}
                </span>
              </div>
            ) : null}

            {bankRows.map((row) => (
              <div key={row.fileName} className="rounded-md border border-[#d9d9d9] bg-[#fafafa] px-2.5 py-2">
                <p className="truncate text-xs text-[#1c1b1f]">{row.fileName}</p>
                <span
                  className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${
                    STATUS_STYLES[row.status]
                  }`}
                >
                  {row.status}
                </span>
              </div>
            ))}

            {!mcaRow ? <p className="pt-1 text-[11px] text-[#8b92a1]">Awaiting MCA application form upload.</p> : null}
          </div>
        </aside>
      </div>

      <footer className="border-t border-[#d9d9d9] bg-[#fafafa] px-5 py-3">
        <p className="mb-3 text-xs text-[#7082a0]">Upload 1 MCA form + 3 bank statements to create an application.</p>
        <div className="flex items-center justify-end">
          <button
            type="button"
            disabled={!canCreateApplication}
            onClick={onCreateApplication}
            className={`rounded-md px-4 py-1.5 text-sm font-semibold text-[#fafafa] ${
              canCreateApplication ? "bg-[#3277FF] hover:opacity-95" : "cursor-not-allowed bg-[#adb8f3]"
            }`}
          >
            Create application
          </button>
        </div>
      </footer>
    </div>
  )
}

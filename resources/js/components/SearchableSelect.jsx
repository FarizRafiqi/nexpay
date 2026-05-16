import * as React from 'react'
import { Search, ChevronDown, X } from 'lucide-react'

export default function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = 'Pilih...',
  searchPlaceholder = 'Cari...',
  disabled = false,
  error,
  groupBy,
}) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const dropdownRef = React.useRef(null)
  const inputRef = React.useRef(null)

  const selected = options?.find((o) => String(o.value) === String(value))

  const filtered = React.useMemo(() => {
    if (!options) return []
    const q = search.toLowerCase().trim()
    if (!q) return options
    return options.filter((opt) => {
      const label = String(opt.label).toLowerCase()
      const group = opt.group ? String(opt.group).toLowerCase() : ''
      return label.includes(q) || group.includes(q)
    })
  }, [options, search])

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setSearch('')
    }
  }, [open])

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  let groups = null
  if (groupBy) {
    const map = {}
    filtered?.forEach((opt) => {
      const g = opt.group || ''
      if (!map[g]) map[g] = []
      map[g].push(opt)
    })
    groups = Object.entries(map)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => { if (!disabled) setOpen(!open) }}
        disabled={disabled}
        className={`flex h-9 w-full items-center justify-between rounded-md border px-3 py-1 text-sm shadow-sm transition-colors
          ${open ? 'ring-1 ring-slate-400/30 dark:ring-slate-500/30' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50'}
          ${error ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}
          bg-transparent text-slate-900 dark:text-slate-100`}
      >
        <span className={selected ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 px-3 py-2">
            <Search className="w-4 h-4 shrink-0 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
            />
            {search && (
              <button onClick={() => setSearch('')} className="shrink-0 p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-3 h-3 text-slate-400" />
              </button>
            )}
          </div>

          <div className="max-h-60 overflow-y-auto py-1">
            {groups ? (
              groups.map(([groupName, items]) => (
                <div key={groupName}>
                  {groupName && (
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {groupName}
                    </div>
                  )}
                  {items.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onChange(opt.value)
                        setOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-800
                        ${String(opt.value) === String(value) ? 'bg-primary/10 text-primary font-medium' : 'text-slate-700 dark:text-slate-300'}
                      `}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ))
            ) : (
              filtered?.length === 0 ? (
                <div className="px-3 py-6 text-center text-sm text-slate-400">
                  Tidak ada data
                </div>
              ) : (
                filtered?.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value)
                      setOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-800
                      ${String(opt.value) === String(value) ? 'bg-primary/10 text-primary font-medium' : 'text-slate-700 dark:text-slate-300'}
                    `}
                  >
                    {opt.label}
                  </button>
                ))
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

import * as React from 'react'
import { usePage } from '@inertiajs/react'
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  X,
} from 'lucide-react'

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
}

const styles = {
  success: 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200',
  error: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  warning: 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
}

const iconColors = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  warning: 'text-amber-500',
}

export default function Toast() {
  const { flash } = usePage().props
  const [toast, setToast] = React.useState(null)
  const timeoutRef = React.useRef(null)

  React.useEffect(() => {
    if (flash?.success || flash?.error || flash?.warning) {
      const type = flash.success ? 'success' : flash.error ? 'error' : 'warning'
      const message = flash.success || flash.error || flash.warning

      if (toast) {
        setToast(null)
        clearTimeout(timeoutRef.current)
        requestAnimationFrame(() => {
          setToast({ type, message })
        })
      } else {
        setToast({ type, message })
      }
    }
  }, [flash?.success, flash?.error, flash?.warning])

  React.useEffect(() => {
    if (toast) {
      timeoutRef.current = setTimeout(() => {
        setToast(null)
      }, 4000)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [toast])

  if (!toast) return null

  const Icon = icons[toast.type]
  const typeLabel = { success: 'Berhasil', error: 'Gagal', warning: 'Perhatian' }

  return (
    <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-2 fade-in duration-200">
      <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm max-w-sm ${styles[toast.type]}`}>
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColors[toast.type]}`} />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold">{typeLabel[toast.type]}</p>
          <p className="text-[11px] opacity-80 mt-0.5">{toast.message}</p>
        </div>
        <button
          onClick={() => setToast(null)}
          className="shrink-0 p-0.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <X className="w-3.5 h-3.5 opacity-60" />
        </button>
      </div>
    </div>
  )
}

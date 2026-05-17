import * as React from "react"
import { Link, usePage } from "@inertiajs/react"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  Zap,
  Percent,
  History,
  Activity,
  ShieldCheck,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronRight,
  X,
  CheckCircle,
  XCircle,
  UserPlus,
  UserX,
  Trash2,
  RefreshCw,
  Shield,
  BellRing,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Toast from "@/components/Toast"
import Breadcrumb from "@/components/Breadcrumb"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/useTranslation"

const SIDEBAR_WIDTH = "280px"

function NotificationBell() {
  const { notifications } = usePage().props
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)
  const [items, setItems] = React.useState(notifications || [])
  const ref = React.useRef(null)
  const [marking, setMarking] = React.useState(null)

  const typeConfig = {
    payment_success:     { icon: CheckCircle,  bg: "bg-emerald-100 dark:bg-emerald-900/30",  color: "text-emerald-600 dark:text-emerald-400" },
    payment_failed:      { icon: XCircle,    bg: "bg-red-100 dark:bg-red-900/30",        color: "text-red-600 dark:text-red-400" },
    user_registered:     { icon: UserPlus,   bg: "bg-blue-100 dark:bg-blue-900/30",       color: "text-blue-600 dark:text-blue-400" },
    user_deleted:        { icon: UserX,      bg: "bg-red-100 dark:bg-red-900/30",        color: "text-red-600 dark:text-red-400" },
    payment_deleted:     { icon: Trash2,     bg: "bg-orange-100 dark:bg-orange-900/30",   color: "text-orange-600 dark:text-orange-400" },
    bill_status_changed: { icon: RefreshCw,  bg: "bg-amber-100 dark:bg-amber-900/30",     color: "text-amber-600 dark:text-amber-400" },
    level_permission_changed: { icon: Shield, bg: "bg-purple-100 dark:bg-purple-900/30",  color: "text-purple-600 dark:text-purple-400" },
    payment_method_changed: { icon: CreditCard, bg: "bg-teal-100 dark:bg-teal-900/30",    color: "text-teal-600 dark:text-teal-400" },
  }
  const defaultType = { icon: BellRing, bg: "bg-primary/10", color: "text-primary" }

  function getTypeConfig(n) {
    return typeConfig[n.type] || defaultType
  }

  React.useEffect(() => {
    setItems(notifications || [])
  }, [notifications])

  React.useEffect(() => {
    const timer = setInterval(() => {
      fetch(window.location.origin + '/admin/notifications/unread', {
        headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' }
      })
        .then(r => r.ok ? r.json() : [])
        .then(data => { if (data) setItems(data) })
        .catch(() => {})
    }, 30000)
    return () => clearInterval(timer)
  }, [])

  React.useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleMarkAsRead(id) {
    setMarking(id)
    fetch(`/admin/notifications/${id}/read`, { method: 'POST', headers: { 'X-Requested-With': 'XMLHttpRequest' } })
      .then(r => { if (r.ok) setItems(prev => prev.filter(n => n.id !== id)) })
      .catch(() => {})
      .finally(() => setMarking(null))
  }

  function handleMarkAllAsRead() {
    fetch('/admin/notifications/read-all', { method: 'POST', headers: { 'X-Requested-With': 'XMLHttpRequest' } })
      .then(r => { if (r.ok) setItems([]) })
      .catch(() => {})
  }

  return (
    <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-all duration-300 cursor-pointer"
        >
        <Bell className="w-4 h-4" />
        {items.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
            {items.length > 9 ? '9+' : items.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-800 dark:text-white">{t('admin.notifications')}</span>
            <div className="flex items-center gap-1">
              {items.length > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-[9px] font-bold text-primary hover:text-primary/80 px-2 py-1 rounded hover:bg-primary/5 transition-colors"
                >
                    Tandai Semua Dibaca
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {items.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Bell className="w-6 h-6 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">{t('notification.empty')}</p>
                </div>
              ) : (
                items.map((n) => {
                  const cfg = getTypeConfig(n)
                  const Icon = cfg.icon
                  return (
                    <div
                      key={n.id}
                      onClick={() => handleMarkAsRead(n.id)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-50 dark:border-slate-800/50 last:border-0 cursor-pointer"
                    >
                      <div className={`w-7 h-7 rounded-lg ${cfg.bg} ${cfg.color} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 dark:text-white">{n.title}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed line-clamp-2">{n.description}</p>
                        <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1">{n.time}</p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
            <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 text-center">
              <Link href={route('admin.notifications.index')} className="text-[10px] font-bold text-primary hover:text-primary/80 transition-colors">
                {t('notification.title')}
              </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function SidebarNavItem({ item }) {
  function isChildActive(childRoute) {
    return route().current(childRoute) ||
      (childRoute.endsWith('.index') && route().current(childRoute.replace(/\.index$/, '') + '.*'))
  }

  function isParentActive() {
    return item.children?.some((c) => isChildActive(c.route))
  }

  const [open, setOpen] = React.useState(() => isParentActive())

  React.useEffect(() => {
    if (isParentActive()) {
      setOpen(true)
    }
  }, [typeof window !== 'undefined' && window.location.href])

  if (item.children) {
    const anyChildActive = isParentActive()

    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 relative",
            "text-slate-600 dark:text-slate-400",
            "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
            (open || anyChildActive) && "text-primary dark:text-primary"
          )}
        >
          {(open || anyChildActive) && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-primary" />
          )}
          <item.icon className="w-5 h-5 shrink-0" />
          <span className="flex-1 text-left">{item.name}</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 shrink-0 transition-transform duration-200",
              (open || anyChildActive) && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
          <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-200 dark:border-slate-700 pl-3">
            {item.children.map((child) => (
              <Link
                key={child.name}
                href={route(child.route)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200 relative",
                  isChildActive(child.route)
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {isChildActive(child.route) && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-primary" />
                )}
                {child.name}
              </Link>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  const isActive = item.route
    ? route().current(item.route) ||
      (item.route.endsWith('.index') && route().current(item.route.replace(/\.index$/, '') + '.*'))
    : false

  return (
      <Link
        href={item.route ? route(item.route) : "#"}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 relative",
          isActive
            ? "bg-primary/10 text-primary font-semibold shadow-sm"
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
        )}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-primary" />
        )}
        <item.icon className="w-5 h-5 shrink-0" />
        <span>{item.name}</span>
      </Link>
  )
}

export default function AuthenticatedLayout({ children }) {
  const { auth } = usePage().props
  const { t } = useTranslation()
  const [isDark, setIsDark] = React.useState(
    () => typeof window !== "undefined" && document.documentElement.classList.contains("dark")
  )
  const [stickyHeader, setStickyHeader] = React.useState(
    () => localStorage.getItem('sticky_header') !== 'false'
  )

  React.useEffect(() => {
    const handler = () => setStickyHeader(localStorage.getItem('sticky_header') !== 'false')
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const toggleDarkMode = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  React.useEffect(() => {
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (stored === "dark" || (!stored && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const navigation = [
    { name: t('admin.dashboard'), icon: LayoutDashboard, route: "admin.dashboard" },
    {
      name: t('admin.menu'),
      icon: ShieldCheck,
      children: [
        { name: t('admin.customers'), route: "admin.pln-customers.index" },
        { name: t('admin.usage'), route: "admin.usages.index" },
        { name: t('admin.bills'), route: "admin.bills.index" },
        { name: t('admin.tariffs'), route: "admin.tariffs.index" },
        { name: t('admin.levels'), route: "admin.levels.index" },
      ],
    },
    {
      name: t('admin.transactions'),
      icon: CreditCard,
      children: [
        { name: t('admin.payments'), route: "admin.payments.index" },
        { name: t('admin.payment_methods'), route: "admin.payment-methods.index" },
      ],
    },
    {
      name: t('admin.tax_management'),
      icon: Percent,
      children: [
        { name: t('admin.tax_types'), route: "admin.tax-types.index" },
        { name: t('admin.tax_rates'), route: "admin.tax-rates.index" },
      ],
    },
    { name: t('admin.users'), icon: Users, route: "admin.users.index" },
    { name: t('admin.permissions'), icon: ShieldCheck, route: "admin.permissions.index" },
    { name: t('admin.reports'), icon: FileText, route: "admin.reports" },
    { name: t('admin.activity_logs'), icon: Activity, route: "admin.activity-logs.index" },
    { name: t('admin.settings'), icon: Settings, route: "admin.settings" },
  ]

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
      {/* ========== SIDEBAR ========== */}
      <aside
        className="fixed inset-y-0 left-0 z-30 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-sm"
        style={{ width: SIDEBAR_WIDTH }}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center px-5 border-b border-slate-100 dark:border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/30">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white">
              NEX<span className="text-primary">PAY</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navigation.map((item) => (
            <SidebarNavItem key={item.name} item={item} />
          ))}
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-100 dark:border-slate-800 p-3">
          <button
            onClick={() => document.getElementById('logout-dialog')?.showModal()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>{t('admin.logout')}</span>
          </button>
        </div>

        {/* Logout Confirmation Dialog */}
        <dialog
          id="logout-dialog"
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm max-w-sm w-full fixed inset-0 m-auto open:flex open:items-center open:justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) e.target.close() }}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                <LogOut className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">{t('admin.logout')}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('general.confirm_delete')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <button
                type="button"
                onClick={() => document.getElementById('logout-dialog')?.close()}
                className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {t('general.cancel')}
              </button>
              <Link
                href={route("logout")}
                method="post"
                as="button"
                className="px-4 py-2 rounded-lg text-xs font-bold bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                {t('general.yes')}, {t('admin.logout')}
              </Link>
            </div>
          </div>
        </dialog>
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <div
        className="flex flex-1 flex-col min-h-screen"
        style={{ marginLeft: SIDEBAR_WIDTH }}
      >
        {/* Top Header */}
        <header className={`${stickyHeader ? 'sticky' : ''} top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6`}>
          <div className="flex-1">
            <h1 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">
              {t('admin.dashboard')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t('general.search')}
                className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-1.5 pl-10 pr-4 text-xs w-48 focus:w-64 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            {/* Notification Bell */}
            <NotificationBell />

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-all duration-300 cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />

            {/* User */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                {auth?.user?.nama?.charAt(0) || "U"}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {auth?.user?.nama || "User"}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </header>

        <Toast />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8 mx-auto max-w-7xl">
            <Breadcrumb />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

import { Link } from '@inertiajs/react'
import { ChevronRight, Home } from 'lucide-react'

const breadcrumbMap = {
  'admin.dashboard': { parent: null, label: 'Dashboard' },
  'admin.reports': { parent: 'admin.dashboard', label: 'Laporan' },
  'admin.settings': { parent: 'admin.dashboard', label: 'Pengaturan' },
  'admin.profile.index': { parent: 'admin.dashboard', label: 'Profile' },
  'admin.profile.edit': { parent: 'admin.profile.index', label: 'Edit Profile' },
  'admin.activity-logs.index': { parent: 'admin.dashboard', label: 'Log Aktivitas' },
  'admin.pln-customers.index': { parent: 'admin.dashboard', label: 'Pelanggan PLN' },
  'admin.pln-customers.create': { parent: 'admin.pln-customers.index', label: 'Tambah' },
  'admin.pln-customers.show': { parent: 'admin.pln-customers.index', label: 'Detail' },
  'admin.pln-customers.edit': { parent: 'admin.pln-customers.index', label: 'Edit' },
  'admin.usages.index': { parent: 'admin.dashboard', label: 'Penggunaan' },
  'admin.usages.create': { parent: 'admin.usages.index', label: 'Tambah' },
  'admin.usages.show': { parent: 'admin.usages.index', label: 'Detail' },
  'admin.usages.edit': { parent: 'admin.usages.index', label: 'Edit' },
  'admin.bills.index': { parent: 'admin.dashboard', label: 'Tagihan' },
  'admin.tariffs.index': { parent: 'admin.dashboard', label: 'Tarif' },
  'admin.tariffs.create': { parent: 'admin.tariffs.index', label: 'Tambah' },
  'admin.tariffs.edit': { parent: 'admin.tariffs.index', label: 'Edit' },
  'admin.levels.index': { parent: 'admin.dashboard', label: 'Level' },
  'admin.levels.create': { parent: 'admin.levels.index', label: 'Tambah' },
  'admin.levels.edit': { parent: 'admin.levels.index', label: 'Edit' },
  'admin.payments.index': { parent: 'admin.dashboard', label: 'Pembayaran' },
  'admin.payments.show': { parent: 'admin.payments.index', label: 'Detail' },
  'admin.payments.edit': { parent: 'admin.payments.index', label: 'Edit' },
  'admin.payment-methods.index': { parent: 'admin.dashboard', label: 'Metode Pembayaran' },
  'admin.payment-methods.create': { parent: 'admin.payment-methods.index', label: 'Tambah' },
  'admin.payment-methods.show': { parent: 'admin.payment-methods.index', label: 'Detail' },
  'admin.payment-methods.edit': { parent: 'admin.payment-methods.index', label: 'Edit' },
  'admin.tax-types.index': { parent: 'admin.dashboard', label: 'Tipe Pajak' },
  'admin.tax-rates.index': { parent: 'admin.dashboard', label: 'Tarif Pajak' },
  'admin.users.index': { parent: 'admin.dashboard', label: 'Data Users' },
  'admin.users.create': { parent: 'admin.users.index', label: 'Tambah' },
  'admin.users.show': { parent: 'admin.users.index', label: 'Detail' },
  'admin.users.edit': { parent: 'admin.users.index', label: 'Edit' },
  'admin.permissions.index': { parent: 'admin.dashboard', label: 'Permissions' },
  'admin.permissions.create': { parent: 'admin.permissions.index', label: 'Tambah' },
  'admin.permissions.edit': { parent: 'admin.permissions.index', label: 'Edit' },
}

export default function Breadcrumb() {
  const crumbs = []
  let routeName = route().current()

  // Walk up the parent chain
  while (routeName && breadcrumbMap[routeName]) {
    crumbs.unshift({ route: routeName, label: breadcrumbMap[routeName].label })
    routeName = breadcrumbMap[routeName].parent
  }

  if (crumbs.length === 0) return null

  return (
    <nav className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 mb-4">
      <Home className="w-3 h-3" />
      {crumbs.map((crumb, i) => (
        <span key={crumb.route} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
          {i === crumbs.length - 1 ? (
            <span className="font-semibold text-slate-600 dark:text-slate-300">{crumb.label}</span>
          ) : (
            <Link href={route(crumb.route)} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}

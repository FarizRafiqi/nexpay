import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Pagination from '@/components/Pagination';
import {
	CheckCircle,
	XCircle,
	UserPlus,
	UserX,
	Trash2,
	RefreshCw,
	Shield,
	CreditCard,
	BellRing,
	CheckCheck,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const typeConfig = {
	payment_success:         { icon: CheckCircle,  label: 'Pembayaran Berhasil',      bg: 'bg-emerald-100 dark:bg-emerald-900/30',  color: 'text-emerald-600 dark:text-emerald-400' },
	payment_failed:          { icon: XCircle,      label: 'Pembayaran Gagal',          bg: 'bg-red-100 dark:bg-red-900/30',          color: 'text-red-600 dark:text-red-400' },
	user_registered:         { icon: UserPlus,     label: 'Pengguna Baru',             bg: 'bg-blue-100 dark:bg-blue-900/30',        color: 'text-blue-600 dark:text-blue-400' },
	user_deleted:            { icon: UserX,        label: 'Pengguna Dihapus',          bg: 'bg-red-100 dark:bg-red-900/30',          color: 'text-red-600 dark:text-red-400' },
	payment_deleted:         { icon: Trash2,       label: 'Pembayaran Dihapus',        bg: 'bg-orange-100 dark:bg-orange-900/30',    color: 'text-orange-600 dark:text-orange-400' },
	bill_status_changed:     { icon: RefreshCw,     label: 'Status Tagihan Berubah',    bg: 'bg-amber-100 dark:bg-amber-900/30',      color: 'text-amber-600 dark:text-amber-400' },
	level_permission_changed:{ icon: Shield,        label: 'Hak Akses Berubah',         bg: 'bg-purple-100 dark:bg-purple-900/30',    color: 'text-purple-600 dark:text-purple-400' },
	payment_method_changed:  { icon: CreditCard,    label: 'Metode Pembayaran Berubah', bg: 'bg-teal-100 dark:bg-teal-900/30',        color: 'text-teal-600 dark:text-teal-400' },
};
const defaultCfg = { icon: BellRing, label: 'Notifikasi', bg: 'bg-primary/10', color: 'text-primary' };

function getCfg(type) {
	return typeConfig[type] || defaultCfg;
}

export default function NotificationsIndex({ auth, notifications }) {
	const { t } = useTranslation();
	const items = notifications?.data || [];

	function handleMarkAsRead(id) {
		fetch(`/admin/notifications/${id}/read`, {
			method: 'POST',
			headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' },
		}).then(r => { if (r.ok) router.reload({ only: ['notifications'] }) });
	}

	function handleMarkAllAsRead() {
		fetch('/admin/notifications/read-all', {
			method: 'POST',
			headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' },
		}).then(r => { if (r.ok) router.reload({ only: ['notifications'] }) });
	}

	const unreadCount = items.filter(n => !n.read_at).length;

	return (
		<AuthenticatedLayout>
			<Head title={t('admin.notifications')} />

			<div className="flex-1 flex flex-col gap-4">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
					<div>
						<h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
							{t('admin.notifications')}
						</h2>
						<p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
							Monitor event-event penting yang terjadi dalam sistem.
						</p>
					</div>
					{unreadCount > 0 && (
						<button
							onClick={handleMarkAllAsRead}
							className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-[10px] font-bold cursor-pointer"
						>
							<CheckCheck className="w-3.5 h-3.5" />
							{t('notification.mark_all_read')} ({unreadCount})
						</button>
					)}
				</div>

				<Card className="border-none shadow-sm bg-white dark:bg-slate-900">
					<CardContent className="p-0">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b border-slate-100 dark:border-slate-800">
										<th className="text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 py-3">{t('dt.type')}</th>
										<th className="text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 py-3">{t('dt.message')}</th>
										<th className="text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 py-3">{t('dt.status')}</th>
										<th className="text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 py-3">{t('dt.created_at')}</th>
										<th className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 py-3">{t('dt.actions')}</th>
									</tr>
								</thead>
								<tbody>
									{items.length > 0 ? items.map((n) => {
										const cfg = getCfg(n.type);
										const Icon = cfg.icon;
										return (
											<tr
												key={n.id}
												className={`border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${!n.read_at ? 'bg-primary/5' : ''}`}
											>
												<td className="px-4 py-3">
													<div className="flex items-center gap-2">
														<div className={`w-7 h-7 rounded-lg ${cfg.bg} ${cfg.color} flex items-center justify-center`}>
															<Icon className="w-3.5 h-3.5" />
														</div>
														<span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{cfg.label}</span>
													</div>
												</td>
												<td className="px-4 py-3 max-w-sm">
													<p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
														{n.message || '-'}
													</p>
												</td>
												<td className="px-4 py-3">
{n.read_at ? (
													<Badge variant="secondary" className="text-[9px] font-bold">{t('notification.read')}</Badge>
												) : (
													<Badge className="bg-primary/10 text-primary border-none text-[9px] font-bold hover:bg-primary/20">{t('notification.new')}</Badge>
												)}
												</td>
												<td className="px-4 py-3">
													<span className="text-xs text-slate-500 dark:text-slate-400">
														{n.created_at || '-'}
													</span>
												</td>
												<td className="px-4 py-3 text-center">
													{!n.read_at && (
														<button
															onClick={() => handleMarkAsRead(n.id)}
															className="text-[10px] font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
														>
															{t('notification.mark_read')}
														</button>
													)}
												</td>
											</tr>
										);
									}) : (
										<tr>
											<td colSpan={5} className="px-4 py-12 text-center">
												<div className="flex flex-col items-center gap-2">
													<BellRing className="w-8 h-8 text-slate-300 dark:text-slate-600" />
													<p className="text-sm font-medium text-slate-400 dark:text-slate-500">{t('notification.empty')}</p>
												</div>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
						<Pagination paginator={notifications} />
					</CardContent>
				</Card>
			</div>
		</AuthenticatedLayout>
	);
}

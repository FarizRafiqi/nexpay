import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Activity, Search, Info, AlertCircle, UserCheck, Database } from 'lucide-react';
import Pagination from '@/components/Pagination';

export default function ActivityLogs({ auth, activityLogs }) {
	const logs = activityLogs?.data || [];

	return (
		<AuthenticatedLayout>
			<Head title="Log Aktivitas" />

			<div className="flex-1 flex flex-col gap-4">
				<div>
					<h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
						Log <span className="text-primary italic">Aktivitas</span>
					</h2>
					<p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
						Monitor seluruh aktivitas yang terjadi dalam sistem.
					</p>
				</div>

				<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-start gap-3">
					<Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
					<div>
						<p className="text-sm font-bold text-blue-800 dark:text-blue-200">Informasi Log Aktivitas</p>
						<p className="text-[11px] text-blue-600 dark:text-blue-400 mt-0.5">
							Halaman ini menampilkan seluruh aktivitas yang tercatat dalam sistem. Gunakan fitur pencarian untuk menemukan log tertentu. Data log diurutkan dari yang terbaru.
						</p>
					</div>
				</div>

				<Card className="border-none shadow-sm bg-white dark:bg-slate-900">
					<CardContent className="p-0">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b border-slate-100 dark:border-slate-800">
										<th className="text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 py-3">ID</th>
										<th className="text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 py-3">ID User</th>
										<th className="text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 py-3">Tabel Ref</th>
										<th className="text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 py-3">ID Ref</th>
										<th className="text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 py-3">Deskripsi</th>
										<th className="text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 py-3">Dibuat Pada</th>
										<th className="text-left text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 py-3">Diubah Pada</th>
									</tr>
								</thead>
								<tbody>
									{logs.length > 0 ? logs.map((log, i) => (
										<tr
											key={log.id || i}
											className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
										>
											<td className="px-4 py-3">
												<span className="text-xs font-bold text-slate-800 dark:text-white">{log.id}</span>
											</td>
											<td className="px-4 py-3">
												<div className="flex items-center gap-2">
													<div className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">
														<UserCheck className="w-3 h-3" />
													</div>
													<span className="text-xs font-medium text-slate-700 dark:text-slate-300">
														{log.user?.username || log.user?.nama || log.id_user || '-'}
													</span>
												</div>
											</td>
											<td className="px-4 py-3">
												<Badge variant="secondary" className="text-[10px] font-bold">
													{log.tabel_referensi || log.table_ref || '-'}
												</Badge>
											</td>
											<td className="px-4 py-3">
												<span className="text-xs font-medium text-slate-600 dark:text-slate-400">
													{log.id_referensi || log.ref_id || '-'}
												</span>
											</td>
											<td className="px-4 py-3 max-w-xs">
												<p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
													{log.deskripsi || log.description || '-'}
												</p>
											</td>
											<td className="px-4 py-3">
												<span className="text-xs text-slate-500 dark:text-slate-400">
													{log.dibuat_pada || log.created_at || '-'}
												</span>
											</td>
											<td className="px-4 py-3">
												<span className="text-xs text-slate-500 dark:text-slate-400">
													{log.diubah_pada || log.updated_at || '-'}
												</span>
											</td>
										</tr>
									)) : (
										<tr>
											<td colSpan={7} className="px-4 py-12 text-center">
												<div className="flex flex-col items-center gap-2">
													<Activity className="w-8 h-8 text-slate-300 dark:text-slate-600" />
													<p className="text-sm font-medium text-slate-400 dark:text-slate-500">Belum ada data log aktivitas</p>
												</div>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
						<Pagination paginator={activityLogs} />
					</CardContent>
				</Card>
			</div>
		</AuthenticatedLayout>
	);
}

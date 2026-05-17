import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import {
	TrendingUp,
	CreditCard,
	ArrowUpRight,
	DollarSign,
	Zap,
	Activity,
	History,
	AlertCircle
} from 'lucide-react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function Dashboard({ auth, stats, monthly_revenue }) {
	const { t } = useTranslation();
	const chartData = (monthly_revenue || []).map((item) => ({
		month: item.name,
		amount: item.total
	}));

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: { staggerChildren: 0.05 }
		}
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		show: { y: 0, opacity: 1 }
	};

	return (
		<AuthenticatedLayout>
			<Head title={t('admin.dashboard')} />

			<div className="flex-1 flex flex-col gap-4">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
					<div>
						<h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
							{t('admin.dashboard')} <span className="text-primary italic">Overview</span>
						</h2>
						<p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
							{t('admin.total_revenue')}
						</p>
					</div>
					<div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
						<div className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-wider">
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
								<span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
							</span>
							{t('admin.payments')}
						</div>
					</div>
				</div>

				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0"
				>
					{[
						{ label: t('admin.total_revenue'), value: stats?.totalPendapatan || 'Rp 0', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', trend: '+12.5%' },
						{ label: t('admin.total_payments'), value: stats?.totalPayments || '0', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', trend: '+5.2%' },
						{ label: t('admin.paid_bills'), value: stats?.totalBills || '0', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', trend: '+18.1%' },
						{ label: t('admin.unpaid_bills'), value: stats?.unpaidBills || '0', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/20', trend: '-2.4%' },
					].map((stat, i) => (
						<motion.div key={i} variants={item}>
							<Card className="border-none shadow-sm dark:shadow-none bg-white dark:bg-slate-900 overflow-hidden group hover:ring-2 hover:ring-primary/20 transition-all duration-300">
								<div className="p-4">
									<div className="flex items-center justify-between mb-2">
										<div className={`p-2 rounded-lg ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 duration-500`}>
											<stat.icon className="w-4 h-4" />
										</div>
										<span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${stat.trend.startsWith('+') ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600'}`}>
											{stat.trend}
										</span>
									</div>
									<p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
									<h3 className="text-lg font-black text-slate-800 dark:text-white mt-0.5 tracking-tight">{stat.value}</h3>
								</div>
							</Card>
						</motion.div>
					))}
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-[300px]">
					<Card className="lg:col-span-2 border-none shadow-sm dark:shadow-none bg-white dark:bg-slate-900 p-4 flex flex-col">
						<div className="flex items-center justify-between mb-4 shrink-0">
							<div>
								<h3 className="text-sm font-bold text-slate-800 dark:text-white">{t('admin.monthly_revenue')}</h3>
								<p className="text-[10px] text-slate-500 dark:text-slate-400">{t('admin.monthly_analysis')}</p>
							</div>
							<div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
								<TrendingUp className="w-3 h-3 text-primary" />
							</div>
						</div>
						<div className="flex-1 w-full min-h-0">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={chartData}>
									<defs>
										<linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
											<stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(203, 213, 225, 0.1)" />
									<XAxis
										dataKey="month"
										axisLine={false}
										tickLine={false}
										tick={{ fontSize: 9, fill: '#94a3b8' }}
										dy={10}
									/>
									<YAxis
										axisLine={false}
										tickLine={false}
										tick={{ fontSize: 9, fill: '#94a3b8' }}
										tickFormatter={(value) => `Rp${value / 1000000}M`}
									/>
									<Tooltip
										contentStyle={{
											borderRadius: '8px',
											border: 'none',
											boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
											fontSize: '10px',
											backgroundColor: '#1e293b',
											color: '#fff',
											padding: '8px'
										}}
										itemStyle={{ color: '#fff' }}
									/>
									<Area
										type="monotone"
										dataKey="amount"
										stroke="hsl(var(--primary))"
										strokeWidth={2}
										fillOpacity={1}
										fill="url(#colorAmount)"
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</Card>

					<Card className="border-none shadow-sm dark:shadow-none bg-white dark:bg-slate-900 p-4 flex flex-col">
						<div className="flex items-center justify-between mb-4 shrink-0">
							<h3 className="text-sm font-bold text-slate-800 dark:text-white">{t('admin.payment_history')}</h3>
							<div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400">
								<History className="w-3 h-3" />
							</div>
						</div>
						<div className="flex-1 overflow-y-auto space-y-2 pr-2">
							{[1, 2, 3, 4, 5, 6].map((item) => (
								<div key={item} className="flex items-center gap-2 group cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
									<div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
										<ArrowUpRight className="w-3 h-3" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate">{t('admin.payments')}</p>
										<p className="text-[8px] text-slate-400 dark:text-slate-500">ID: 1209384***</p>
									</div>
									<div className="text-right shrink-0">
										<p className="text-[10px] font-black text-emerald-600">+150k</p>
									</div>
								</div>
							))}
						</div>
						<button className="w-full mt-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800 text-[9px] font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shrink-0">
							{t('general.view_all', 'Lihat Semua')}
						</button>
					</Card>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

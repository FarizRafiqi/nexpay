import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, Shield, Edit, MapPin } from 'lucide-react';

export default function ProfileIndex({ auth }) {
	const user = auth.user;

	return (
		<AuthenticatedLayout>
			<Head title="Profile" />

			<div className="flex-1 flex flex-col gap-4">
				<div>
					<h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
						<span className="text-primary italic">Profile</span>
					</h2>
					<p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
						Informasi detail akun Anda.
					</p>
				</div>

				<div className="max-w-2xl mx-auto w-full">
					<Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
						<div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent"></div>
						<CardContent className="relative px-6 pb-6">
							<div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 mb-6">
								<Avatar className="w-24 h-24 ring-4 ring-white dark:ring-slate-900 shadow-xl">
									<AvatarImage src={user.avatar_url} />
									<AvatarFallback className="bg-primary text-white text-2xl font-black">
										{user.nama?.charAt(0) || 'U'}
									</AvatarFallback>
								</Avatar>
								<div className="text-center sm:text-left sm:pb-1">
									<h3 className="text-lg font-black text-slate-800 dark:text-white">{user.nama || user.name}</h3>
									<div className="flex items-center gap-2 justify-center sm:justify-start mt-1">
										<Badge variant="secondary" className="text-[10px] font-bold uppercase">
											<Shield className="w-3 h-3 mr-1" />
											{user.level || 'User'}
										</Badge>
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
									<div className="p-2 rounded-lg bg-primary/10 text-primary">
										<Mail className="w-4 h-4" />
									</div>
									<div>
										<p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email</p>
										<p className="text-sm font-medium text-slate-700 dark:text-slate-300">{user.email}</p>
									</div>
								</div>

								<div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
									<div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600">
										<User className="w-4 h-4" />
									</div>
									<div>
										<p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Username</p>
										<p className="text-sm font-medium text-slate-700 dark:text-slate-300">{user.username || '-'}</p>
									</div>
								</div>

								<div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
									<div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600">
										<Calendar className="w-4 h-4" />
									</div>
									<div>
										<p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Bergabung Sejak</p>
										<p className="text-sm font-medium text-slate-700 dark:text-slate-300">{user.created_at || '-'}</p>
									</div>
								</div>
							</div>

							<Separator className="my-6 bg-slate-100 dark:bg-slate-800" />

							<div className="flex justify-end">
								<Link href={route('admin.profile.edit')}>
									<Button variant="default">
										<Edit className="w-4 h-4" />
										Edit Profile
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

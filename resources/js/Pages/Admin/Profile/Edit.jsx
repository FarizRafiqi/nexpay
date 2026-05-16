import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Lock, Shield, Camera, Save, ArrowLeft, AlertCircle } from 'lucide-react';

export default function ProfileEdit({ auth, levels }) {
	const { data, setData, put, processing, errors, progress } = useForm({
		_nama: auth.user.nama || '',
		_username: auth.user.username || '',
		_email: auth.user.email || '',
		_level: auth.user.level || '',
		_avatar: null,
		_current_password: '',
		_new_password: '',
		_confirm_password: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		put(route('admin.profile.update', auth.user.id));
	};

	return (
		<AuthenticatedLayout>
			<Head title="Edit Profile" />

			<div className="flex-1 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
							Edit <span className="text-primary italic">Profile</span>
						</h2>
						<p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
							Perbarui informasi akun Anda.
						</p>
					</div>
					<Link href={route('admin.profile.index')}>
						<Button variant="outline">
							<ArrowLeft className="w-4 h-4" />
							Kembali
						</Button>
					</Link>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2 space-y-6">
							<Card className="border-none shadow-sm bg-white dark:bg-slate-900">
								<CardHeader>
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-lg bg-primary/10 text-primary">
											<User className="w-4 h-4" />
										</div>
										<div>
											<CardTitle className="text-sm font-bold text-slate-800 dark:text-white">Informasi Profile</CardTitle>
											<CardDescription className="text-[11px] text-slate-500 dark:text-slate-400">
												Lengkapi data diri Anda dengan benar.
											</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Nama</label>
											<Input
												value={data._nama}
												onChange={(e) => setData('_nama', e.target.value)}
												className={`bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${errors._nama ? 'border-red-500' : ''}`}
												placeholder="Masukkan nama lengkap"
											/>
											{errors._nama && (
												<p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
													<AlertCircle className="w-3 h-3" />{errors._nama}
												</p>
											)}
										</div>
										<div>
											<label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Username</label>
											<Input
												value={data._username}
												onChange={(e) => setData('_username', e.target.value)}
												className={`bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${errors._username ? 'border-red-500' : ''}`}
												placeholder="Masukkan username"
											/>
											{errors._username && (
												<p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
													<AlertCircle className="w-3 h-3" />{errors._username}
												</p>
											)}
										</div>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Email</label>
											<Input
												type="email"
												value={data._email}
												onChange={(e) => setData('_email', e.target.value)}
												className={`bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${errors._email ? 'border-red-500' : ''}`}
												placeholder="email@example.com"
											/>
											{errors._email && (
												<p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
													<AlertCircle className="w-3 h-3" />{errors._email}
												</p>
											)}
										</div>
										<div>
											<label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Level</label>
											<select
												value={data._level}
												onChange={(e) => setData('_level', e.target.value)}
												className={`flex h-9 w-full rounded-md border border-input bg-slate-50 dark:bg-slate-800 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${errors._level ? 'border-red-500' : ''}`}
											>
												<option value="">Pilih Level</option>
												{(levels || []).map((level) => (
													<option key={level.id || level} value={level.id || level}>
														{level.nama || level}
													</option>
												))}
											</select>
											{errors._level && (
												<p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
													<AlertCircle className="w-3 h-3" />{errors._level}
												</p>
											)}
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="border-none shadow-sm bg-white dark:bg-slate-900">
								<CardHeader>
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600">
											<Lock className="w-4 h-4" />
										</div>
										<div>
											<CardTitle className="text-sm font-bold text-slate-800 dark:text-white">Ubah Password</CardTitle>
											<CardDescription className="text-[11px] text-slate-500 dark:text-slate-400">
												Kosongkan jika tidak ingin mengubah password.
											</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent className="space-y-4">
									<div>
										<label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Password Saat Ini</label>
										<Input
											type="password"
											value={data._current_password}
											onChange={(e) => setData('_current_password', e.target.value)}
											className={`bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${errors._current_password ? 'border-red-500' : ''}`}
											placeholder="Masukkan password saat ini"
										/>
										{errors._current_password && (
											<p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
												<AlertCircle className="w-3 h-3" />{errors._current_password}
											</p>
										)}
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Password Baru</label>
											<Input
												type="password"
												value={data._new_password}
												onChange={(e) => setData('_new_password', e.target.value)}
												className={`bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${errors._new_password ? 'border-red-500' : ''}`}
												placeholder="Masukkan password baru"
											/>
											{errors._new_password && (
												<p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
													<AlertCircle className="w-3 h-3" />{errors._new_password}
												</p>
											)}
										</div>
										<div>
											<label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Konfirmasi Password</label>
											<Input
												type="password"
												value={data._confirm_password}
												onChange={(e) => setData('_confirm_password', e.target.value)}
												className={`bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${errors._confirm_password ? 'border-red-500' : ''}`}
												placeholder="Konfirmasi password baru"
											/>
											{errors._confirm_password && (
												<p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
													<AlertCircle className="w-3 h-3" />{errors._confirm_password}
												</p>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						<div className="lg:col-span-1 space-y-6">
							<Card className="border-none shadow-sm bg-white dark:bg-slate-900">
								<CardHeader>
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600">
											<Camera className="w-4 h-4" />
										</div>
										<div>
											<CardTitle className="text-sm font-bold text-slate-800 dark:text-white">Avatar</CardTitle>
											<CardDescription className="text-[11px] text-slate-500 dark:text-slate-400">
												Upload foto profile
											</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent className="flex flex-col items-center gap-4">
									<Avatar className="w-28 h-28 ring-4 ring-slate-100 dark:ring-slate-800">
										<AvatarImage src={data._avatar ? URL.createObjectURL(data._avatar) : auth.user.avatar_url} />
										<AvatarFallback className="bg-primary/10 text-primary text-3xl font-black">
											{auth.user.nama?.charAt(0) || 'U'}
										</AvatarFallback>
									</Avatar>
									<label className="cursor-pointer">
										<div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
											<Camera className="w-4 h-4" />
											Pilih Gambar
										</div>
										<input
											type="file"
											accept="image/*"
											className="hidden"
											onChange={(e) => setData('_avatar', e.target.files[0])}
										/>
									</label>
									{errors._avatar && (
										<p className="text-[10px] text-red-500 flex items-center gap-1">
											<AlertCircle className="w-3 h-3" />{errors._avatar}
										</p>
									)}
									{progress && (
										<div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
											<div
												className="bg-primary h-1.5 rounded-full transition-all duration-300"
												style={{ width: `${progress.percentage}%` }}
											/>
										</div>
									)}
								</CardContent>
							</Card>

							<div className="flex flex-col gap-2">
								<Button type="submit" disabled={processing} className="w-full">
									<Save className="w-4 h-4" />
									{processing ? 'Menyimpan...' : 'Simpan Perubahan'}
								</Button>
								<Link href={route('admin.profile.index')} className="w-full">
									<Button variant="outline" className="w-full" type="button">
										Batal
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</form>
			</div>
		</AuthenticatedLayout>
	);
}

import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Search,
	CheckCircle2,
	Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';


export default function HowToPay() {
	const { t } = useTranslation();

	const steps = [
		{
			title: t('howtopay.siapkan_data'),
			desc: t('howtopay.siapkan_data_desc'),
			img: "/assets/img/ilustrasi/ilustrasi-meteran-listrik@2x.png"
		},
		{
			title: t('howtopay.masukkan_id'),
			desc: t('howtopay.masukkan_id_desc'),
			img: "/assets/img/ilustrasi/ilustrasi-input-id-pelanggan@2x.png"
		},
		{
			title: t('howtopay.cek_tagihan'),
			desc: t('howtopay.cek_tagihan_desc'),
			img: "/assets/img/ilustrasi/payment-bill-time-illustration@2x.png"
		},
		{
			title: t('howtopay.klik_bayar'),
			desc: t('howtopay.klik_bayar_desc'),
			img: "/assets/img/ilustrasi/ilustrasi-klik-tombol-cek-tagihan@2x.png"
		},
		{
			title: t('howtopay.pilih_metode'),
			desc: t('howtopay.pilih_metode_desc'),
			img: "/assets/img/ilustrasi/mobile-payment-illustration@2x.png"
		},
		{
			title: t('howtopay.transfer'),
			desc: t('howtopay.transfer_desc'),
			img: "/assets/img/ilustrasi/search-illustration@2x.png"
		},
		{
			title: t('howtopay.konfirmasi'),
			desc: t('howtopay.konfirmasi_desc'),
			img: "/assets/img/ilustrasi/user-profile-illustration@2x.png"
		},
		{
			title: t('howtopay.selesai'),
			desc: t('howtopay.selesai_desc'),
			icon: CheckCircle2
		}
	];

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};


	return (
		<GuestLayout>
			<Head title="Cara Pembayaran - Nexpay" />

			<section className="pt-32 pb-24 bg-slate-50 dark:bg-slate-950 transition-colors">
				<div className="container px-4 mx-auto text-center">
					<motion.div 
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="max-w-2xl mx-auto"
					>
						<div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 rounded-full border border-primary/20">
							<Info className="w-4 h-4 text-primary" />
							<span className="text-sm font-bold text-primary tracking-wide uppercase">{t('howtopay.badge')}</span>
						</div>
						<h1 className="text-4xl lg:text-6xl font-black mb-8 dark:text-white leading-tight"
							dangerouslySetInnerHTML={{ __html: t('howtopay.title') }}>
						</h1>
						<p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
							{t('howtopay.subtitle')}
						</p>
					</motion.div>
				</div>
			</section>

			<section className="pb-32 bg-slate-50 dark:bg-slate-950 transition-colors">
				<div className="container px-4 mx-auto">
					<motion.div 
						variants={container}
						initial="hidden"
						animate="show"
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
					>
						{steps.map((step, index) => (
							<motion.div key={index} variants={item}>
								<Card className="group h-full border border-slate-200/50 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden hover:ring-4 hover:ring-primary/10 transition-all duration-500">
                                <CardContent className="p-8">
                                    <div className="relative mb-8 aspect-square flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                        {step.img ? (
                                            <img src={step.img} className="w-auto h-28 object-contain dark:brightness-90" alt={step.title} />
                                        ) : (
                                            <step.icon className="w-16 h-16 text-primary" />
                                        )}
                                        <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center text-lg font-black shadow-lg shadow-primary/30">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">{step.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </CardContent>
                            </Card>
							</motion.div>
						))}
					</motion.div>

					<motion.div 
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mt-20 p-10 lg:p-16 bg-slate-900 dark:bg-primary/20 rounded-[3.5rem] text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-3xl relative overflow-hidden border border-white/5"
					>
						<div className="absolute top-0 right-0 p-10 opacity-10">
							<Search className="w-64 h-64 -mr-32 -mt-32" />
						</div>
						<div className="text-center lg:text-left relative z-10">
							<h2 className="text-4xl font-black mb-4">{t('howtopay.cta_title')}</h2>
							<p className="text-slate-400 dark:text-slate-300 text-lg max-w-md">{t('howtopay.cta_desc')}</p>
						</div>
						<div className="flex gap-4 relative z-10">
							<Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-2xl px-12 h-16 text-lg font-bold shadow-xl">
								{t('howtopay.contact_cs')}
							</Button>
						</div>
					</motion.div>
				</div>
			</section>
		</GuestLayout>
	);
}

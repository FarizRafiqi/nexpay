import React from 'react';
import { Link } from '@inertiajs/react';
import { Zap, Mail, Phone } from 'lucide-react';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 transition-colors">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 group mb-6">
                            <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20">
                                <Zap className="w-6 h-6 fill-current" />
                            </div>
                            <span className="font-bold text-2xl tracking-tight dark:text-white uppercase">Nexpay</span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 text-sm">
                            {t('footer.tagline')}
                        </p>
                        <div className="flex gap-4">
                            {[FaGithub, FaInstagram, FaTwitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all border border-slate-100 dark:border-slate-800">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs opacity-50">{t('footer.services')}</h4>
                        <ul className="space-y-4">
                            {[t('footer.check_bill'), t('footer.transaction_history'), t('footer.payment_guide'), t('footer.help')].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs opacity-50">{t('footer.company')}</h4>
                        <ul className="space-y-4">
                            {[t('footer.about_us'), t('footer.terms'), t('footer.privacy'), t('footer.careers')].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs opacity-50">{t('footer.contact_us')}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                    <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <span>support@nexpay.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                    <Phone className="w-4 h-4 text-primary" />
                                </div>
                                <span>+62 812 3456 7890</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">
                        &copy; {new Date().getFullYear()} NEXPAY PREMIUM. {t('footer.all_rights')}
                    </p>
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-medium bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-800">
                        <span>{t('footer.crafted_with')}</span>
                        <span className="text-red-500 animate-pulse">&#9829;</span>
                        <span>{t('footer.by')} Fariz Rafiqi</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

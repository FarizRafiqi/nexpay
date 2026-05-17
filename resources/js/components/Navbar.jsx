import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { CredentialsModal } from './CredentialsModal';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Zap, Menu, X, LayoutDashboard, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';


export default function Navbar() {
    const { url } = usePage();
    const { auth } = usePage().props;
    const { t } = useTranslation();
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t('nav.about'), href: '/about-us' },
        { name: t('nav.how_to_pay'), href: '/how-to-pay' },
        { name: t('nav.faq'), href: '/faq' },
    ];

    const isActive = (href) => url === href;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled 
                ? 'py-3 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm' 
                : 'py-6 bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative flex items-center justify-center w-10 h-10 bg-primary rounded-xl overflow-hidden shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                                <Zap className="w-6 h-6 text-white fill-current z-10" />
                            </div>
                            <span className="text-xl font-black tracking-tighter dark:text-white">NEX<span className="text-primary">PAY</span></span>
                        </Link>
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.href}
                                    href={link.href} 
                                    className={`text-sm font-bold transition-all hover:text-primary ${
                                        isActive(link.href) ? 'text-primary' : 'text-slate-600 dark:text-slate-400'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-3 mr-2">
                            <CredentialsModal />
                            <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 mx-1" />
                            <ThemeToggle />
                            <LanguageSwitcher variant="minimal" />
                        </div>

                        {auth && auth.user ? (
                            <Button asChild className="rounded-xl px-6 h-11 font-bold shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all">
                                <Link href="/admin">
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    {t('nav.dashboard')}
                                </Link>
                            </Button>
                        ) : (
                            <div className="hidden sm:flex items-center gap-3">
                                <Button variant="ghost" asChild className="rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                                    <Link href="/login">{t('nav.login')}</Link>
                                </Button>
                                <Button asChild className="rounded-xl px-6 h-11 font-bold shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all">
                                    <Link href="/register">
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        {t('nav.register')}
                                    </Link>
                                </Button>
                            </div>
                        )}

                        <button 
                            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Framer Motion Version */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b dark:border-slate-800 p-6 space-y-6 shadow-2xl overflow-hidden"
                    >
                        <div className="flex flex-col gap-5">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.href}
                                    href={link.href} 
                                    className={`text-lg font-bold ${isActive(link.href) ? 'text-primary' : 'dark:text-slate-300'}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="h-px bg-slate-100 dark:bg-slate-800" />
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t('nav.settings')}</span>
                            <div className="flex items-center gap-4">
                                <ThemeToggle />
                                <CredentialsModal />
                                <LanguageSwitcher variant="minimal" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" asChild className="rounded-xl h-12 font-bold border-slate-200 dark:border-slate-800">
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>{t('nav.login')}</Link>
                            </Button>
                            <Button asChild className="rounded-xl h-12 font-bold">
                                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>{t('nav.register')}</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

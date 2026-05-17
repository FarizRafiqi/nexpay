import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageSquare } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function FAQ() {
    const { t } = useTranslation();

    const faqs = [
        { q: t('faq.q1'), a: t('faq.a1') },
        { q: t('faq.q2'), a: t('faq.a2') },
        { q: t('faq.q3'), a: t('faq.a3') },
        { q: t('faq.q4'), a: t('faq.a4') },
        { q: t('faq.q5'), a: t('faq.a5') },
    ];

    return (
        <GuestLayout>
            <Head title="FAQ - Pertanyaan Umum" />
            
            <section className="pt-32 pb-20 bg-slate-50 dark:bg-slate-900 transition-colors">
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                            <HelpCircle className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black mb-6 dark:text-white">{t('faq.title')}</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            {t('faq.subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
                <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <AccordionItem value={`item-${index}`} className="border border-slate-200 dark:border-slate-800 rounded-2xl px-6 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                                        <AccordionTrigger className="text-left font-bold text-lg dark:text-white hover:no-underline hover:text-primary py-6 transition-colors">
                                            {faq.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-slate-600 dark:text-slate-400 text-base leading-relaxed pb-6">
                                            {faq.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                </motion.div>
                            ))}
                        </Accordion>

                        <div className="mt-20 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6 justify-between shadow-xl shadow-slate-200/50 dark:shadow-none">
                            <div className="flex items-center gap-4 text-center md:text-left">
                                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm">
                                    <MessageSquare className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold dark:text-white">{t('faq.help_title')}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('faq.help_desc')}</p>
                                </div>
                            </div>
                            <button className="px-8 h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform cursor-pointer">
                                {t('faq.chat_now')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}

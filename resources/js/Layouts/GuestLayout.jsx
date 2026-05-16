import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}

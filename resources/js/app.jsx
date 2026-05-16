import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './components/theme-provider';

createInertiaApp({
	title: (title) => {
		const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Nexpay';
		return title ? `${title} - ${appName}` : appName;
	},
	resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
	setup({ el, App, props }) {
		const root = createRoot(el);
		root.render(
			<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
				<App {...props} />
			</ThemeProvider>
		);
	},
	progress: {
		color: '#0D8ABC',
	},
});

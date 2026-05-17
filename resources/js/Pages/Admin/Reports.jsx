import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CalendarDays, Printer, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format, startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns';
import { id } from 'date-fns/locale';
import 'react-day-picker/style.css';
import { useTranslation } from '@/hooks/useTranslation';

export default function Reports({ auth }) {
  const { t } = useTranslation();
  const [range, setRange] = useState(undefined);
  const [showPicker, setShowPicker] = useState(false);

  const { data, setData, post, processing } = useForm({
    start_date: '',
    end_date: '',
    status: '',
  });

  const handleSubmit = (action) => {
    if (range?.from && range?.to) {
      setData({
        start_date: format(range.from, 'yyyy-MM-dd'),
        end_date: format(range.to, 'yyyy-MM-dd'),
        status: data.status,
      });
    }
    post(route('admin.reports.payment'), {
      data: {
        ...data,
        start_date: range?.from ? format(range.from, 'yyyy-MM-dd') : '',
        end_date: range?.to ? format(range.to, 'yyyy-MM-dd') : '',
      },
      action,
    });
  };

  const setQuickRange = (from, to) => {
    setRange({ from: startOfDay(from), to: endOfDay(to) });
  };

  return (
    <AuthenticatedLayout>
      <Head title={t('admin.reports')} />

      <div className="flex-1 flex flex-col gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            {t('admin.reports')}
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Generate dan cetak laporan transaksi pembayaran.
          </p>
        </div>

        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold text-slate-800 dark:text-white">Filter Laporan</CardTitle>
                <CardDescription className="text-[11px] text-slate-500 dark:text-slate-400">
                  Pilih rentang tanggal dan status untuk generate laporan.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Range Display + Picker */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">
                {t('dt.date_range')}
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPicker(!showPicker)}
                  className="flex items-center gap-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-left transition-colors hover:border-primary/50"
                >
                  <CalendarDays className="w-4 h-4 text-primary shrink-0" />
                  <span className="flex-1 text-sm">
                    {range?.from && range?.to ? (
                      <span className="text-slate-800 dark:text-slate-200 font-medium">
                        {format(range.from, 'd MMM yyyy', { locale: id })} — {format(range.to, 'd MMM yyyy', { locale: id })}
                      </span>
                    ) : (
                      <span className="text-slate-400">Pilih tanggal mulai — tanggal akhir</span>
                    )}
                  </span>
                  {range && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setRange(undefined); }}
                      className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <X className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  )}
                </button>

                {/* Quick select buttons */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[
                    { label: t('dt.today'), fn: () => { const d = new Date(); setQuickRange(d, d); } },
                    { label: t('dt.7_days'), fn: () => { const d = new Date(); const w = new Date(); w.setDate(w.getDate() - 6); setQuickRange(w, d); } },
                    { label: t('dt.30_days'), fn: () => { const d = new Date(); const m = new Date(); m.setDate(m.getDate() - 29); setQuickRange(m, d); } },
                    { label: t('dt.this_month'), fn: () => { const d = new Date(); setQuickRange(startOfMonth(d), d); } },
                    { label: t('dt.last_month'), fn: () => { const d = new Date(); const lm = startOfMonth(new Date(d.getFullYear(), d.getMonth() - 1, 1)); setQuickRange(lm, endOfMonth(lm)); } },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => { preset.fn(); setShowPicker(false); }}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* DayPicker Popover */}
              {showPicker && (
                <div className="relative z-10 mt-2">
                  <div className="absolute left-0 top-0 w-[350px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-3">
                    <style>{`
                      .rdp-day { border-radius: 0.5rem; font-size: 0.875rem; }
                      .rdp-day:hover { background: #f1f5f9; }
                      .dark .rdp-day:hover { background: #1e293b; }
                      .rdp-day.rdp-selected .rdp-day_button { background: #0D8ABC; color: white; border-radius: 0.5rem; }
                      .rdp-day.rdp-range_start .rdp-day_button,
                      .rdp-day.rdp-range_end .rdp-day_button { background: #0D8ABC; color: white; border-radius: 0.5rem; }
                      .rdp-day.rdp-range_middle .rdp-day_button { background: rgba(13, 138, 188, 0.1); border-radius: 0; }
                      .rdp-day_button { width: 100%; height: 100%; }
                      .rdp-nav_button { padding: 4px; border-radius: 0.5rem; }
                      .rdp-nav_button:hover { background: #f1f5f9; }
                      .dark .rdp-nav_button:hover { background: #1e293b; }
                      .rdp-caption_label { font-size: 0.875rem; font-weight: 700; }
                    `}</style>
                    <DayPicker
                      mode="range"
                      selected={range}
                      onSelect={(r) => { setRange(r); if (r?.from && r?.to) setShowPicker(false); }}
                      locale={id}
                      startMonth={new Date(2020, 0)}
                      endMonth={new Date(2030, 11)}
                      components={{
                        Chevron: ({ orientation }) => orientation === 'left'
                          ? <ChevronLeft className="w-4 h-4" />
                          : <ChevronRight className="w-4 h-4" />,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Status Filter */}
            <div className="max-w-xs">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">
                Status Pembayaran
              </label>
              <div className="relative">
                <select
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  className="flex h-9 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1 pl-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30"
                >
                  <option value="">Semua Status</option>
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Button
                variant="default"
                onClick={() => handleSubmit('print_date')}
                disabled={processing || !range?.from || !range?.to}
              >
                <Printer className="w-4 h-4" />
                {t('general.print')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}

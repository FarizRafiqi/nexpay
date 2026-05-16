import { Link } from '@inertiajs/react'

export default function Pagination({ paginator }) {
  if (!paginator || paginator.last_page <= 1) return null

  const { links, current_page, last_page, total, from, to } = paginator

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-slate-100 dark:border-slate-800">
      <p className="text-[11px] text-slate-500">
        Menampilkan {from}–{to} dari {total}
      </p>

      <div className="flex items-center gap-1">
        {links.map((link, i) => {
          const label = link.label
            .replace('&laquo; Previous', '‹')
            .replace('Next &raquo;', '›')
            .replace('&laquo;', '‹')
            .replace('&raquo;', '›')

          if (link.url === null) {
            return (
              <span
                key={i}
                className="flex items-center justify-center min-w-[28px] h-7 rounded-md text-[11px] text-slate-300 dark:text-slate-600 cursor-not-allowed px-1"
                dangerouslySetInnerHTML={{ __html: label }}
              />
            )
          }

          return (
            <Link
              key={i}
              href={link.url}
              preserveScroll
              preserveState
              className={`flex items-center justify-center min-w-[28px] h-7 rounded-md text-[11px] font-bold transition-colors px-1
                ${link.active
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }
              `}
              dangerouslySetInnerHTML={{ __html: label }}
            />
          )
        })}
      </div>
    </div>
  )
}

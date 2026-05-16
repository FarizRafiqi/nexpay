import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Check } from 'lucide-react';

function groupPermissions(perms) {
  const groups = {}
  perms.forEach((p) => {
    const parts = p.title.split('_')
    const action = parts.pop()
    const group = parts.join('_') || action
    if (!groups[group]) groups[group] = { label: group.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), items: [] }
    groups[group].items.push({ ...p, action })
  })
  return Object.entries(groups)
}

export default function Create({ auth, permissions }) {
  const { data, setData, post, processing, errors } = useForm({
    level: '',
    permissions: [],
  });

  const groups = groupPermissions(permissions || [])

  function togglePermission(id) {
    const current = data.permissions;
    if (current.includes(id)) {
      setData('permissions', current.filter((p) => p !== id));
    } else {
      setData('permissions', [...current, id]);
    }
  }

  function toggleGroup(groupItems) {
    const groupIds = groupItems.map((p) => p.id)
    const allSelected = groupItems.every((p) => data.permissions.includes(p.id))
    if (allSelected) {
      setData('permissions', data.permissions.filter((id) => !groupIds.includes(id)))
    } else {
      const existing = new Set(data.permissions)
      groupIds.forEach((id) => existing.add(id))
      setData('permissions', [...existing])
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    post(route('admin.levels.store'));
  }

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Tambah Level" />

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">Tambah Level</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Buat level akses baru</p>
          </div>
          <Link href={route('admin.levels.index')}>
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
          </Link>
        </div>

        <Card className="bg-white dark:bg-slate-900 border-none shadow-sm rounded-xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Nama Level</label>
                <Input
                  placeholder="Contoh: Admin"
                  value={data.level}
                  onChange={(e) => setData('level', e.target.value)}
                />
                {errors.level && <p className="text-[10px] text-red-500">{errors.level}</p>}
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Permissions</label>
                {groups.map(([groupKey, group]) => {
                  const allSelected = group.items.every((p) => data.permissions.includes(p.id))
                  return (
                    <div key={groupKey} className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          {group.label}
                        </span>
                        <label className="flex items-center gap-2 cursor-pointer text-[10px] font-bold text-primary hover:text-primary/80 transition-colors">
                          <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${allSelected ? 'bg-primary text-white' : 'bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500'}`}>
                            {allSelected && <Check className="w-3 h-3" />}
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={allSelected}
                            onChange={() => toggleGroup(group.items)}
                          />
                          Pilih Semua
                        </label>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 p-3">
                        {group.items.map((perm) => {
                          const checked = data.permissions.includes(perm.id);
                          return (
                            <label
                              key={perm.id}
                              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${checked ? 'bg-primary/5' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${checked ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600'}`}>
                                {checked && <Check className="w-3 h-3" />}
                              </div>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={checked}
                                onChange={() => togglePermission(perm.id)}
                              />
                              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 capitalize">{perm.action}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )
                })}
                {errors.permissions && <p className="text-[10px] text-red-500 mt-2">{errors.permissions}</p>}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button type="submit" disabled={processing}>
                  <Save className="w-4 h-4" />
                  Simpan
                </Button>
                <Link href={route('admin.levels.index')}>
                  <Button type="button" variant="ghost">Batal</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}

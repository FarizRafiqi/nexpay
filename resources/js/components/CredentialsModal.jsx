import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Key, User, ShieldCheck, Landmark, Copy, Check, Info } from "lucide-react"

export function CredentialsModal() {
  const [copied, setCopied] = React.useState(null)

  const credentials = [
    {
      role: "Administrator",
      email: "admin@gmail.com",
      pass: "admin123",
      icon: ShieldCheck,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      desc: "Akses penuh ke dashboard admin & manajemen data."
    },
    {
      role: "Bank",
      email: "bank{nama_bank}@gmail.com",
      pass: "bank{nama_bank}123",
      icon: Landmark,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      desc: "Tersedia untuk bank: bca, bni, mandiri.",
      isPattern: true
    },
    {
      role: "Customer",
      email: "customer1@gmail.com",
      pass: "password",
      icon: User,
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
      desc: "Akses untuk cek tagihan & riwayat pembayaran."
    },
  ]

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold transition-all px-4 h-10 shadow-sm cursor-pointer">
          <Key className="w-4 h-4 text-primary" />
          Demo Access
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl rounded-[2.5rem] border-none shadow-3xl dark:bg-slate-900 p-0 overflow-hidden">
        <DialogHeader className="p-8 pb-4">
          <DialogTitle className="text-3xl font-black flex items-center gap-2 dark:text-white">
            Demo Access
          </DialogTitle>
          <DialogDescription className="text-base">
            Gunakan kredensial di bawah ini untuk menjelajahi fitur Nexpay sesuai hak akses masing-masing level.
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 pt-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {credentials.map((cred) => (
              <div key={cred.role} className="p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:border-primary/20 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl ${cred.color.split(' ')[0]}`}>
                      <cred.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{cred.role}</h4>
                      <p className="text-xs text-slate-500">{cred.desc}</p>
                    </div>
                  </div>
                  {cred.isPattern && (
                    <Badge variant="secondary" className="rounded-lg font-bold text-[10px] uppercase tracking-wider">Pattern Based</Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 group">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Email</span>
                      <span className="text-sm text-slate-700 dark:text-slate-200 font-mono truncate max-w-[150px]">{cred.email}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
                      onClick={() => copyToClipboard(cred.email, cred.role + 'email')}
                    >
                      {copied === cred.role + 'email' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 group">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Password</span>
                      <span className="text-sm text-slate-700 dark:text-slate-200 font-mono">{cred.pass}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
                      onClick={() => copyToClipboard(cred.pass, cred.role + 'pass')}
                    >
                      {copied === cred.role + 'pass' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10 mt-4">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <span className="font-bold text-primary italic">Note:</span> <code>nama_bank</code> diisi sesuai nama bank yang tersedia yaitu
              <span className="font-bold text-slate-900 dark:text-white mx-1">bca, bni,</span> dan
              <span className="font-bold text-slate-900 dark:text-white ml-1">mandiri</span>.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

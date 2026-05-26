import { useEffect, useState } from 'react'
import {
  UserGroupIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

const NAV_ITEMS = [
  { key: 'segurados', label: 'Clientes', icon: UserGroupIcon },
  { key: 'seguros', label: 'Seguros', icon: ShieldCheckIcon },
  { key: 'parcelas', label: 'Parcelas', icon: CurrencyDollarIcon },
]

// ── Sidebar ────────────────────────────────────────────────────────────────────
function Sidebar({ tab, setTab }) {
  return (
    <aside className="hidden md:flex flex-col w-60 bg-discord-800 border-r border-discord-600/50 h-screen sticky top-0">
      <div className="px-4 h-14 flex items-center border-b border-discord-600/50 shadow-sm">
        <h1 className="text-base font-semibold text-white tracking-tight truncate">
          Controle de Boletos
        </h1>
      </div>

      <div className="px-2 pt-4 pb-2">
        <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-discord-400">
          Gerenciamento
        </span>
      </div>

      <nav className="flex-1 px-2 space-y-0.5">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
              tab === key
                ? 'bg-discord-600/60 text-white'
                : 'text-discord-300 hover:bg-discord-600/30 hover:text-discord-100'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-discord-600/50">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-discord-900/50">
          <div className="w-8 h-8 rounded-full bg-discord-blurple flex items-center justify-center text-white text-xs font-bold">
            CB
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-discord-100 truncate">Corretor</p>
            <p className="text-[10px] text-discord-400">Online</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ── Mobile Header ──────────────────────────────────────────────────────────────
function MobileHeader({ tab, setTab }) {
  return (
    <div className="md:hidden">
      <div className="bg-discord-800 border-b border-discord-600/50 px-4 py-3">
        <h1 className="text-base font-semibold text-white">Controle de Boletos</h1>
      </div>
      <div className="bg-discord-800/80 border-b border-discord-600/50 px-2 py-2 flex gap-1 overflow-x-auto">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              tab === key
                ? 'bg-discord-blurple text-white'
                : 'text-discord-300 hover:bg-discord-600/30'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Page Header ────────────────────────────────────────────────────────────────
function PageHeader({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-discord-blurple/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-discord-blurple" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {subtitle && <p className="text-xs text-discord-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}

// ── Badge Component ────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const config = {
    Pago: 'bg-discord-green/20 text-green-400 border-green-500/30',
    Vencido: 'bg-discord-red/20 text-red-400 border-red-500/30',
    Pendente: 'bg-discord-yellow/20 text-yellow-400 border-yellow-500/30',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config[status] || config.Pendente}`}>
      {status}
    </span>
  )
}

// ── Empty State ────────────────────────────────────────────────────────────────
function EmptyState({ message }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-discord-600/30 flex items-center justify-center">
        <MagnifyingGlassIcon className="w-8 h-8 text-discord-400" />
      </div>
      <p className="text-discord-400 text-sm">{message}</p>
    </div>
  )
}

// ── Tab Segurados ──────────────────────────────────────────────────────────────
function SeguradosTab() {
  const [segurados, setSegurados] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ nome: '', whatsapp: '', email: '', cpf: '', forma_pagamento: 'Boleto' })
  const [editId, setEditId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [detalheId, setDetalheId] = useState(null)
  const [detalhe, setDetalhe] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => { fetchSegurados() }, [])

  async function fetchSegurados() {
    setLoading(true)
    const r = await fetch('/api/segurados')
    const d = await r.json()
    setSegurados(d || [])
    setLoading(false)
  }

  async function adicionar(e) {
    e.preventDefault()
    if (!form.nome) return alert('Nome é obrigatório')
    await fetch('/api/segurados', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ nome: '', whatsapp: '', email: '', cpf: '', forma_pagamento: 'Boleto' })
    setShowForm(false)
    fetchSegurados()
  }

  async function excluir(id) {
    if (!confirm('Excluir este cliente?')) return
    await fetch(`/api/segurados/${id}`, { method: 'DELETE' })
    fetchSegurados()
  }

  async function salvarEdicao(id) {
    await fetch(`/api/segurados/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm) })
    setEditId(null)
    fetchSegurados()
  }

  async function verDetalhe(id) {
    if (detalheId === id) { setDetalheId(null); setDetalhe(null); return }
    const r = await fetch(`/api/segurados/${id}`)
    const d = await r.json()
    setDetalhe(d)
    setDetalheId(id)
  }

  return (
    <div className="space-y-5">
      <PageHeader icon={UserGroupIcon} title="Clientes" subtitle={`${segurados.length} cadastrados`}>
        <button
          onClick={() => setShowForm(!showForm)}
          className="discord-btn bg-discord-blurple hover:bg-discord-blurple-dark text-white flex items-center gap-2"
        >
          {showForm ? <XMarkIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
          {showForm ? 'Cancelar' : 'Novo Cliente'}
        </button>
      </PageHeader>

      {showForm && (
        <div className="discord-card animate-in">
          <h3 className="text-sm font-semibold text-discord-200 uppercase tracking-wider mb-4">Novo Cliente</h3>
          <form onSubmit={adicionar} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-discord-300 mb-1.5">Nome *</label>
              <input className="discord-input" placeholder="Nome completo" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-discord-300 mb-1.5">WhatsApp</label>
              <input className="discord-input" placeholder="(00) 00000-0000" value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-discord-300 mb-1.5">Email</label>
              <input className="discord-input" placeholder="email@exemplo.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-discord-300 mb-1.5">CPF</label>
              <input className="discord-input" placeholder="000.000.000-00" value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-discord-300 mb-1.5">Forma de Pagamento</label>
              <select className="discord-select" value={form.forma_pagamento} onChange={e => setForm({ ...form, forma_pagamento: e.target.value })}>
                <option>Boleto</option><option>PIX</option><option>Cartão</option><option>Débito Automático</option>
              </select>
            </div>
            <div className="flex items-end">
              <button type="submit" className="discord-btn bg-discord-green hover:bg-green-600 text-white w-full">
                Adicionar Cliente
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="discord-card">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-discord-blurple border-t-transparent rounded-full animate-spin" />
          </div>
        ) : segurados.length === 0 ? (
          <EmptyState message="Nenhum cliente cadastrado ainda." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-discord-600/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider">Nome</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider hidden sm:table-cell">WhatsApp</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider hidden md:table-cell">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider hidden lg:table-cell">CPF</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider hidden lg:table-cell">Pagamento</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-discord-600/30">
                {segurados.map(s => (
                  <tr key={s.id} className="group">
                    {editId === s.id ? (
                      <>
                        <td className="py-3 px-4"><input className="discord-input" value={editForm.nome || ''} onChange={e => setEditForm({ ...editForm, nome: e.target.value })} /></td>
                        <td className="py-3 px-4 hidden sm:table-cell"><input className="discord-input" value={editForm.whatsapp || ''} onChange={e => setEditForm({ ...editForm, whatsapp: e.target.value })} /></td>
                        <td className="py-3 px-4 hidden md:table-cell"><input className="discord-input" value={editForm.email || ''} onChange={e => setEditForm({ ...editForm, email: e.target.value })} /></td>
                        <td className="py-3 px-4 hidden lg:table-cell"><input className="discord-input" value={editForm.cpf || ''} onChange={e => setEditForm({ ...editForm, cpf: e.target.value })} /></td>
                        <td className="py-3 px-4 hidden lg:table-cell">
                          <select className="discord-select" value={editForm.forma_pagamento || ''} onChange={e => setEditForm({ ...editForm, forma_pagamento: e.target.value })}>
                            <option>Boleto</option><option>PIX</option><option>Cartão</option><option>Débito Automático</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button onClick={() => salvarEdicao(s.id)} className="discord-btn bg-discord-green hover:bg-green-600 text-white py-1.5 px-3 text-xs">Salvar</button>
                            <button onClick={() => setEditId(null)} className="discord-btn bg-discord-600 hover:bg-discord-500 text-discord-200 py-1.5 px-3 text-xs">Cancelar</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-discord-blurple/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-semibold text-discord-blurple">{s.nome?.charAt(0)?.toUpperCase()}</span>
                            </div>
                            <span className="font-medium text-white">{s.nome}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-discord-300 hidden sm:table-cell">{s.whatsapp || '—'}</td>
                        <td className="py-3 px-4 text-discord-300 hidden md:table-cell">{s.email || '—'}</td>
                        <td className="py-3 px-4 text-discord-300 hidden lg:table-cell">{s.cpf || '—'}</td>
                        <td className="py-3 px-4 hidden lg:table-cell">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-discord-600/50 text-discord-200">
                            {s.forma_pagamento}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => verDetalhe(s.id)} className="p-1.5 rounded-md hover:bg-discord-blurple/20 text-discord-400 hover:text-discord-blurple transition-colors" title="Ver seguros">
                              {detalheId === s.id ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
                            </button>
                            <button onClick={() => { setEditId(s.id); setEditForm(s) }} className="p-1.5 rounded-md hover:bg-discord-yellow/20 text-discord-400 hover:text-discord-yellow transition-colors" title="Editar">
                              <PencilSquareIcon className="w-4 h-4" />
                            </button>
                            <button onClick={() => excluir(s.id)} className="p-1.5 rounded-md hover:bg-discord-red/20 text-discord-400 hover:text-discord-red transition-colors" title="Excluir">
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {segurados.map(s => (
              detalheId === s.id && detalhe && (
                <div key={`det-${s.id}`} className="border-t border-discord-600/30 bg-discord-800/50 p-4 rounded-b-lg">
                  <h4 className="text-sm font-semibold text-discord-200 mb-3">Seguros de {detalhe.nome}</h4>
                  {detalhe.seguros && detalhe.seguros.length === 0 && (
                    <p className="text-discord-400 text-sm">Nenhum seguro cadastrado.</p>
                  )}
                  <div className="space-y-3">
                    {detalhe.seguros && detalhe.seguros.map(seg => (
                      <div key={seg.id} className="bg-discord-700 rounded-lg p-3 border border-discord-600/30">
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                          <span><span className="text-discord-400">Apólice:</span> <span className="text-white font-medium">{seg.apolice}</span></span>
                          <span><span className="text-discord-400">Companhia:</span> <span className="text-discord-200">{seg.companhia}</span></span>
                          <span><span className="text-discord-400">Tipo:</span> <span className="text-discord-200">{seg.tipo}</span></span>
                          <span><span className="text-discord-400">Bem:</span> <span className="text-discord-200">{seg.bem_segurado}</span></span>
                        </div>
                        {seg.parcelas && seg.parcelas.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-discord-600/30 flex flex-wrap gap-2">
                            {seg.parcelas.map(p => (
                              <StatusBadge key={p.id} status={p.status} />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Tab Seguros ──────────────────────────────────────────────────────────────
function SegurosTab() {
  const [seguros, setSeguros] = useState([])
  const [segurados, setSegurados] = useState([])
  const [form, setForm] = useState({ segurado_id: '', companhia: '', tipo: '', apolice: '', bem_segurado: '' })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetch('/api/seguros').then(r => r.json()).then(d => setSeguros(d || []))
    fetch('/api/segurados').then(r => r.json()).then(d => setSegurados(d || []))
  }, [])

  async function adicionar(e) {
    e.preventDefault()
    if (!form.segurado_id || !form.apolice) return alert('Segurado e Apólice são obrigatórios')
    await fetch('/api/seguros', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, segurado_id: parseInt(form.segurado_id) }) })
    setForm({ segurado_id: '', companhia: '', tipo: '', apolice: '', bem_segurado: '' })
    setShowForm(false)
    fetch('/api/seguros').then(r => r.json()).then(d => setSeguros(d || []))
  }

  async function excluir(id) {
    if (!confirm('Excluir este seguro?')) return
    await fetch(`/api/seguros/${id}`, { method: 'DELETE' })
    fetch('/api/seguros').then(r => r.json()).then(d => setSeguros(d || []))
  }

  return (
    <div className="space-y-5">
      <PageHeader icon={ShieldCheckIcon} title="Seguros" subtitle={`${seguros.length} cadastrados`}>
        <button
          onClick={() => setShowForm(!showForm)}
          className="discord-btn bg-discord-blurple hover:bg-discord-blurple-dark text-white flex items-center gap-2"
        >
          {showForm ? <XMarkIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
          {showForm ? 'Cancelar' : 'Novo Seguro'}
        </button>
      </PageHeader>

      {showForm && (
        <div className="discord-card">
          <h3 className="text-sm font-semibold text-discord-200 uppercase tracking-wider mb-4">Novo Seguro</h3>
          <form onSubmit={adicionar} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-discord-300 mb-1.5">Cliente *</label>
              <select className="discord-select" value={form.segurado_id} onChange={e => setForm({ ...form, segurado_id: e.target.value })}>
                <option value="">Selecione o cliente</option>
                {segurados.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-discord-300 mb-1.5">Apólice *</label>
              <input className="discord-input" placeholder="Número da apólice" value={form.apolice} onChange={e => setForm({ ...form, apolice: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-discord-300 mb-1.5">Companhia</label>
              <input className="discord-input" placeholder="Nome da companhia" value={form.companhia} onChange={e => setForm({ ...form, companhia: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-discord-300 mb-1.5">Tipo</label>
              <input className="discord-input" placeholder="Auto, Vida, Residencial..." value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-discord-300 mb-1.5">Bem Segurado</label>
              <input className="discord-input" placeholder="Descrição do bem" value={form.bem_segurado} onChange={e => setForm({ ...form, bem_segurado: e.target.value })} />
            </div>
            <div className="flex items-end">
              <button type="submit" className="discord-btn bg-discord-green hover:bg-green-600 text-white w-full">
                Adicionar Seguro
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="discord-card">
        {seguros.length === 0 ? (
          <EmptyState message="Nenhum seguro cadastrado ainda." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-discord-600/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider">Cliente</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider">Apólice</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider hidden sm:table-cell">Companhia</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider hidden md:table-cell">Tipo</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider hidden lg:table-cell">Bem Segurado</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider">Parcelas</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-discord-600/30">
                {seguros.map(s => {
                  const segurado = segurados.find(sg => sg.id === s.segurado_id)
                  return (
                    <tr key={s.id} className="group hover:bg-discord-600/20 transition-colors">
                      <td className="py-3 px-4 text-discord-400 font-mono text-xs">#{s.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-discord-blurple/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-semibold text-discord-blurple">
                              {(segurado ? segurado.nome : '?').charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-discord-200 font-medium">{segurado ? segurado.nome : s.segurado_id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-white font-medium">{s.apolice}</td>
                      <td className="py-3 px-4 text-discord-300 hidden sm:table-cell">{s.companhia || '—'}</td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        {s.tipo ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-discord-600/50 text-discord-200">
                            {s.tipo}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="py-3 px-4 text-discord-300 hidden lg:table-cell">{s.bem_segurado || '—'}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-discord-600/50 text-discord-200 text-xs font-semibold">
                          {s.parcelas ? s.parcelas.length : 0}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => excluir(s.id)}
                          className="p-1.5 rounded-md hover:bg-discord-red/20 text-discord-400 hover:text-discord-red transition-colors opacity-0 group-hover:opacity-100"
                          title="Excluir"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Tab Parcelas ──────────────────────────────────────────────────────────────
function ParcelasTab() {
  const [parcelas, setParcelas] = useState([])
  const [seguros, setSeguros] = useState([])
  const [form, setForm] = useState({ seguro_id: '', data_vencimento: '', valor: '', status: 'Pendente' })
  const [filtro, setFiltro] = useState('Todos')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchParcelas()
    fetch('/api/seguros').then(r => r.json()).then(d => setSeguros(d || []))
  }, [])

  async function fetchParcelas() {
    const r = await fetch('/api/parcelas')
    const d = await r.json()
    setParcelas(d || [])
  }

  async function adicionar(e) {
    e.preventDefault()
    if (!form.seguro_id || !form.data_vencimento || !form.valor) return alert('Preencha todos os campos obrigatórios')
    await fetch('/api/parcelas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, seguro_id: parseInt(form.seguro_id), valor: parseFloat(form.valor) }) })
    setForm({ seguro_id: '', data_vencimento: '', valor: '', status: 'Pendente' })
    setShowForm(false)
    fetchParcelas()
  }

  async function marcarPago(p) {
    await fetch(`/api/parcelas/${p.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Pago', data_pagamento: new Date().toISOString().split('T')[0] }) })
    fetchParcelas()
  }

  async function excluir(id) {
    if (!confirm('Excluir esta parcela?')) return
    await fetch(`/api/parcelas/${id}`, { method: 'DELETE' })
    fetchParcelas()
  }

  const hoje = new Date().toISOString().split('T')[0]
  const parcelasFiltradas = parcelas
    .map(p => ({ ...p, status: p.status !== 'Pago' && p.data_vencimento < hoje ? 'Vencido' : p.status }))
    .filter(p => filtro === 'Todos' || p.status === filtro)

  const totalPendente = parcelas.filter(p => p.status !== 'Pago').reduce((acc, p) => acc + Number(p.valor), 0)
  const totalPago = parcelas.filter(p => p.status === 'Pago').reduce((acc, p) => acc + Number(p.valor), 0)

  const FILTER_TABS = [
    { key: 'Todos', label: 'Todos', count: parcelas.length },
    { key: 'Pendente', label: 'Pendente', count: parcelas.filter(p => p.status === 'Pendente' && !(p.data_vencimento < hoje)).length },
    { key: 'Vencido', label: 'Vencido', count: parcelas.filter(p => p.status !== 'Pago' && p.data_vencimento < hoje).length },
    { key: 'Pago', label: 'Pago', count: parcelas.filter(p => p.status === 'Pago').length },
  ]

  return (
    <div className="space-y-5">
      <PageHeader icon={CurrencyDollarIcon} title="Parcelas" subtitle={`${parcelas.length} registradas`}>
        <button
          onClick={() => setShowForm(!showForm)}
          className="discord-btn bg-discord-blurple hover:bg-discord-blurple-dark text-white flex items-center gap-2"
        >
          {showForm ? <XMarkIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
          {showForm ? 'Cancelar' : 'Nova Parcela'}
        </button>
      </PageHeader>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-discord-red/10 border border-discord-red/20 rounded-xl p-4">
          <p className="text-xs font-medium text-discord-400 uppercase tracking-wider">Total em Aberto</p>
          <p className="text-2xl font-bold text-red-400 mt-1">R$ {totalPendente.toFixed(2)}</p>
        </div>
        <div className="bg-discord-green/10 border border-discord-green/20 rounded-xl p-4">
          <p className="text-xs font-medium text-discord-400 uppercase tracking-wider">Total Pago</p>
          <p className="text-2xl font-bold text-green-400 mt-1">R$ {totalPago.toFixed(2)}</p>
        </div>
      </div>

      {showForm && (
        <div className="discord-card">
          <h3 className="text-sm font-semibold text-discord-200 uppercase tracking-wider mb-4">Nova Parcela</h3>
          <form onSubmit={adicionar} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-discord-300 mb-1.5">Seguro *</label>
              <select className="discord-select" value={form.seguro_id} onChange={e => setForm({ ...form, seguro_id: e.target.value })}>
                <option value="">Selecione o seguro</option>
                {seguros.map(s => <option key={s.id} value={s.id}>#{s.id} — {s.apolice} ({s.companhia})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-discord-300 mb-1.5">Vencimento *</label>
              <input type="date" className="discord-input" value={form.data_vencimento} onChange={e => setForm({ ...form, data_vencimento: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-discord-300 mb-1.5">Valor (R$) *</label>
              <input className="discord-input" placeholder="0,00" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} />
            </div>
            <div className="flex items-end">
              <button type="submit" className="discord-btn bg-discord-green hover:bg-green-600 text-white w-full">
                Adicionar Parcela
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="discord-card">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-discord-600/30">
          {FILTER_TABS.map(f => (
            <button
              key={f.key}
              onClick={() => setFiltro(f.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filtro === f.key
                  ? 'bg-discord-blurple text-white'
                  : 'bg-discord-600/30 text-discord-300 hover:bg-discord-600/50 hover:text-discord-100'
              }`}
            >
              {f.label}
              <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full text-[10px] font-bold ${
                filtro === f.key ? 'bg-white/20 text-white' : 'bg-discord-600/50 text-discord-400'
              }`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {parcelasFiltradas.length === 0 ? (
          <EmptyState message="Nenhuma parcela encontrada." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-discord-600/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider">Seguro</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider">Vencimento</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider">Valor</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider hidden sm:table-cell">Pagamento</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-discord-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-discord-600/30">
                {parcelasFiltradas.map(p => (
                  <tr key={p.id} className="group hover:bg-discord-600/20 transition-colors">
                    <td className="py-3 px-4 text-discord-300 font-mono text-xs">#{p.seguro_id}</td>
                    <td className="py-3 px-4 text-discord-200">{p.data_vencimento}</td>
                    <td className="py-3 px-4 text-white font-semibold">R$ {Number(p.valor).toFixed(2)}</td>
                    <td className="py-3 px-4"><StatusBadge status={p.status} /></td>
                    <td className="py-3 px-4 text-discord-400 hidden sm:table-cell">{p.data_pagamento || '—'}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {p.status !== 'Pago' && (
                          <button
                            onClick={() => marcarPago(p)}
                            className="p-1.5 rounded-md hover:bg-discord-green/20 text-discord-400 hover:text-discord-green transition-colors"
                            title="Marcar como pago"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => excluir(p.id)}
                          className="p-1.5 rounded-md hover:bg-discord-red/20 text-discord-400 hover:text-discord-red transition-colors"
                          title="Excluir"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ── App Principal ──────────────────────────────────────────────────────────────
export default function Home() {
  const [tab, setTab] = useState('segurados')

  return (
    <div className="flex min-h-screen bg-discord-900">
      <Sidebar tab={tab} setTab={setTab} />

      <div className="flex-1 flex flex-col min-h-screen">
        <MobileHeader tab={tab} setTab={setTab} />

        {/* Top bar (desktop) */}
        <header className="hidden md:flex items-center h-14 px-6 bg-discord-700 border-b border-discord-600/50 shadow-sm">
          <span className="text-discord-400 mr-2">#</span>
          <span className="text-white font-semibold text-sm">
            {NAV_ITEMS.find(n => n.key === tab)?.label}
          </span>
          <div className="ml-3 h-6 w-px bg-discord-600/50" />
          <span className="ml-3 text-xs text-discord-400">
            {tab === 'segurados' && 'Gerencie seus clientes e segurados'}
            {tab === 'seguros' && 'Controle de apólices e seguros'}
            {tab === 'parcelas' && 'Acompanhe parcelas e pagamentos'}
          </span>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {tab === 'segurados' && <SeguradosTab />}
          {tab === 'seguros' && <SegurosTab />}
          {tab === 'parcelas' && <ParcelasTab />}
        </main>
      </div>
    </div>
  )
}

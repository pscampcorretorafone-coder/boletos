import { useEffect, useState, Fragment } from 'react'

// ── Icons (inline SVG) ──────────────────────────────────────────────────────
function IconUsers() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

function IconCash() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}

function IconPlus() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}

function IconTrash() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )
}

function IconEdit() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function IconX() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function IconEye() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )
}

function IconChevron({ open }) {
  return (
    <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

// ── Badge Component ──────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const colors = {
    Pago: 'bg-discord-green/20 text-green-400 border-discord-green/30',
    Vencido: 'bg-discord-red/20 text-red-400 border-discord-red/30',
    Pendente: 'bg-discord-yellow/20 text-yellow-400 border-discord-yellow/30',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[status] || colors.Pendente}`}>
      {status}
    </span>
  )
}

// ── Tab Segurados ────────────────────────────────────────────────────────────
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Clientes</h2>
          <p className="text-sm text-discord-text-muted">{segurados.length} cliente(s) cadastrado(s)</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-discord-brand hover:bg-discord-brand-hover text-white text-sm font-medium rounded-md transition-colors"
        >
          <IconPlus /> Novo Cliente
        </button>
      </div>

      {/* Form Card */}
      {showForm && (
        <div className="bg-discord-dark rounded-lg border border-discord-light/50 p-5 animate-in">
          <h3 className="text-base font-semibold text-white mb-4">Adicionar Cliente</h3>
          <form onSubmit={adicionar} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <input
              className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text placeholder-discord-text-muted focus:outline-none focus:border-discord-brand transition-colors"
              placeholder="Nome *"
              value={form.nome}
              onChange={e => setForm({ ...form, nome: e.target.value })}
            />
            <input
              className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text placeholder-discord-text-muted focus:outline-none focus:border-discord-brand transition-colors"
              placeholder="WhatsApp"
              value={form.whatsapp}
              onChange={e => setForm({ ...form, whatsapp: e.target.value })}
            />
            <input
              className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text placeholder-discord-text-muted focus:outline-none focus:border-discord-brand transition-colors"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text placeholder-discord-text-muted focus:outline-none focus:border-discord-brand transition-colors"
              placeholder="CPF"
              value={form.cpf}
              onChange={e => setForm({ ...form, cpf: e.target.value })}
            />
            <select
              className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text focus:outline-none focus:border-discord-brand transition-colors"
              value={form.forma_pagamento}
              onChange={e => setForm({ ...form, forma_pagamento: e.target.value })}
            >
              <option>Boleto</option>
              <option>PIX</option>
              <option>Cartão</option>
              <option>Débito Automático</option>
            </select>
            <div className="flex items-center gap-2">
              <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-discord-green hover:bg-green-600 text-white text-sm font-medium rounded-md transition-colors">
                <IconPlus /> Adicionar
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-discord-light hover:bg-discord-hover text-discord-text text-sm rounded-md transition-colors">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-discord-dark rounded-lg border border-discord-light/50 overflow-hidden">
        {loading && (
          <div className="flex items-center justify-center py-8 text-discord-text-muted">
            <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Carregando...
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-discord-light/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-discord-text-muted uppercase tracking-wider">Nome</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-discord-text-muted uppercase tracking-wider">WhatsApp</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-discord-text-muted uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-discord-text-muted uppercase tracking-wider">CPF</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-discord-text-muted uppercase tracking-wider">Pagamento</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-discord-text-muted uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-discord-light/30">
              {segurados.map(s => (
                <Fragment key={s.id}>
                  <tr className="hover:bg-discord-hover/50 transition-colors group">
                    {editId === s.id ? (
                      <>
                        <td className="px-4 py-3">
                          <input className="w-full bg-discord-darker border border-discord-light rounded px-2 py-1 text-sm text-discord-text focus:outline-none focus:border-discord-brand" value={editForm.nome || ''} onChange={e => setEditForm({ ...editForm, nome: e.target.value })} />
                        </td>
                        <td className="px-4 py-3">
                          <input className="w-full bg-discord-darker border border-discord-light rounded px-2 py-1 text-sm text-discord-text focus:outline-none focus:border-discord-brand" value={editForm.whatsapp || ''} onChange={e => setEditForm({ ...editForm, whatsapp: e.target.value })} />
                        </td>
                        <td className="px-4 py-3">
                          <input className="w-full bg-discord-darker border border-discord-light rounded px-2 py-1 text-sm text-discord-text focus:outline-none focus:border-discord-brand" value={editForm.email || ''} onChange={e => setEditForm({ ...editForm, email: e.target.value })} />
                        </td>
                        <td className="px-4 py-3">
                          <input className="w-full bg-discord-darker border border-discord-light rounded px-2 py-1 text-sm text-discord-text focus:outline-none focus:border-discord-brand" value={editForm.cpf || ''} onChange={e => setEditForm({ ...editForm, cpf: e.target.value })} />
                        </td>
                        <td className="px-4 py-3">
                          <select className="bg-discord-darker border border-discord-light rounded px-2 py-1 text-sm text-discord-text focus:outline-none focus:border-discord-brand" value={editForm.forma_pagamento || ''} onChange={e => setEditForm({ ...editForm, forma_pagamento: e.target.value })}>
                            <option>Boleto</option><option>PIX</option><option>Cartão</option><option>Débito Automático</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => salvarEdicao(s.id)} className="p-1.5 rounded bg-discord-green/20 text-green-400 hover:bg-discord-green/40 transition-colors" title="Salvar">
                              <IconCheck />
                            </button>
                            <button onClick={() => setEditId(null)} className="p-1.5 rounded bg-discord-light text-discord-text-muted hover:bg-discord-hover transition-colors" title="Cancelar">
                              <IconX />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-white font-medium">{s.nome}</td>
                        <td className="px-4 py-3 text-discord-text">{s.whatsapp}</td>
                        <td className="px-4 py-3 text-discord-text">{s.email}</td>
                        <td className="px-4 py-3 text-discord-text font-mono text-xs">{s.cpf}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-discord-brand/20 text-indigo-300 border border-discord-brand/30">
                            {s.forma_pagamento}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => verDetalhe(s.id)} className="p-1.5 rounded text-discord-text-muted hover:text-discord-brand hover:bg-discord-brand/10 transition-colors" title="Ver Seguros">
                              <IconEye />
                            </button>
                            <button onClick={() => { setEditId(s.id); setEditForm(s) }} className="p-1.5 rounded text-discord-text-muted hover:text-discord-yellow hover:bg-discord-yellow/10 transition-colors" title="Editar">
                              <IconEdit />
                            </button>
                            <button onClick={() => excluir(s.id)} className="p-1.5 rounded text-discord-text-muted hover:text-discord-red hover:bg-discord-red/10 transition-colors" title="Excluir">
                              <IconTrash />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>

                  {detalheId === s.id && detalhe && (
                    <tr>
                      <td colSpan={6} className="px-4 py-4 bg-discord-darker/50">
                        <div className="flex items-center gap-2 mb-3">
                          <IconChevron open={true} />
                          <span className="text-sm font-semibold text-white">Seguros de {detalhe.nome}</span>
                        </div>
                        {detalhe.seguros && detalhe.seguros.length === 0 && (
                          <p className="text-sm text-discord-text-muted italic pl-5">Nenhum seguro cadastrado.</p>
                        )}
                        <div className="space-y-2 pl-5">
                          {detalhe.seguros && detalhe.seguros.map(seg => (
                            <div key={seg.id} className="bg-discord-dark rounded-lg p-3 border border-discord-light/30">
                              <div className="flex flex-wrap gap-4 text-sm text-discord-text">
                                <span><span className="text-discord-text-muted">Apólice:</span> <span className="text-white font-medium">{seg.apolice}</span></span>
                                <span><span className="text-discord-text-muted">Companhia:</span> {seg.companhia}</span>
                                <span><span className="text-discord-text-muted">Tipo:</span> {seg.tipo}</span>
                                <span><span className="text-discord-text-muted">Bem:</span> {seg.bem_segurado}</span>
                              </div>
                              {seg.parcelas && seg.parcelas.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {seg.parcelas.map(p => (
                                    <StatusBadge key={p.id} status={p.status} />
                                  ))}
                                </div>
                              )}
                              {seg.parcelas && seg.parcelas.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {seg.parcelas.map(p => (
                                    <span key={p.id} className="text-xs text-discord-text-muted">
                                      {p.data_vencimento} — R$ {Number(p.valor).toFixed(2)}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
              {segurados.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-discord-text-muted">
                    Nenhum cliente cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Seguros</h2>
          <p className="text-sm text-discord-text-muted">{seguros.length} seguro(s) cadastrado(s)</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-discord-brand hover:bg-discord-brand-hover text-white text-sm font-medium rounded-md transition-colors"
        >
          <IconPlus /> Novo Seguro
        </button>
      </div>

      {/* Form Card */}
      {showForm && (
        <div className="bg-discord-dark rounded-lg border border-discord-light/50 p-5">
          <h3 className="text-base font-semibold text-white mb-4">Adicionar Seguro</h3>
          <form onSubmit={adicionar} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <select
              className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text focus:outline-none focus:border-discord-brand transition-colors"
              value={form.segurado_id}
              onChange={e => setForm({ ...form, segurado_id: e.target.value })}
            >
              <option value="">Selecione o cliente *</option>
              {segurados.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
            </select>
            <input
              className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text placeholder-discord-text-muted focus:outline-none focus:border-discord-brand transition-colors"
              placeholder="Apólice *"
              value={form.apolice}
              onChange={e => setForm({ ...form, apolice: e.target.value })}
            />
            <input
              className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text placeholder-discord-text-muted focus:outline-none focus:border-discord-brand transition-colors"
              placeholder="Companhia"
              value={form.companhia}
              onChange={e => setForm({ ...form, companhia: e.target.value })}
            />
            <input
              className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text placeholder-discord-text-muted focus:outline-none focus:border-discord-brand transition-colors"
              placeholder="Tipo (Auto, Vida...)"
              value={form.tipo}
              onChange={e => setForm({ ...form, tipo: e.target.value })}
            />
            <input
              className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text placeholder-discord-text-muted focus:outline-none focus:border-discord-brand transition-colors"
              placeholder="Bem Segurado"
              value={form.bem_segurado}
              onChange={e => setForm({ ...form, bem_segurado: e.target.value })}
            />
            <div className="flex items-center gap-2">
              <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-discord-green hover:bg-green-600 text-white text-sm font-medium rounded-md transition-colors">
                <IconPlus /> Adicionar
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-discord-light hover:bg-discord-hover text-discord-text text-sm rounded-md transition-colors">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {seguros.map(s => {
          const segurado = segurados.find(sg => sg.id === s.segurado_id)
          const parcelasCount = s.parcelas ? s.parcelas.length : 0
          const pendentes = s.parcelas ? s.parcelas.filter(p => p.status !== 'Pago').length : 0
          return (
            <div key={s.id} className="bg-discord-dark rounded-lg border border-discord-light/50 p-4 hover:border-discord-brand/50 transition-colors group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs text-discord-text-muted">#{s.id}</span>
                  <h3 className="text-white font-semibold">{s.apolice}</h3>
                </div>
                <button
                  onClick={() => excluir(s.id)}
                  className="p-1.5 rounded text-discord-text-muted hover:text-discord-red hover:bg-discord-red/10 transition-colors opacity-0 group-hover:opacity-100"
                  title="Excluir"
                >
                  <IconTrash />
                </button>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2 text-discord-text">
                  <IconUsers />
                  <span>{segurado ? segurado.nome : `ID ${s.segurado_id}`}</span>
                </div>
                {s.companhia && (
                  <p className="text-discord-text-muted"><span className="text-discord-text">Companhia:</span> {s.companhia}</p>
                )}
                {s.tipo && (
                  <p className="text-discord-text-muted"><span className="text-discord-text">Tipo:</span> {s.tipo}</p>
                )}
                {s.bem_segurado && (
                  <p className="text-discord-text-muted"><span className="text-discord-text">Bem:</span> {s.bem_segurado}</p>
                )}
              </div>
              <div className="mt-3 pt-3 border-t border-discord-light/30 flex items-center justify-between">
                <span className="text-xs text-discord-text-muted">{parcelasCount} parcela(s)</span>
                {pendentes > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-discord-yellow/20 text-yellow-400 border border-discord-yellow/30">
                    {pendentes} pendente(s)
                  </span>
                )}
              </div>
            </div>
          )
        })}
        {seguros.length === 0 && (
          <div className="col-span-full text-center py-12 text-discord-text-muted bg-discord-dark rounded-lg border border-discord-light/50">
            Nenhum seguro cadastrado.
          </div>
        )}
      </div>
    </div>
  )
}

// ── Tab Parcelas ─────────────────────────────────────────────────────────────
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
  const totalVencido = parcelas
    .filter(p => p.status !== 'Pago' && p.data_vencimento < hoje)
    .reduce((acc, p) => acc + Number(p.valor), 0)

  const filters = [
    { key: 'Todos', label: 'Todos', count: parcelas.length },
    { key: 'Pendente', label: 'Pendente', count: parcelas.filter(p => p.status !== 'Pago' && p.data_vencimento >= hoje).length },
    { key: 'Vencido', label: 'Vencido', count: parcelas.filter(p => p.status !== 'Pago' && p.data_vencimento < hoje).length },
    { key: 'Pago', label: 'Pago', count: parcelas.filter(p => p.status === 'Pago').length },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Parcelas</h2>
          <p className="text-sm text-discord-text-muted">{parcelas.length} parcela(s)</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-discord-brand hover:bg-discord-brand-hover text-white text-sm font-medium rounded-md transition-colors"
        >
          <IconPlus /> Nova Parcela
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-discord-dark rounded-lg border border-discord-light/50 p-4">
          <p className="text-xs text-discord-text-muted uppercase tracking-wider mb-1">Em Aberto</p>
          <p className="text-2xl font-bold text-discord-yellow">R$ {totalPendente.toFixed(2)}</p>
        </div>
        <div className="bg-discord-dark rounded-lg border border-discord-light/50 p-4">
          <p className="text-xs text-discord-text-muted uppercase tracking-wider mb-1">Vencido</p>
          <p className="text-2xl font-bold text-discord-red">R$ {totalVencido.toFixed(2)}</p>
        </div>
        <div className="bg-discord-dark rounded-lg border border-discord-light/50 p-4">
          <p className="text-xs text-discord-text-muted uppercase tracking-wider mb-1">Total Pago</p>
          <p className="text-2xl font-bold text-discord-green">R$ {totalPago.toFixed(2)}</p>
        </div>
      </div>

      {/* Form Card */}
      {showForm && (
        <div className="bg-discord-dark rounded-lg border border-discord-light/50 p-5">
          <h3 className="text-base font-semibold text-white mb-4">Adicionar Parcela</h3>
          <form onSubmit={adicionar} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <select
              className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text focus:outline-none focus:border-discord-brand transition-colors"
              value={form.seguro_id}
              onChange={e => setForm({ ...form, seguro_id: e.target.value })}
            >
              <option value="">Selecione o Seguro *</option>
              {seguros.map(s => <option key={s.id} value={s.id}>#{s.id} — {s.apolice} ({s.companhia})</option>)}
            </select>
            <input
              className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text focus:outline-none focus:border-discord-brand transition-colors"
              type="date"
              value={form.data_vencimento}
              onChange={e => setForm({ ...form, data_vencimento: e.target.value })}
            />
            <input
              className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text placeholder-discord-text-muted focus:outline-none focus:border-discord-brand transition-colors"
              placeholder="Valor (R$) *"
              value={form.valor}
              onChange={e => setForm({ ...form, valor: e.target.value })}
            />
            <div className="flex items-center gap-2">
              <select
                className="bg-discord-darker border border-discord-light rounded-md px-3 py-2 text-sm text-discord-text focus:outline-none focus:border-discord-brand transition-colors"
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
              >
                <option>Pendente</option><option>Pago</option><option>Vencido</option>
              </select>
              <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-discord-green hover:bg-green-600 text-white text-sm font-medium rounded-md transition-colors whitespace-nowrap">
                <IconPlus /> Adicionar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFiltro(f.key)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filtro === f.key
                ? 'bg-discord-brand text-white'
                : 'bg-discord-dark text-discord-text-muted hover:bg-discord-hover hover:text-discord-text'
            }`}
          >
            {f.label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              filtro === f.key ? 'bg-white/20' : 'bg-discord-light'
            }`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-discord-dark rounded-lg border border-discord-light/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-discord-light/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-discord-text-muted uppercase tracking-wider">Seguro</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-discord-text-muted uppercase tracking-wider">Vencimento</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-discord-text-muted uppercase tracking-wider">Valor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-discord-text-muted uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-discord-text-muted uppercase tracking-wider">Data Pagamento</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-discord-text-muted uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-discord-light/30">
              {parcelasFiltradas.map(p => (
                <tr key={p.id} className="hover:bg-discord-hover/50 transition-colors group">
                  <td className="px-4 py-3 text-discord-text font-mono text-xs">#{p.seguro_id}</td>
                  <td className="px-4 py-3 text-discord-text">{p.data_vencimento}</td>
                  <td className="px-4 py-3 text-white font-semibold">R$ {Number(p.valor).toFixed(2)}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3 text-discord-text-muted">{p.data_pagamento || '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {p.status !== 'Pago' && (
                        <button
                          onClick={() => marcarPago(p)}
                          className="p-1.5 rounded text-discord-text-muted hover:text-discord-green hover:bg-discord-green/10 transition-colors"
                          title="Marcar como Pago"
                        >
                          <IconCheck />
                        </button>
                      )}
                      <button
                        onClick={() => excluir(p.id)}
                        className="p-1.5 rounded text-discord-text-muted hover:text-discord-red hover:bg-discord-red/10 transition-colors"
                        title="Excluir"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {parcelasFiltradas.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-discord-text-muted">
                    Nenhuma parcela encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── App Principal ────────────────────────────────────────────────────────────
export default function Home() {
  const [tab, setTab] = useState('segurados')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const navItems = [
    { key: 'segurados', label: 'Clientes', icon: <IconUsers /> },
    { key: 'seguros', label: 'Seguros', icon: <IconShield /> },
    { key: 'parcelas', label: 'Parcelas', icon: <IconCash /> },
  ]

  return (
    <div className="flex h-screen bg-discord-main text-discord-text">
      {/* Sidebar */}
      <aside className={`flex flex-col bg-discord-dark border-r border-discord-darker transition-all ${sidebarCollapsed ? 'w-[72px]' : 'w-60'}`}>
        {/* Logo */}
        <div className="h-12 flex items-center px-4 border-b border-discord-darker shadow-sm">
          {!sidebarCollapsed && (
            <h1 className="text-base font-bold text-white truncate">Controle de Boletos</h1>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-1 rounded text-discord-text-muted hover:text-white transition-colors ${sidebarCollapsed ? 'mx-auto' : 'ml-auto'}`}
            title={sidebarCollapsed ? 'Expandir' : 'Recolher'}
          >
            <svg className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Category */}
        {!sidebarCollapsed && (
          <div className="px-4 pt-4 pb-1">
            <p className="text-[11px] font-bold text-discord-text-muted uppercase tracking-wider">Gerenciamento</p>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 px-2 py-2 space-y-0.5">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === item.key
                  ? 'bg-discord-light text-white'
                  : 'text-discord-text-muted hover:bg-discord-hover hover:text-discord-text'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span className={tab === item.key ? 'text-white' : ''}>{item.icon}</span>
              {!sidebarCollapsed && item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-discord-darker">
          <div className={`flex items-center gap-2 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-discord-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              CB
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">Corretor</p>
                <p className="text-[11px] text-discord-green">Online</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-12 flex items-center px-4 border-b border-discord-darker shadow-sm bg-discord-main">
          <div className="flex items-center gap-2 text-discord-text-muted">
            {navItems.find(n => n.key === tab)?.icon}
            <span className="text-white font-semibold">{navItems.find(n => n.key === tab)?.label}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-discord-text-muted">Sistema de controle de seguros e parcelas</span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'segurados' && <SeguradosTab />}
          {tab === 'seguros' && <SegurosTab />}
          {tab === 'parcelas' && <ParcelasTab />}
        </div>
      </main>
    </div>
  )
}

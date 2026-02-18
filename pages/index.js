import { useEffect, useState } from 'react'

const styles = {
  container: { padding: '24px', fontFamily: 'Arial, sans-serif', maxWidth: '1100px', margin: '0 auto', background: '#f5f7fa', minHeight: '100vh' },
  header: { background: '#1a3c5e', color: '#fff', padding: '16px 24px', borderRadius: '8px', marginBottom: '24px' },
  card: { background: '#fff', borderRadius: '8px', padding: '20px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  h2: { margin: '0 0 16px 0', color: '#1a3c5e', fontSize: '18px' },
  input: { padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', marginRight: '8px', marginBottom: '8px', fontSize: '14px', minWidth: '160px' },
  btn: { padding: '8px 16px', background: '#1a3c5e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', marginRight: '8px' },
  btnDanger: { padding: '6px 12px', background: '#e53935', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
  btnSuccess: { padding: '6px 12px', background: '#2e7d32', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', marginRight: '6px' },
  btnSecondary: { padding: '6px 12px', background: '#546e7a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', marginRight: '6px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
  th: { background: '#e8edf2', padding: '10px 12px', textAlign: 'left', fontWeight: '600', color: '#333', borderBottom: '2px solid #ccc' },
  td: { padding: '9px 12px', borderBottom: '1px solid #eee', verticalAlign: 'middle' },
  badge: (status) => ({
    padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600',
    background: status === 'Pago' ? '#c8e6c9' : status === 'Vencido' ? '#ffcdd2' : '#fff9c4',
    color: status === 'Pago' ? '#2e7d32' : status === 'Vencido' ? '#c62828' : '#f57f17'
  }),
  select: { padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', marginRight: '8px', marginBottom: '8px', fontSize: '14px' },
  tabBar: { display: 'flex', gap: '8px', marginBottom: '20px' },
  tab: (active) => ({
    padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: active ? '700' : '400',
    background: active ? '#1a3c5e' : '#dce3ea', color: active ? '#fff' : '#333'
  })
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
    <div>
      <div style={styles.card}>
        <h2 style={styles.h2}>Adicionar Cliente</h2>
        <form onSubmit={adicionar}>
          <input style={styles.input} placeholder="Nome *" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
          <input style={styles.input} placeholder="WhatsApp" value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} />
          <input style={styles.input} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input style={styles.input} placeholder="CPF" value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value })} />
          <select style={styles.select} value={form.forma_pagamento} onChange={e => setForm({ ...form, forma_pagamento: e.target.value })}>
            <option>Boleto</option><option>PIX</option><option>Cartão</option><option>Débito Automático</option>
          </select>
          <button style={styles.btn} type="submit">Adicionar</button>
        </form>
      </div>

      <div style={styles.card}>
        <h2 style={styles.h2}>Clientes Cadastrados</h2>
        {loading && <p>Carregando...</p>}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>WhatsApp</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>CPF</th>
              <th style={styles.th}>Pagamento</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {segurados.map(s => (
              <>
                <tr key={s.id}>
                  {editId === s.id ? (
                    <>
                      <td style={styles.td}><input style={{ ...styles.input, marginBottom: 0 }} value={editForm.nome || ''} onChange={e => setEditForm({ ...editForm, nome: e.target.value })} /></td>
                      <td style={styles.td}><input style={{ ...styles.input, marginBottom: 0 }} value={editForm.whatsapp || ''} onChange={e => setEditForm({ ...editForm, whatsapp: e.target.value })} /></td>
                      <td style={styles.td}><input style={{ ...styles.input, marginBottom: 0 }} value={editForm.email || ''} onChange={e => setEditForm({ ...editForm, email: e.target.value })} /></td>
                      <td style={styles.td}><input style={{ ...styles.input, marginBottom: 0 }} value={editForm.cpf || ''} onChange={e => setEditForm({ ...editForm, cpf: e.target.value })} /></td>
                      <td style={styles.td}>
                        <select style={{ ...styles.select, marginBottom: 0 }} value={editForm.forma_pagamento || ''} onChange={e => setEditForm({ ...editForm, forma_pagamento: e.target.value })}>
                          <option>Boleto</option><option>PIX</option><option>Cartão</option><option>Débito Automático</option>
                        </select>
                      </td>
                      <td style={styles.td}>
                        <button style={styles.btnSuccess} onClick={() => salvarEdicao(s.id)}>Salvar</button>
                        <button style={styles.btnSecondary} onClick={() => setEditId(null)}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={styles.td}><strong>{s.nome}</strong></td>
                      <td style={styles.td}>{s.whatsapp}</td>
                      <td style={styles.td}>{s.email}</td>
                      <td style={styles.td}>{s.cpf}</td>
                      <td style={styles.td}>{s.forma_pagamento}</td>
                      <td style={styles.td}>
                        <button style={styles.btnSecondary} onClick={() => verDetalhe(s.id)}>Seguros</button>
                        <button style={{ ...styles.btnSecondary, marginRight: '6px' }} onClick={() => { setEditId(s.id); setEditForm(s) }}>Editar</button>
                        <button style={styles.btnDanger} onClick={() => excluir(s.id)}>Excluir</button>
                      </td>
                    </>
                  )}
                </tr>
                {detalheId === s.id && detalhe && (
                  <tr key={`det-${s.id}`}>
                    <td colSpan={6} style={{ ...styles.td, background: '#f0f4f8', padding: '16px' }}>
                      <strong>Seguros de {detalhe.nome}</strong>
                      {detalhe.seguros && detalhe.seguros.length === 0 && <p>Nenhum seguro cadastrado.</p>}
                      {detalhe.seguros && detalhe.seguros.map(seg => (
                        <div key={seg.id} style={{ background: '#fff', borderRadius: '6px', padding: '12px', marginTop: '8px', border: '1px solid #ddd' }}>
                          <div><strong>Apólice:</strong> {seg.apolice} | <strong>Companhia:</strong> {seg.companhia} | <strong>Tipo:</strong> {seg.tipo} | <strong>Bem:</strong> {seg.bem_segurado}</div>
                          <div style={{ marginTop: '8px' }}>
                            <strong>Parcelas:</strong>
                            {seg.parcelas && seg.parcelas.length === 0 && <span> Nenhuma</span>}
                            {seg.parcelas && seg.parcelas.map(p => (
                              <span key={p.id} style={{ marginLeft: '8px', ...styles.badge(p.status) }}>
                                {p.data_vencimento} — R$ {Number(p.valor).toFixed(2)} ({p.status})
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Tab Seguros ──────────────────────────────────────────────────────────────
function SegurosTab() {
  const [seguros, setSeguros] = useState([])
  const [segurados, setSegurados] = useState([])
  const [form, setForm] = useState({ segurado_id: '', companhia: '', tipo: '', apolice: '', bem_segurado: '' })

  useEffect(() => {
    fetch('/api/seguros').then(r => r.json()).then(d => setSeguros(d || []))
    fetch('/api/segurados').then(r => r.json()).then(d => setSegurados(d || []))
  }, [])

  async function adicionar(e) {
    e.preventDefault()
    if (!form.segurado_id || !form.apolice) return alert('Segurado e Apólice são obrigatórios')
    await fetch('/api/seguros', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, segurado_id: parseInt(form.segurado_id) }) })
    setForm({ segurado_id: '', companhia: '', tipo: '', apolice: '', bem_segurado: '' })
    fetch('/api/seguros').then(r => r.json()).then(d => setSeguros(d || []))
  }

  async function excluir(id) {
    if (!confirm('Excluir este seguro?')) return
    await fetch(`/api/seguros/${id}`, { method: 'DELETE' })
    fetch('/api/seguros').then(r => r.json()).then(d => setSeguros(d || []))
  }

  return (
    <div>
      <div style={styles.card}>
        <h2 style={styles.h2}>Adicionar Seguro</h2>
        <form onSubmit={adicionar}>
          <select style={styles.select} value={form.segurado_id} onChange={e => setForm({ ...form, segurado_id: e.target.value })}>
            <option value="">Selecione o cliente *</option>
            {segurados.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
          </select>
          <input style={styles.input} placeholder="Apólice *" value={form.apolice} onChange={e => setForm({ ...form, apolice: e.target.value })} />
          <input style={styles.input} placeholder="Companhia" value={form.companhia} onChange={e => setForm({ ...form, companhia: e.target.value })} />
          <input style={styles.input} placeholder="Tipo (Auto, Vida...)" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} />
          <input style={styles.input} placeholder="Bem Segurado" value={form.bem_segurado} onChange={e => setForm({ ...form, bem_segurado: e.target.value })} />
          <button style={styles.btn} type="submit">Adicionar</button>
        </form>
      </div>

      <div style={styles.card}>
        <h2 style={styles.h2}>Seguros Cadastrados</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Cliente</th>
              <th style={styles.th}>Apólice</th>
              <th style={styles.th}>Companhia</th>
              <th style={styles.th}>Tipo</th>
              <th style={styles.th}>Bem Segurado</th>
              <th style={styles.th}>Parcelas</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {seguros.map(s => {
              const segurado = segurados.find(sg => sg.id === s.segurado_id)
              return (
                <tr key={s.id}>
                  <td style={styles.td}>{s.id}</td>
                  <td style={styles.td}>{segurado ? segurado.nome : s.segurado_id}</td>
                  <td style={styles.td}>{s.apolice}</td>
                  <td style={styles.td}>{s.companhia}</td>
                  <td style={styles.td}>{s.tipo}</td>
                  <td style={styles.td}>{s.bem_segurado}</td>
                  <td style={styles.td}>{s.parcelas ? s.parcelas.length : 0}</td>
                  <td style={styles.td}><button style={styles.btnDanger} onClick={() => excluir(s.id)}>Excluir</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
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

  return (
    <div>
      <div style={styles.card}>
        <h2 style={styles.h2}>Adicionar Parcela</h2>
        <form onSubmit={adicionar}>
          <select style={styles.select} value={form.seguro_id} onChange={e => setForm({ ...form, seguro_id: e.target.value })}>
            <option value="">Selecione o Seguro *</option>
            {seguros.map(s => <option key={s.id} value={s.id}>#{s.id} — {s.apolice} ({s.companhia})</option>)}
          </select>
          <input style={styles.input} type="date" value={form.data_vencimento} onChange={e => setForm({ ...form, data_vencimento: e.target.value })} />
          <input style={styles.input} placeholder="Valor (R$) *" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} />
          <select style={styles.select} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option>Pendente</option><option>Pago</option><option>Vencido</option>
          </select>
          <button style={styles.btn} type="submit">Adicionar</button>
        </form>
      </div>

      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ ...styles.h2, marginBottom: 0 }}>Parcelas</h2>
          <span style={{ fontSize: '14px', color: '#c62828', fontWeight: '600' }}>Total em Aberto: R$ {totalPendente.toFixed(2)}</span>
        </div>
        <div style={{ marginBottom: '12px' }}>
          {['Todos', 'Pendente', 'Vencido', 'Pago'].map(f => (
            <button key={f} style={{ ...styles.tab(filtro === f), marginRight: '8px' }} onClick={() => setFiltro(f)}>{f}</button>
          ))}
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Seguro ID</th>
              <th style={styles.th}>Vencimento</th>
              <th style={styles.th}>Valor</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Data Pagamento</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {parcelasFiltradas.map(p => (
              <tr key={p.id}>
                <td style={styles.td}>{p.seguro_id}</td>
                <td style={styles.td}>{p.data_vencimento}</td>
                <td style={styles.td}>R$ {Number(p.valor).toFixed(2)}</td>
                <td style={styles.td}><span style={styles.badge(p.status)}>{p.status}</span></td>
                <td style={styles.td}>{p.data_pagamento || '—'}</td>
                <td style={styles.td}>
                  {p.status !== 'Pago' && <button style={styles.btnSuccess} onClick={() => marcarPago(p)}>✓ Pago</button>}
                  <button style={styles.btnDanger} onClick={() => excluir(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
            {parcelasFiltradas.length === 0 && (
              <tr><td colSpan={6} style={{ ...styles.td, textAlign: 'center', color: '#888' }}>Nenhuma parcela encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── App Principal ──────────────────────────────────────────────────────────────
export default function Home() {
  const [tab, setTab] = useState('segurados')

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ margin: 0, fontSize: '22px' }}>🗂️ Controle de Boletos</h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.8 }}>Sistema de controle de seguros e parcelas</p>
      </div>

      <div style={styles.tabBar}>
        <button style={styles.tab(tab === 'segurados')} onClick={() => setTab('segurados')}>👤 Clientes</button>
        <button style={styles.tab(tab === 'seguros')} onClick={() => setTab('seguros')}>📋 Seguros</button>
        <button style={styles.tab(tab === 'parcelas')} onClick={() => setTab('parcelas')}>💰 Parcelas</button>
      </div>

      {tab === 'segurados' && <SeguradosTab />}
      {tab === 'seguros' && <SegurosTab />}
      {tab === 'parcelas' && <ParcelasTab />}
    </div>
  )
}

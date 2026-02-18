import { getServiceSupabase } from '../../../lib/supabaseClient'

export default async function handler(req, res) {
  const supabase = getServiceSupabase()

  try {
    if (req.method === 'GET') {
      const { seguro_id } = req.query
      let query = supabase
        .from('parcelas')
        .select('*')
        .order('data_vencimento', { ascending: true })
      if (seguro_id) query = query.eq('seguro_id', seguro_id)
      const { data, error } = await query
      if (error) return res.status(500).json({ error: error.message })
      return res.status(200).json(data)
    }

    if (req.method === 'POST') {
      const { seguro_id, data_vencimento, valor, status, data_aviso, data_pagamento } = req.body
      if (!seguro_id || !data_vencimento || !valor) {
        return res.status(400).json({ error: 'seguro_id, data_vencimento e valor são obrigatórios' })
      }
      const { data, error } = await supabase
        .from('parcelas')
        .insert([{ seguro_id, data_vencimento, valor, status: status || 'Pendente', data_aviso: data_aviso || null, data_pagamento: data_pagamento || null }])
        .select()
      if (error) return res.status(500).json({ error: error.message })
      return res.status(201).json(data[0])
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

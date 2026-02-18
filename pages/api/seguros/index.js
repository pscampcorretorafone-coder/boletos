import { getServiceSupabase } from '../../../lib/supabaseClient'

export default async function handler(req, res) {
  const supabase = getServiceSupabase()

  try {
    if (req.method === 'GET') {
      const { segurado_id } = req.query
      let query = supabase.from('seguros').select('*, parcelas(*)').order('id', { ascending: true })
      if (segurado_id) query = query.eq('segurado_id', segurado_id)
      const { data, error } = await query
      if (error) return res.status(500).json({ error: error.message })
      return res.status(200).json(data)
    }

    if (req.method === 'POST') {
      const { segurado_id, companhia, tipo, apolice, bem_segurado } = req.body
      if (!segurado_id || !apolice) return res.status(400).json({ error: 'segurado_id e apolice são obrigatórios' })
      const { data, error } = await supabase
        .from('seguros')
        .insert([{ segurado_id, companhia: companhia || '', tipo: tipo || '', apolice, bem_segurado: bem_segurado || '' }])
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

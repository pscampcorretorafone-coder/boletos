import { getServiceSupabase } from '../../../lib/supabaseClient'

export default async function handler(req, res) {
  const supabase = getServiceSupabase()
  const { id } = req.query

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('segurados')
        .select('*, seguros(*, parcelas(*))')
        .eq('id', id)
        .single()
      if (error) return res.status(500).json({ error: error.message })
      return res.status(200).json(data)
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const body = req.body
      const { data, error } = await supabase
        .from('segurados')
        .update(body)
        .eq('id', id)
        .select()
      if (error) return res.status(500).json({ error: error.message })
      return res.status(200).json(data[0])
    }

    if (req.method === 'DELETE') {
      const { error } = await supabase.from('segurados').delete().eq('id', id)
      if (error) return res.status(500).json({ error: error.message })
      return res.status(204).end()
    }

    res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

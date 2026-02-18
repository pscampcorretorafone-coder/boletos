import { getServiceSupabase } from '../../../lib/supabaseClient'

export default async function handler(req, res) {
  const supabase = getServiceSupabase()

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('segurados')
        .select('*')
        .order('nome', { ascending: true })
      if (error) return res.status(500).json({ error: error.message })
      return res.status(200).json(data)
    }

    if (req.method === 'POST') {
      const { nome, whatsapp, email, cpf, forma_pagamento } = req.body
      if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' })
      const { data, error } = await supabase
        .from('segurados')
        .insert([{ nome, whatsapp: whatsapp || '', email: email || '', cpf: cpf || '', forma_pagamento: forma_pagamento || 'Boleto' }])
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

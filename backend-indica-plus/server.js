// INDICA+ — API básica (MVP)
//
// IMPORTANTE: isto é um ponto de partida funcional, não uma API de produção.
// Antes de ir ao ar com usuários e dinheiro de verdade, ainda faltam:
//   - Trocar o armazenamento em memória por um banco real (ver schema.sql)
//   - Hash de senha de verdade (ex: bcrypt) + JWT com expiração/refresh
//   - Integração real de PIX (provedor de pagamentos homologado)
//   - Regras de antifraude (limite de indicações, checagem de IP/dispositivo,
//     bloqueio de contas duplicadas) antes de liberar qualquer saque
//   - Painel administrativo com permissões por tipo de usuário

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// ---- "Banco de dados" em memória (trocar por Postgres/MySQL usando schema.sql) ----
let nextId = { oportunidade: 4, indicacao: 1, saque: 1 }

const db = {
  usuarios: [
    { id: 1, nome: 'Você', email: 'voce@exemplo.com', tipo: 'indicador', nivel: 'Ouro', pontos: 2870 }
  ],
  oportunidades: [
    { id: 1, empresa: 'Nexus Tech', titulo: 'Indique clientes para planos de internet fibra', categoria: 'Tecnologia', comissao_valor: 80, comissao_tipo: 'fixo', vagas_restantes: 12, status: 'ativa' },
    { id: 2, empresa: 'Imóveis Horizonte', titulo: 'Indicações para compra de apartamentos', categoria: 'Imóveis', comissao_valor: 0.5, comissao_tipo: 'percentual', vagas_restantes: 5, status: 'ativa' },
    { id: 3, empresa: 'AgroMais', titulo: 'Indique produtores rurais para maquinário', categoria: 'Agro', comissao_valor: 300, comissao_tipo: 'fixo', vagas_restantes: 8, status: 'ativa' }
  ],
  indicacoes: [],
  carteira: { 1: { saldo_disponivel: 420, saldo_pendente: 180, total_recebido: 1560 } },
  saques: []
}

// ---- Auth (STUB — trocar por autenticação real antes de produção) ----
app.post('/auth/login', (req, res) => {
  const { email } = req.body
  const usuario = db.usuarios.find((u) => u.email === email) || db.usuarios[0]
  res.json({ token: 'token-de-demonstracao', usuario })
})

// ---- Oportunidades ----
app.get('/oportunidades', (req, res) => {
  const { categoria } = req.query
  let lista = db.oportunidades.filter((o) => o.status === 'ativa')
  if (categoria) lista = lista.filter((o) => o.categoria === categoria)
  res.json(lista)
})

app.get('/oportunidades/:id', (req, res) => {
  const op = db.oportunidades.find((o) => o.id === Number(req.params.id))
  if (!op) return res.status(404).json({ erro: 'Oportunidade não encontrada' })
  res.json(op)
})

// Empresa cria oportunidade
app.post('/oportunidades', (req, res) => {
  const { empresa, titulo, categoria, comissao_valor, comissao_tipo, vagas_totais } = req.body
  const nova = {
    id: nextId.oportunidade++,
    empresa, titulo, categoria, comissao_valor, comissao_tipo,
    vagas_restantes: vagas_totais,
    status: 'ativa'
  }
  db.oportunidades.push(nova)
  res.status(201).json(nova)
})

// ---- Indicações ----
app.post('/indicacoes', (req, res) => {
  const { oportunidade_id, indicador_id, lead_nome, lead_telefone, lead_email } = req.body

  const oportunidade = db.oportunidades.find((o) => o.id === oportunidade_id)
  if (!oportunidade) return res.status(404).json({ erro: 'Oportunidade não encontrada' })
  if (oportunidade.vagas_restantes <= 0) return res.status(400).json({ erro: 'Sem vagas restantes' })

  // TODO antifraude: checar duplicidade de lead_email/lead_telefone nesta oportunidade
  const nova = {
    id: nextId.indicacao++,
    oportunidade_id, indicador_id, lead_nome, lead_telefone, lead_email,
    status: 'Indicação enviada',
    criado_em: new Date().toISOString()
  }
  db.indicacoes.push(nova)
  oportunidade.vagas_restantes -= 1
  res.status(201).json(nova)
})

app.get('/indicacoes/indicador/:indicadorId', (req, res) => {
  const lista = db.indicacoes.filter((i) => i.indicador_id === Number(req.params.indicadorId))
  res.json(lista)
})

// Empresa atualiza o status de uma indicação (ex: confirmar venda)
app.patch('/indicacoes/:id/status', (req, res) => {
  const { status } = req.body
  const indicacao = db.indicacoes.find((i) => i.id === Number(req.params.id))
  if (!indicacao) return res.status(404).json({ erro: 'Indicação não encontrada' })

  indicacao.status = status
  indicacao.atualizado_em = new Date().toISOString()

  // Quando a venda é confirmada, credita a comissão como saldo pendente
  if (status === 'Venda confirmada') {
    const oportunidade = db.oportunidades.find((o) => o.id === indicacao.oportunidade_id)
    const valor = oportunidade?.comissao_tipo === 'fixo' ? oportunidade.comissao_valor : 0 // TODO: calcular % sobre valor da venda real
    const carteira = db.carteira[indicacao.indicador_id] ||= { saldo_disponivel: 0, saldo_pendente: 0, total_recebido: 0 }
    carteira.saldo_pendente += valor
  }

  res.json(indicacao)
})

// ---- Carteira ----
app.get('/carteira/:usuarioId', (req, res) => {
  const carteira = db.carteira[req.params.usuarioId] || { saldo_disponivel: 0, saldo_pendente: 0, total_recebido: 0 }
  res.json(carteira)
})

// Solicitar saque PIX (STUB — não processa pagamento real)
app.post('/saques', (req, res) => {
  const { usuario_id, valor, chave_pix } = req.body
  const carteira = db.carteira[usuario_id]
  if (!carteira || carteira.saldo_disponivel < valor) {
    return res.status(400).json({ erro: 'Saldo insuficiente' })
  }

  carteira.saldo_disponivel -= valor
  const saque = {
    id: nextId.saque++,
    usuario_id, valor, chave_pix,
    status: 'em_analise', // TODO: integrar com provedor de PIX real e aprovação manual/automática
    criado_em: new Date().toISOString()
  }
  db.saques.push(saque)
  res.status(201).json(saque)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`INDICA+ API rodando em http://localhost:${PORT}`))

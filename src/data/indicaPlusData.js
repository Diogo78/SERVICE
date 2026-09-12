export const ipCategories = [
  'Eventos', 'Tecnologia', 'Games', 'Marketing', 'Serviços',
  'Agro', 'Imóveis', 'Educação', 'Automotivo', 'Comércio', 'Outros'
]

export const ipOpportunities = [
  {
    id: 1,
    empresa: 'Nexus Tech',
    titulo: 'Indique clientes para planos de internet fibra',
    categoria: 'Tecnologia',
    comissao: 'R$ 80 por venda confirmada',
    vagas: 12,
    descricao: 'Indique pessoas interessadas em contratar internet fibra. Comissão paga após instalação confirmada.'
  },
  {
    id: 2,
    empresa: 'Imóveis Horizonte',
    titulo: 'Indicações para compra de apartamentos',
    categoria: 'Imóveis',
    comissao: '0,5% sobre o valor da venda',
    vagas: 5,
    descricao: 'Indique compradores qualificados. Comissão liberada após assinatura do contrato.'
  },
  {
    id: 3,
    empresa: 'AgroMais',
    titulo: 'Indique produtores rurais para maquinário',
    categoria: 'Agro',
    comissao: 'R$ 300 por venda',
    vagas: 8,
    descricao: 'Rede de contatos no agronegócio? Indique produtores interessados em maquinário agrícola.'
  }
]

export const ipMyReferrals = [
  { id: 1, oportunidade: 'Indique clientes para planos de internet fibra', status: 'Em negociação', data: '10/09' },
  { id: 2, oportunidade: 'Indicações para compra de apartamentos', status: 'Venda confirmada', data: '02/09' },
  { id: 3, oportunidade: 'Indique produtores rurais para maquinário', status: 'Comissão paga', data: '28/08' }
]

export const ipStatusOrder = [
  'Indicação enviada', 'Lead recebido', 'Em contato', 'Em negociação',
  'Venda confirmada', 'Comissão liberada', 'Comissão paga', 'Indicação recusada'
]

export const ipWallet = {
  saldoDisponivel: 420.0,
  saldoPendente: 180.0,
  totalRecebido: 1560.0,
  transacoes: [
    { id: 1, tipo: 'Comissão paga', valor: 300.0, data: '28/08' },
    { id: 2, tipo: 'Saque PIX', valor: -200.0, data: '30/08' },
    { id: 3, tipo: 'Comissão liberada', valor: 80.0, data: '10/09' }
  ]
}

export const ipRanking = {
  geral: [
    { nome: 'Marina S.', nivel: 'Elite', pontos: 4200 },
    { nome: 'Você', nivel: 'Ouro', pontos: 2870 },
    { nome: 'Pedro L.', nivel: 'Ouro', pontos: 2510 }
  ]
}

export const ipLevels = ['Bronze', 'Prata', 'Ouro', 'Elite']

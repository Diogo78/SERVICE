-- Schema relacional do INDICA+ (MVP)
-- Pensado para Postgres/MySQL. Ajuste tipos conforme o banco escolhido.

CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telefone TEXT,
  senha_hash TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('indicador', 'empresa', 'admin')),
  nivel TEXT DEFAULT 'Bronze' CHECK (nivel IN ('Bronze', 'Prata', 'Ouro', 'Elite')),
  pontos INTEGER DEFAULT 0,
  email_verificado INTEGER DEFAULT 0,
  telefone_verificado INTEGER DEFAULT 0,
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE empresas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  razao_social TEXT NOT NULL,
  cnpj TEXT UNIQUE,
  plano TEXT DEFAULT 'FREE' CHECK (plano IN ('FREE', 'PRO', 'BUSINESS')),
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE oportunidades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  empresa_id INTEGER NOT NULL REFERENCES empresas(id),
  titulo TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT NOT NULL,
  comissao_tipo TEXT CHECK (comissao_tipo IN ('fixo', 'percentual')),
  comissao_valor REAL NOT NULL,
  vagas_totais INTEGER NOT NULL,
  vagas_restantes INTEGER NOT NULL,
  patrocinada INTEGER DEFAULT 0,
  status TEXT DEFAULT 'ativa' CHECK (status IN ('ativa', 'pausada', 'encerrada')),
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE indicacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  oportunidade_id INTEGER NOT NULL REFERENCES oportunidades(id),
  indicador_id INTEGER NOT NULL REFERENCES usuarios(id),
  lead_nome TEXT NOT NULL,
  lead_telefone TEXT,
  lead_email TEXT,
  status TEXT DEFAULT 'Indicação enviada' CHECK (status IN (
    'Indicação enviada', 'Lead recebido', 'Em contato', 'Em negociação',
    'Venda confirmada', 'Comissão liberada', 'Comissão paga', 'Indicação recusada'
  )),
  ip_origem TEXT,
  dispositivo TEXT,
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comissoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  indicacao_id INTEGER NOT NULL REFERENCES indicacoes(id),
  indicador_id INTEGER NOT NULL REFERENCES usuarios(id),
  valor REAL NOT NULL,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'liberada', 'paga')),
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carteira_transacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  tipo TEXT NOT NULL,
  valor REAL NOT NULL,
  referencia_id INTEGER,
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE saques (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  valor REAL NOT NULL,
  chave_pix TEXT NOT NULL,
  status TEXT DEFAULT 'em_analise' CHECK (status IN ('em_analise', 'aprovado', 'pago', 'recusado')),
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE denuncias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER REFERENCES usuarios(id),
  indicacao_id INTEGER REFERENCES indicacoes(id),
  motivo TEXT NOT NULL,
  status TEXT DEFAULT 'aberta' CHECK (status IN ('aberta', 'em_analise', 'resolvida')),
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE logs_alteracoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER REFERENCES usuarios(id),
  entidade TEXT NOT NULL,
  entidade_id INTEGER,
  acao TEXT NOT NULL,
  criado_em TEXT DEFAULT CURRENT_TIMESTAMP
);

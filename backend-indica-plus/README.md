# INDICA+ — Backend (ponto de partida)

## O que isto é
Uma API funcional básica pra você já ter algo rodando: criar oportunidades,
enviar indicações, mudar status, ver carteira e pedir saque. Os dados ficam
em memória (somem quando o servidor reinicia) — é só pra testar o fluxo.

## O que NÃO está pronto (e precisa antes de ir ao ar de verdade)
- **Banco de dados real**: use `schema.sql` como referência e troque os
  arrays em memória do `server.js` por Postgres/MySQL + um ORM (Prisma,
  Sequelize etc).
- **Autenticação de verdade**: login/senha com hash (bcrypt) e JWT com
  expiração. Hoje o login é um placeholder que sempre "loga" o mesmo usuário.
- **PIX real**: pedir saque hoje só desconta o saldo e marca "em análise" —
  não movimenta dinheiro. Isso exige integrar com um provedor de pagamentos
  homologado para PIX (ex: Mercado Pago, Pagar.me, Efí) e ter processo de
  aprovação/compliance.
- **Antifraude**: os pontos marcados como `TODO antifraude` no código são
  onde entram as checagens de indicação duplicada, limite por usuário,
  validação de telefone/e-mail e registro de IP/dispositivo.
- **Painel administrativo**: rotas de admin (usuários, denúncias, relatórios)
  ainda não existem.

## Como rodar
```
cd backend-indica-plus
npm install
npm start
```
A API sobe em `http://localhost:3001`.

## Rotas disponíveis
- `POST /auth/login` — login (placeholder)
- `GET /oportunidades` — lista oportunidades (filtro opcional `?categoria=`)
- `POST /oportunidades` — empresa cria uma oportunidade
- `POST /indicacoes` — indicador envia uma indicação
- `GET /indicacoes/indicador/:id` — indicações de um indicador
- `PATCH /indicacoes/:id/status` — empresa atualiza o status (ex: confirmar venda)
- `GET /carteira/:usuarioId` — saldo do usuário
- `POST /saques` — solicitar saque (não processa PIX de verdade ainda)

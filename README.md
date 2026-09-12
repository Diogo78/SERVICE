# Servico App (protótipo)

Protótipo funcional do marketplace de serviços — web hoje, com estrutura pronta
para depois virar app de celular (ex: com Capacitor ou React Native).

## Como rodar no seu computador

Pré-requisitos: ter o **Node.js** instalado (versão 18 ou mais recente).
Baixe em: https://nodejs.org

1. Extraia esta pasta em qualquer lugar do seu computador.
2. Abra o terminal dentro da pasta `servico-app`.
3. Instale as dependências (só precisa fazer isso uma vez):

   ```
   npm install
   ```

4. Rode o projeto:

   ```
   npm run dev
   ```

5. O terminal vai mostrar um endereço, algo como `http://localhost:5173`.
   Abra esse endereço no navegador do computador — ou, se quiser testar
   no celular, use o endereço "Network" que aparece no terminal (o celular
   precisa estar na mesma rede Wi-Fi).

## O que já tem

- Tela de busca de serviços com categorias e favoritos
- Tela de detalhes do serviço
- Tela de criar anúncio (formulário)
- Mensagens (lista de conversas + chat)
- Perfil com estatísticas
- Indicações para empresas (aba "Empresas")
- **INDICA+**: marketplace de indicações remuneradas (Início, Explorar
  oportunidades, Minhas indicações, Carteira, Ranking) — veja
  `backend-indica-plus/README.md` para o que ainda falta pra virar produto real

Os dados (serviços, conversas, oportunidades do INDICA+) são fictícios por
enquanto — ainda não tem banco de dados nem backend real conectado ao app.
Existe um esqueleto de backend em `backend-indica-plus/` que já implementa o
fluxo básico (oportunidades, indicações, carteira, saque) com dados em
memória, pra você começar a testar antes de partir pro banco de dados de
verdade.

## Estrutura das pastas

```
src/
  components/     -> cada tela do app
  data/           -> dados fictícios usados no protótipo
  App.jsx         -> controla qual tela aparece
  styles.css      -> cores, fontes e estilos visuais
```

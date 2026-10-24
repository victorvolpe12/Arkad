# Arkad

Controle financeiro pessoal, mês a mês. Compare o que você **orçou** com o que **realizou**, acompanhe dívidas e metas, e saiba o que fazer com o dinheiro que sobra.

Roda direto no navegador, sem servidor, sem cadastro e sem banco de dados. Os dados ficam no seu aparelho e o app pode ser instalado como aplicativo (PWA).

**Acesse:** https://victorvolpe12.github.io/Arkad/

---

## Funcionalidades

**Controle mensal**
- Navegação entre meses por setas (`‹ Outubro 2026 ›`). Ao avançar para um mês novo, o app o cria copiando os itens e os valores orçados do mês anterior e zerando o realizado.
- Cinco seções por mês: **Receitas**, **Despesas**, **Impostos e descontos**, **Investimentos** e **Dívidas**.
- Cada lançamento tem valor **orçado** e **realizado**. Dívidas têm três colunas: **Total**, **Parcela mês** e **Pago**.
- Cards de resumo com barras de progresso e um gráfico de linhas com a evolução mensal de Receitas, Despesas, Investimentos e Dívidas.

**Orçamento**
- Card **Progresso do orçamento**: mostra quanto da receita orçada já foi distribuída e quanto ainda falta orçar.
- Quando a receita realizada passa do orçado, o app avisa quanto é o excedente a alocar. O botão **?** abre uma sugestão de como dividir o dinheiro extra (reserva de emergência, Pote dos Sonhos, Pote de Ouro e suas subdivisões).
- Receita acima do orçado aparece em verde. Despesa acima do orçado, em vermelho.

**Categorias**
- Receitas, Despesas, Impostos e Investimentos podem ser vistos como **lista de lançamentos** ou agrupados por **categoria**, escolhendo por seção.
- Categorias padrão já vêm prontas e é possível criar novas pelo lançamento rápido ou excluir qualquer uma em **Config**. Lançamentos de categorias excluídas continuam existindo e aparecem em "Outros".

**Metas**
- Metas de economia com valor alvo, categoria (Emergência, Viagem, Compra, Investimento, Outro), barra de progresso, quanto falta e histórico de depósitos.

**Lançamento rápido**
- O botão **+** central (celular) ou **Lançamento rápido** (desktop) registra uma despesa, receita, investimento, imposto, dívida ou depósito em meta em poucos toques.

**Configurações**
- Mostrar ou ocultar o gráfico e cada seção do Dashboard.
- Escolher lista ou categorias para cada seção.
- Gerenciar meses e categorias.
- Fazer e restaurar backup.

**Interface**
- Mobile primeiro, com barra de navegação inferior.
- No desktop (a partir de 900 px), barra lateral fixa, e em telas largas as seções ficam em duas colunas.

---

## Seus dados

- Tudo é salvo no **`localStorage` do navegador** (chave `arkadDB_v1`). Nada é enviado para nenhum servidor.
- Cada pessoa que abre o link começa com um mês vazio e vê apenas os próprios dados.
- Os dados ficam presos àquele navegador e aparelho. Limpar os dados do site apaga tudo.
- Para guardar uma cópia ou levar os dados para outro aparelho, use **Config → Baixar backup (.json)** e **Importar backup**. O backup inclui lançamentos, metas, categorias e preferências.

---

## Instalar como aplicativo

O Arkad é um PWA. Abra o link no navegador e use:
- **Android (Chrome):** menu `⋮` → **Instalar app**.
- **iPhone (Safari):** botão de compartilhar → **Adicionar à Tela de Início**.
- **Desktop (Chrome/Edge):** ícone de instalação na barra de endereço.

A instalação exige HTTPS, que o GitHub Pages já fornece.

---

## Rodar localmente

Não há build nem dependências. Para testar com o service worker funcionando, sirva a pasta por HTTP:

```bash
git clone https://github.com/victorvolpe12/Arkad.git
cd Arkad
python3 -m http.server 8080
```

Depois abra `http://localhost:8080`.

Abrir o `index.html` direto do disco também funciona, mas sem o service worker e sem a opção de instalar.

---

## Publicar no GitHub Pages

1. Suba os arquivos na **raiz** do repositório (não dentro de uma subpasta).
2. Vá em **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
4. Aguarde cerca de um minuto. O site fica em `https://seu-usuario.github.io/nome-do-repositorio/`.

Deixe o campo **Custom domain** em branco, a não ser que você tenha um domínio próprio.

> Depois de atualizar o `index.html`, o service worker pode mostrar a versão antiga por uma visita. Recarregue a página uma segunda vez.

---

## Estrutura do projeto

```
.
├── index.html        # o app inteiro (HTML, CSS e JavaScript)
├── manifest.json     # configuração do PWA (nome, cores, ícones)
├── sw.js             # service worker (cache e uso offline)
├── favicon.ico
└── assets/           # ícones do app (192, 512, maskable, apple-touch, favicons)
```

## Tecnologias

HTML, CSS e JavaScript puros, sem frameworks e sem etapa de build. Fontes pelo Google Fonts (Zilla Slab, Inter e IBM Plex Mono). Gráficos em SVG desenhados pelo próprio código.

## Formato dos dados

Útil para quem for editar o backup à mão ou integrar com outra ferramenta:

```json
{
  "meses": {
    "2026-10": {
      "label": "Outubro/26",
      "receitas":      [{ "id": "…", "nome": "Salário", "orcado": 3000, "realizado": 3500, "categoria": "salario" }],
      "despesas":      [],
      "impostos":      [],
      "investimentos": [],
      "dividas":       [{ "id": "…", "nome": "Cartão", "valorTotal": 1200, "orcado": 200, "realizado": 200 }]
    }
  },
  "metas": [
    { "id": "…", "nome": "Reserva de emergência", "valorMeta": 10000, "valorAtual": 2500,
      "tag": "emergencia", "deposits": [{ "id": "…", "valor": 500, "data": "2026-10-01T12:00:00.000Z" }] }
  ],
  "categories": {
    "despesas": [{ "key": "moradia", "label": "Moradia", "icon": "moradia" }]
  },
  "settings": {
    "showChart": true,
    "visibleSections": { "receitas": true, "despesas": true, "impostos": true, "investimentos": true },
    "viewMode":        { "receitas": "lista", "despesas": "categorias", "impostos": "lista", "investimentos": "lista" }
  }
}
```

Em `dividas`, `orcado` é a **parcela do mês** e `realizado` é o valor **pago**.

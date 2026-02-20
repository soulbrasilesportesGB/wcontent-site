# W Content — Site Institucional

> Sports Bring Women Together

## Como subir no GitHub + Vercel

### 1. GitHub
1. Crie um repositório novo em github.com (ex: `wcontent-site`)
2. Faça upload de todos esses arquivos (arraste a pasta inteira)
3. Commit!

### 2. Vercel (deploy gratuito)
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe o repositório do GitHub
4. Clique em "Deploy" — pronto!

Você vai ganhar um link tipo: `wcontent-site.vercel.app`

---

## Estrutura do projeto

```
wcontent-site/
├── index.html          # Entrada HTML
├── package.json        # Dependências
├── vite.config.js      # Config do Vite
└── src/
    ├── main.jsx        # Entry point React
    └── App.jsx         # Todo o site aqui
```

## Para rodar localmente

```bash
npm install
npm run dev
```

---

## Próximos passos (pós-revisão)

- [ ] Atualizar lista real de atletas/clientes
- [ ] Atualizar lista real de marcas parceiras  
- [ ] Adicionar fotos reais nos cards
- [ ] Definir email/WhatsApp de contato
- [ ] Configurar domínio próprio (ex: wcontent.com.br)

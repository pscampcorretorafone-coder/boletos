# Controle de Boletos — Deploy Vercel + Supabase

## Estrutura do Projeto

```
/
├── pages/
│   ├── index.js              ← Interface principal (Clientes, Seguros, Parcelas)
│   ├── _app.js
│   └── api/
│       ├── segurados/
│       │   ├── index.js      ← GET (listar) / POST (criar)
│       │   └── [id].js       ← GET / PATCH / DELETE por ID
│       ├── seguros/
│       │   ├── index.js      ← GET / POST
│       │   └── [id].js       ← GET / PATCH / DELETE
│       └── parcelas/
│           ├── index.js      ← GET / POST
│           └── [id].js       ← GET / PATCH / DELETE
├── lib/
│   └── supabaseClient.js
├── styles/
│   └── globals.css
├── package.json
├── vercel.json
└── .env.example
```

---

## Passo 1 — Criar tabelas no Supabase

Acesse o **SQL Editor** do seu projeto no Supabase e execute:

```sql
create table segurados (
  id serial primary key,
  nome text not null,
  whatsapp text default '',
  email text default '',
  cpf text default '',
  forma_pagamento text default 'Boleto'
);

create table seguros (
  id serial primary key,
  segurado_id integer references segurados(id) on delete cascade,
  companhia text default '',
  tipo text default '',
  apolice text not null,
  bem_segurado text default ''
);

create table parcelas (
  id serial primary key,
  seguro_id integer references seguros(id) on delete cascade,
  data_vencimento date not null,
  valor numeric not null,
  status text default 'Pendente',
  data_aviso date,
  data_pagamento date
);
```

---

## Passo 2 — Deploy na Vercel

### Opção A — Via GitHub (recomendado)
1. Suba este projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) → **New Project** → importe o repositório
3. Na tela de configuração, adicione as **Environment Variables**:

| Variável | Onde encontrar no Supabase |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Settings → API → service_role secret |

4. Clique em **Deploy** — pronto!

### Opção B — Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
# Siga as instruções e configure as env vars quando solicitado
```

---

## Passo 3 — Rodar localmente

```bash
# Instale as dependências
npm install

# Copie o arquivo de exemplo e preencha suas chaves
cp .env.example .env.local

# Rode em desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

---

## Migrar dados do SQLite (opcional)

Se você tem dados no arquivo `.db` antigo, use os scripts Python da raiz:

```powershell
# Windows PowerShell
$env:SUPABASE_URL="https://SEU_PROJETO.supabase.co"
$env:SERVICE_ROLE_KEY="SUA_SERVICE_ROLE_KEY"
python migrate_to_supabase.py
python import_to_supabase.py
```

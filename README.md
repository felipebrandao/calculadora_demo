# CalcPrecision — Calculadora de Soma e Subtração

Uma calculadora executiva de alta precisão inspirada no design system **"Precision Metric"** do Google Stitch. Focada em operações aditivas e diferenciais, com fita de auditoria em tempo real, painel analítico bento e suporte completo ao teclado físico.

![CalcPrecision Preview](https://lh3.googleusercontent.com/aida/AEtjO1X1gHB5JwH48qSW5rp7MmdrRd4Mw_1XpeCvYxn56g7DSPwQFhH15yU1CKxsCtbS0eZbG3zb1pkJuI2-e3Z-amYsn4Hn0hzyzVLJKLsgY0OALsa96B9f4smArua3iCh9wT7mh-SnF6aK_e4kdDRuKjmoebn0bEmIo990fUHnkOvn3jhjPBa4vBUm_-xlm_hWCfW84DGKscH1jTUij5_llPonUUxmTfIpmCZqDD7rk0lKOLN8mlKwMwAYBg)

---

## ✨ Principais Funcionalidades

- **Observation Deck (Visor)**:
  - Fita de expressão (*Formula Tape*) com histórico imediato do cálculo em andamento.
  - Indicador dinâmico de status da operação (`NEUTRO`, `SOMA [+]`, `SUBTRAÇÃO [−]`).
  - Visor numérico em **JetBrains Mono** com alinhamento tabular (`tabular-nums`) e ajuste dinâmico de tamanho de fonte.
  - Botão de cópia rápida para a área de transferência com notificação toast.

- **Execution Matrix (Teclado Operacional)**:
  - Teclas de **Deltas Rápidos**: `+10`, `+100`, `+1.000`, `−10`, `−100`, `−1.000`.
  - Botão de **Subtotal Parcial** para fechamentos intermediários de soma/subtração.
  - Inversão de polaridade (`±`) e cálculo de percentual (`%`).
  - Botão de igual (`=`) em destaque vertical de alta visibilidade.

- **Painel Analítico Bento & Fita de Histórico**:
  - Saldo acumulado em tempo real em formato BRL.
  - Contadores e valores parciais de somas e subtrações com indicador de proporção (`+ / −`).
  - Histórico persistente salvo no `localStorage`.
  - **Click-to-Recall**: clique em qualquer cálculo anterior para recuperar o resultado para o visor.
  - Exportação completa da fita nos formatos **CSV** e **JSON**.

- **Experiência de Uso (UX)**:
  - Áudio tátil sintetizado via **Web Audio API** (sons mecânicos de clique, blip de operador e acorde de confirmação no cálculo).
  - Suporte abrangente ao teclado físico (teclado alfanumérico e teclado numérico Numpad).

---

## ⌨️ Atalhos de Teclado

| Tecla | Ação |
| :--- | :--- |
| `0` a `9` | Digitar números |
| `+` | Operação de Adição |
| `-` | Operação de Subtração |
| `Enter` ou `=` | Executar e salvar na fita |
| `Backspace` | Apagar último dígito |
| `Esc` | Limpar tudo (Reset Geral) |
| `C` | Limpar entrada atual (Clear Entry) |
| `,` ou `.` | Inserir separador decimal |
| `%` | Calcular percentual |
| `S` | Calcular Subtotal Parcial |
| `?` | Abrir modal de ajuda com todos os atalhos |

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm

### Passos
1. Clone o repositório:
```bash
git clone https://github.com/felipebrandao/calculadora_demo.git
cd calculadora_demo
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra no navegador:
```
http://localhost:5173
```

---

## 🛠️ Tecnologias Utilizadas

- **React 19**
- **Vite**
- **CSS Custom Properties** (Design Tokens do Stitch)
- **Lucide React** (Ícones)
- **Web Audio API** (Sons mecânicos táteis)
- **Google Fonts**: Space Grotesk, JetBrains Mono, Inter

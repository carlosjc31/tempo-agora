# 🌤️ Tempo Agora

Aplicativo mobile de previsão do tempo desenvolvido com React Native e Expo.

---

## 👥 Integrantes do grupo

| Nome | 
|------|
| Gabriel Teruel | 
| José Carlos Carneiro | 
| Kátia Cursi | 

---
## 📋 Proposta e Escopo

O **Tempo Agora** permite que o usuário consulte as condições climáticas atuais e a previsão dos próximos 5 dias de qualquer cidade do mundo. O app foi desenvolvido como trabalho prático da disciplina de Tópicos Especiais, sob orientação do Prof. Melky, com foco na aplicação de boas práticas de arquitetura React Native.

**Público-alvo:** Usuários que precisam consultar o clima de forma rápida e intuitiva, sem cadastro ou complexidade.

---

## ✨ Funcionalidades Principais

- 🔍 **Busca por cidade** — digite qualquer cidade e veja o clima atual instantaneamente
- 🌡️ **Dados detalhados** — temperatura, sensação térmica, umidade e velocidade do vento
- 📅 **Previsão de 5 dias** — mínima, máxima e descrição do clima para cada dia
- 🕓 **Histórico de buscas** — últimas 10 cidades consultadas, com opção de remoção individual ou limpeza total
- 🌙 **Tema Dark/Light** — alternância de tema disponível em todas as telas
- ⚠️ **Tratamento de erros** — mensagens claras para cidade não encontrada ou falha de rede

---

## 🔌 API Utilizada

**OpenWeatherMap** — API pública e gratuita de dados meteorológicos.

- 📄 Documentação: https://openweathermap.org/api
- Endpoints utilizados:
  - `GET /weather` — clima atual por nome de cidade
  - `GET /forecast` — previsão de 5 dias em intervalos de 3 horas

---

## 🏗️ Arquitetura e Requisitos Técnicos

| Requisito | Implementação |
|---|---|
| **API externa** | OpenWeatherMap via `fetch` com tratamento de loading e erros |
| **Stack Navigation** | Tela Home → Tela de Previsão (com passagem de parâmetro `city`) |
| **Tab Navigation** | Abas: Buscar / Histórico |
| **useState** | Controle do input, dados do clima, loading e erro na HomeScreen |
| **useEffect** | Disparo automático da busca de previsão ao abrir ForecastScreen |
| **useReducer** | Gerenciamento do histórico de cidades (`ADD_CITY`, `REMOVE_CITY`, `CLEAR_HISTORY`) |
| **Context API** | Compartilha tema (dark/light) e histórico entre todas as telas |

---

## 🚀 Instruções de Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Expo Go](https://expo.dev/go) instalado no celular (iOS ou Android)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/tempo-agora.git

# 2. Entre na pasta do projeto
cd tempo-agora

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npx expo start
```

Após iniciar, escaneie o **QR Code** exibido no terminal com o aplicativo **Expo Go** no seu celular.

---

## 📁 Estrutura de Pastas

```
TempoAgora/
├── src/
│   ├── context/
│   │   └── AppContext.js       # Context API 
│   ├── screens/
│   │   ├── HomeScreen.js       # Busca e clima atual
│   │   ├── ForecastScreen.js   # Previsão 5 dias
│   │   └── HistoryScreen.js    # Histórico de cidades
│   ├── components/
│   │   └── WeatherCard.js      # Card do clima atual
│   ├── hooks/
│   │   └── useSearchHistory.js # useReducer do histórico
│   └── services/
│       └── weatherApi.js       # Chamadas à API
├── App.js                      # Navegação principal
├── package.json
└── README.md
```

---

## 👨‍💻 Desenvolvido com

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [OpenWeatherMap API](https://openweathermap.org/)


---

💻 Desenvolvido por Gabriel Teruel | José Carlos | Kátia Cursi - Atividade Bimestral 2.

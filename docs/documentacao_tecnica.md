# Documentação Técnica - Fúria Fan Analytics

## Visão Geral

A plataforma Fúria Fan Analytics é uma solução desenvolvida para análise de dados de fãs da marca Fúria Esports. O sistema permite coletar, analisar e segmentar dados de fãs provenientes de redes sociais e outras interações, gerando insights valiosos para estratégias de engajamento personalizadas.

## Arquitetura do Sistema

### Tecnologias Utilizadas

- **Frontend**: Next.js 14 com TypeScript e Tailwind CSS
- **Backend**: API Routes do Next.js (simuladas para o protótipo)
- **Visualização de Dados**: Componentes personalizados com Leaflet para mapas
- **Autenticação**: Sistema simulado com Context API do React
- **Gerenciamento de Estado**: Context API do React

### Estrutura de Diretórios

```
furia-fan-analytics-app/
├── public/
│   ├── data/                  # Dados simulados em formato JSON
│   │   ├── fans.json          # Dados dos fãs
│   │   ├── interactions.json  # Interações dos fãs
│   │   └── recommendations.json # Recomendações de conteúdo
│   └── images/                # Imagens e recursos estáticos
├── src/
│   ├── app/                   # Páginas da aplicação (Next.js App Router)
│   │   ├── api/               # Rotas de API simuladas
│   │   │   ├── auth/          # API de autenticação
│   │   │   ├── fans/          # API de dados de fãs
│   │   │   ├── interactions/  # API de interações
│   │   │   ├── recommendations/ # API de recomendações
│   │   │   └── export/        # API de exportação de dados
│   │   ├── login/             # Página de login
│   │   ├── segmentation/      # Página de segmentação de fãs
│   │   ├── recommendations/   # Página de recomendações
│   │   ├── gamification/      # Página de gamificação
│   │   ├── layout.tsx         # Layout principal da aplicação
│   │   └── page.tsx           # Página inicial (Dashboard)
│   ├── components/            # Componentes reutilizáveis
│   │   └── dashboard/         # Componentes específicos do dashboard
│   │       └── HeatMap.tsx    # Componente de mapa de calor
│   └── context/               # Contextos React para gerenciamento de estado
│       ├── AuthContext.tsx    # Contexto de autenticação
│       └── DataContext.tsx    # Contexto de dados
```

## Componentes Principais

### Contextos

#### AuthContext

Gerencia o estado de autenticação do usuário em toda a aplicação. Fornece:
- Estado de autenticação atual
- Funções de login e logout
- Informações do usuário autenticado

```typescript
// Exemplo de uso
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Uso das funções e estados
}
```

#### DataContext

Gerencia o acesso e manipulação de dados em toda a aplicação. Fornece:
- Funções para buscar dados de fãs, interações e recomendações
- Função para exportar dados em diferentes formatos
- Estados de carregamento e erro

```typescript
// Exemplo de uso
import { useData } from '@/context/DataContext';

function MyComponent() {
  const { 
    fansData, 
    interactionsData, 
    fetchFans, 
    fetchInteractions,
    exportData 
  } = useData();
  
  // Uso das funções e dados
}
```

### APIs Simuladas

#### API de Autenticação

Endpoint: `/api/auth`
Método: POST
Função: Simula autenticação de usuários com diferentes perfis

#### API de Fãs

Endpoint: `/api/fans`
Método: GET
Parâmetros: `fanType`, `game`
Função: Retorna dados de fãs, opcionalmente filtrados por tipo de fã e jogo

#### API de Interações

Endpoint: `/api/interactions`
Métodos: GET, POST
Parâmetros GET: `game`, `sentiment`, `dateFrom`, `dateTo`
Função: Retorna interações de fãs ou registra novas interações

#### API de Recomendações

Endpoint: `/api/recommendations`
Método: GET
Parâmetros: `fanType`, `game`
Função: Retorna recomendações de conteúdo, opcionalmente filtradas por tipo de fã e jogo

#### API de Exportação

Endpoint: `/api/export`
Método: GET
Parâmetros: `type` (fans, recommendations, interactions), `format` (json, csv)
Função: Exporta dados no formato especificado

## Modelos de Dados

### Fãs

```typescript
interface Fan {
  id: string;
  username: string;
  platform: string;
  fan_type: 'hardcore' | 'game_specific' | 'casual' | 'new';
  engagement_score: number;
  sentiment_score: number;
  favorite_games: string[];
  badges: string[];
  demographics: {
    age: string;
    gender: string;
    country: string;
    city: string;
  };
}
```

### Interações

```typescript
interface Interaction {
  id: string;
  user_id: string;
  platform: string;
  content_type: string;
  content: string;
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentiment_score: number;
  game_related: string;
  event_related: string;
}
```

### Recomendações

```typescript
interface Recommendation {
  id: string;
  title: string;
  description: string;
  content_type: 'article' | 'video' | 'post';
  target_fan_types: string[];
  related_games: string[];
  optimal_posting_time: string;
  expected_engagement: number;
}
```

## Fluxos de Autenticação

1. O usuário acessa a aplicação
2. Se não estiver autenticado, é redirecionado para a página de login
3. Após autenticação bem-sucedida, o token é armazenado no localStorage
4. O usuário é redirecionado para o dashboard
5. O token é verificado em cada carregamento de página

## Extensibilidade

### Integração com APIs Reais

Para integrar com APIs reais de redes sociais, substitua as funções de busca simuladas no DataContext por chamadas reais:

```typescript
// Exemplo de integração com API real do Twitter
const fetchTwitterData = async (username) => {
  const response = await fetch(`/api/twitter?username=${username}`);
  return response.json();
};
```

### Adição de Novas Visualizações

Para adicionar novas visualizações de dados:

1. Crie um novo componente na pasta `components`
2. Importe e utilize os dados do DataContext
3. Adicione o componente à página desejada

## Considerações de Segurança

- A autenticação atual é simulada e não deve ser usada em produção
- Em um ambiente de produção, implemente:
  - Autenticação JWT com expiração de tokens
  - HTTPS para todas as comunicações
  - Validação de entrada em todas as APIs
  - Controle de acesso baseado em funções (RBAC)

## Limitações Conhecidas

- Os dados são simulados e estáticos
- Não há persistência real de dados além do localStorage
- A análise de sentimentos é simulada com valores predefinidos
- O mapa de calor usa coordenadas aproximadas

## Próximos Passos para Produção

1. Implementar backend real com banco de dados
2. Integrar com APIs reais de redes sociais
3. Implementar sistema de autenticação seguro
4. Adicionar análise de sentimentos em tempo real
5. Implementar sistema de notificações
6. Adicionar testes automatizados
7. Configurar CI/CD para implantação contínua

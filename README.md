# Fúria Fan Analytics

![Fúria Logo](https://www.furia.gg/wp-content/uploads/2022/06/logo-furia-header.svg)

## Sobre o Projeto

Fúria Fan Analytics é uma plataforma de análise de dados de fãs da marca Fúria Esports, desenvolvida para coletar, analisar e segmentar dados de fãs provenientes de redes sociais e outras interações, gerando insights valiosos para estratégias de engajamento personalizadas.

## Funcionalidades Principais

- **Dashboard Analítico**: Visualização de dados demográficos, mapa de calor geográfico, análise de sentimentos e preferências dos fãs.
- **Sistema de Segmentação**: Classificação automática de fãs em diferentes perfis (hardcore, jogo específico, casual, novos fãs).
- **Recomendações de Conteúdo**: Sugestões personalizadas para cada segmento de fãs e identificação de influenciadores potenciais.
- **Gamificação**: Sistema de badges, níveis e desafios para aumentar o engajamento dos fãs.

## Tecnologias Utilizadas

- **Frontend**: Next.js 14 com TypeScript
- **Estilização**: Tailwind CSS
- **Visualização de Dados**: Componentes personalizados com Leaflet para mapas
- **Gerenciamento de Estado**: Context API do React

## Pré-requisitos

- Node.js 18.0.0 ou superior
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/furia-fan-analytics.git
cd furia-fan-analytics-app
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Acesse a aplicação em `http://localhost:3000`

## Credenciais de Demonstração

Para testar a aplicação, utilize as seguintes credenciais:

- **Admin**: Usuário: `admin` / Senha: `admin123`
- **Analista**: Usuário: `analista` / Senha: `analista123`
- **Marketing**: Usuário: `marketing` / Senha: `marketing123`

## Estrutura do Projeto

```
furia-fan-analytics-app/
├── public/
│   ├── data/                  # Dados simulados em formato JSON
│   └── images/                # Imagens e recursos estáticos
├── src/
│   ├── app/                   # Páginas da aplicação (Next.js App Router)
│   │   ├── api/               # Rotas de API simuladas
│   │   ├── login/             # Página de login
│   │   ├── segmentation/      # Página de segmentação de fãs
│   │   ├── recommendations/   # Página de recomendações
│   │   ├── gamification/      # Página de gamificação
│   │   ├── layout.tsx         # Layout principal da aplicação
│   │   └── page.tsx           # Página inicial (Dashboard)
│   ├── components/            # Componentes reutilizáveis
│   └── context/               # Contextos React para gerenciamento de estado
└── docs/                      # Documentação
    ├── documentacao_tecnica.md # Documentação técnica detalhada
    └── manual_usuario.md      # Manual do usuário
```

## Documentação

Para informações detalhadas sobre a implementação e uso da plataforma, consulte:

- [Documentação Técnica](./docs/documentacao_tecnica.md)
- [Manual do Usuário](./docs/manual_usuario.md)

## Funcionalidades Implementadas

- [x] Dashboard com visualizações de dados
- [x] Sistema de segmentação de fãs
- [x] Recomendações de conteúdo personalizadas
- [x] Sistema de gamificação
- [x] Autenticação simulada
- [x] APIs para dados dinâmicos
- [x] Exportação de dados em diferentes formatos

## Limitações do Protótipo

- Os dados são simulados e estáticos
- Não há persistência real de dados além do localStorage
- A análise de sentimentos é simulada com valores predefinidos
- O mapa de calor usa coordenadas aproximadas

## Próximos Passos

- Implementar backend real com banco de dados
- Integrar com APIs reais de redes sociais
- Implementar sistema de autenticação seguro
- Adicionar análise de sentimentos em tempo real
- Implementar sistema de notificações

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Para mais informações, entre em contato através do email: contato@furia.gg

---

Desenvolvido como parte de um desafio para programadores da Fúria Esports.

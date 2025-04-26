// src/app/api/interactions/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    // Obter parâmetros da URL
    const { searchParams } = new URL(request.url);
    const game = searchParams.get('game') || 'all';
    const sentiment = searchParams.get('sentiment') || 'all';
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    
    // Ler o arquivo JSON de interações
    const interactionsPath = path.join(process.cwd(), 'public', 'data', 'interactions.json');
    const interactionsData = JSON.parse(fs.readFileSync(interactionsPath, 'utf8'));
    
    // Filtrar as interações conforme os parâmetros
    let filteredInteractions = interactionsData.interactions;
    
    if (game !== 'all') {
      filteredInteractions = filteredInteractions.filter((interaction: any) => 
        interaction.game_related === game
      );
    }
    
    if (sentiment !== 'all') {
      filteredInteractions = filteredInteractions.filter((interaction: any) => 
        interaction.sentiment === sentiment
      );
    }
    
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filteredInteractions = filteredInteractions.filter((interaction: any) => 
        new Date(interaction.timestamp) >= fromDate
      );
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      filteredInteractions = filteredInteractions.filter((interaction: any) => 
        new Date(interaction.timestamp) <= toDate
      );
    }
    
    // Retornar os dados filtrados
    return NextResponse.json({
      ...interactionsData,
      interactions: filteredInteractions
    });
  } catch (error) {
    console.error('Erro ao buscar interações:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar interações'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, platform, content_type, content, game_related, event_related } = body;
    
    // Validar dados obrigatórios
    if (!user_id || !platform || !content_type) {
      return NextResponse.json({
        success: false,
        message: 'Dados obrigatórios não fornecidos'
      }, { status: 400 });
    }
    
    // Ler o arquivo JSON de interações
    const interactionsPath = path.join(process.cwd(), 'public', 'data', 'interactions.json');
    const interactionsData = JSON.parse(fs.readFileSync(interactionsPath, 'utf8'));
    
    // Criar nova interação
    const newInteraction = {
      id: `int${interactionsData.interactions.length + 1}`.padStart(6, '0'),
      user_id,
      platform,
      content_type,
      content: content || '',
      timestamp: new Date().toISOString(),
      sentiment: 'neutral', // Valor padrão, em produção seria calculado por análise de sentimento
      sentiment_score: 0.5, // Valor padrão
      game_related: game_related || '',
      event_related: event_related || ''
    };
    
    // Adicionar nova interação
    interactionsData.interactions.push(newInteraction);
    
    // Simular salvamento (em produção, salvaria no arquivo ou banco de dados)
    // fs.writeFileSync(interactionsPath, JSON.stringify(interactionsData, null, 2));
    
    return NextResponse.json({
      success: true,
      interaction: newInteraction
    });
  } catch (error) {
    console.error('Erro ao registrar interação:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao registrar interação'
    }, { status: 500 });
  }
}

// src/app/api/recommendations/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    // Obter parâmetros da URL
    const { searchParams } = new URL(request.url);
    const fanType = searchParams.get('fanType') || 'all';
    const game = searchParams.get('game') || 'all';
    
    // Ler o arquivo JSON de recomendações
    const recommendationsPath = path.join(process.cwd(), 'public', 'data', 'recommendations.json');
    const recommendationsData = JSON.parse(fs.readFileSync(recommendationsPath, 'utf8'));
    
    // Filtrar as recomendações conforme os parâmetros
    if (fanType !== 'all' || game !== 'all') {
      const filteredRecommendations = recommendationsData.recommendations.filter((rec: any) => {
        const matchesType = fanType === 'all' || rec.target_fan_types.includes(fanType);
        const matchesGame = game === 'all' || rec.related_games.includes(game);
        return matchesType && matchesGame;
      });
      
      // Retornar os dados filtrados
      return NextResponse.json({
        ...recommendationsData,
        recommendations: filteredRecommendations
      });
    }
    
    // Retornar todos os dados se não houver filtros
    return NextResponse.json(recommendationsData);
  } catch (error) {
    console.error('Erro ao buscar recomendações:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar recomendações'
    }, { status: 500 });
  }
}

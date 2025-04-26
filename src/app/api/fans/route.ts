// src/app/api/fans/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    // Obter parâmetros da URL
    const { searchParams } = new URL(request.url);
    const fanType = searchParams.get('fanType') || 'all';
    const game = searchParams.get('game') || 'all';
    
    // Ler o arquivo JSON de fãs
    const fansPath = path.join(process.cwd(), 'public', 'data', 'fans.json');
    const fansData = JSON.parse(fs.readFileSync(fansPath, 'utf8'));
    
    // Filtrar os dados conforme os parâmetros
    if (fanType !== 'all' || game !== 'all') {
      const filteredFans = fansData.fans.filter((fan: any) => {
        const matchesType = fanType === 'all' || fan.fan_type === fanType;
        const matchesGame = game === 'all' || fan.favorite_games.includes(game);
        return matchesType && matchesGame;
      });
      
      // Retornar os dados filtrados
      return NextResponse.json({
        ...fansData,
        fans: filteredFans
      });
    }
    
    // Retornar todos os dados se não houver filtros
    return NextResponse.json(fansData);
  } catch (error) {
    console.error('Erro ao buscar dados de fãs:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar dados de fãs'
    }, { status: 500 });
  }
}

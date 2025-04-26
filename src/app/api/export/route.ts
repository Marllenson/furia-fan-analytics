// src/app/api/export/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    // Obter parâmetros da URL
    const { searchParams } = new URL(request.url);
    const dataType = searchParams.get('type') || 'fans';
    const format = searchParams.get('format') || 'json';
    
    // Determinar o caminho do arquivo com base no tipo de dados
    let dataPath;
    switch (dataType) {
      case 'fans':
        dataPath = path.join(process.cwd(), 'public', 'data', 'fans.json');
        break;
      case 'recommendations':
        dataPath = path.join(process.cwd(), 'public', 'data', 'recommendations.json');
        break;
      case 'interactions':
        dataPath = path.join(process.cwd(), 'public', 'data', 'interactions.json');
        break;
      default:
        return NextResponse.json({
          success: false,
          message: 'Tipo de dados inválido'
        }, { status: 400 });
    }
    
    // Ler os dados do arquivo
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // Formatar os dados conforme solicitado
    if (format === 'csv') {
      // Simulação de conversão para CSV
      let csvContent = '';
      
      if (dataType === 'fans') {
        // Cabeçalho para dados de fãs
        csvContent = 'id,username,platform,fan_type,engagement_score,sentiment_score,location\n';
        
        // Dados de fãs
        data.fans.forEach((fan: any) => {
          csvContent += `${fan.id},${fan.username},${fan.platform},${fan.fan_type},${fan.engagement_score},${fan.sentiment_score},${fan.demographics.city}\n`;
        });
      } else if (dataType === 'recommendations') {
        // Cabeçalho para recomendações
        csvContent = 'id,title,content_type,expected_engagement,optimal_posting_time\n';
        
        // Dados de recomendações
        data.recommendations.forEach((rec: any) => {
          csvContent += `${rec.id},${rec.title},${rec.content_type},${rec.expected_engagement},${rec.optimal_posting_time}\n`;
        });
      } else if (dataType === 'interactions') {
        // Cabeçalho para interações
        csvContent = 'id,user_id,platform,content_type,sentiment,timestamp,game_related\n';
        
        // Dados de interações
        data.interactions.forEach((int: any) => {
          csvContent += `${int.id},${int.user_id},${int.platform},${int.content_type},${int.sentiment},${int.timestamp},${int.game_related}\n`;
        });
      }
      
      // Retornar os dados em formato CSV
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename=${dataType}_export.csv`
        }
      });
    } else {
      // Retornar os dados em formato JSON
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Erro ao exportar dados:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao exportar dados'
    }, { status: 500 });
  }
}

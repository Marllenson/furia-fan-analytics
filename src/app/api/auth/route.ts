// src/app/api/auth/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Simulação de autenticação simples
    if (username === 'admin' && password === 'admin123') {
      return NextResponse.json({
        success: true,
        user: {
          id: 'admin001',
          name: 'Administrador',
          role: 'admin',
          token: 'simulated-jwt-token-for-admin'
        }
      });
    } else if (username === 'analista' && password === 'analista123') {
      return NextResponse.json({
        success: true,
        user: {
          id: 'analyst001',
          name: 'Analista de Dados',
          role: 'analyst',
          token: 'simulated-jwt-token-for-analyst'
        }
      });
    } else if (username === 'marketing' && password === 'marketing123') {
      return NextResponse.json({
        success: true,
        user: {
          id: 'marketing001',
          name: 'Equipe de Marketing',
          role: 'marketing',
          token: 'simulated-jwt-token-for-marketing'
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Credenciais inválidas'
      }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Erro no servidor'
    }, { status: 500 });
  }
}

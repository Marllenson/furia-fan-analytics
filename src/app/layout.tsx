import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fúria Fan Analytics - Plataforma de Análise de Fãs",
  description: "Plataforma de análise de dados de fãs da marca Fúria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <DataProvider>
            <header className="bg-[#1a1a1a] text-white p-4 shadow-md">
              <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-purple-500">FÚRIA</span>
                  <span className="text-xl font-bold">Fan Analytics</span>
                </div>
                <nav>
                  <ul className="flex space-x-6">
                    <li>
                      <Link href="/" className="hover:text-purple-400 transition-colors">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/segmentation" className="hover:text-purple-400 transition-colors">
                        Segmentação
                      </Link>
                    </li>
                    <li>
                      <Link href="/recommendations" className="hover:text-purple-400 transition-colors">
                        Recomendações
                      </Link>
                    </li>
                    <li>
                      <Link href="/gamification" className="hover:text-purple-400 transition-colors">
                        Gamificação
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </header>
            <main className="container mx-auto py-6 px-4">{children}</main>
            <footer className="bg-[#1a1a1a] text-white p-4 mt-8">
              <div className="container mx-auto text-center">
                <p>© 2025 Fúria Fan Analytics - Todos os direitos reservados</p>
              </div>
            </footer>
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

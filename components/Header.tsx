'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';

// Carregamento dinâmico do menu mobile
const MobileMenu = lazy(() => import('./mobile-menu'));

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Otimizar o listener de scroll com throttle
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 0);
        timeoutId = undefined;
      }, 100);
    };

    if (isHome) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [isHome]);

  // Fecha o menu mobile quando mudar de página
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const shouldBeTransparent = isHome && !isScrolled;

  return (
    <div>
      <header className={`px-[24px] fixed top-0 left-0 w-full z-50 transition-all duration-300 ${shouldBeTransparent ? 'bg-transparent' : 'bg-white shadow-md'}`}>
        <div className="max-w-[1400px] w-full my-0 mx-auto">
          <div className="min-h-[72px] flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-[121px] h-[28px] relative">
                <Link href="https://agex.com.br/">
                  <Image
                    src="/logo.svg"
                    alt="Agex"
                    width={121}
                    height={28}
                    priority
                    className="w-full h-full object-contain"
                  />
                </Link>
              </div>

              <nav className="hidden lg:flex items-center">
                <div className="py-[15px] px-[16px] mr-1 hover:bg-black/10 h-10 flex items-center rounded-[14px]">
                  <div className="relative">
                    <button
                      className="relative text-left ring-0 border-none bg-transparent"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      <div className="flex items-baseline gap-2 cursor-pointer transition-all">
                        <p className={`text-black font-inter font-semibold items-center gap-2 border-none flex min-h-10 justify-center ${shouldBeTransparent ? 'text-white' : ''}`}>
                          Empresa
                        </p>
                        <ChevronDown className={`w-4 h-4 ${shouldBeTransparent ? 'text-white' : ''}`} />
                      </div>
                    </button>
                    <div className={`max-h-0 opacity-0 absolute top-[60px] left-50 w-52 p-2 bg-white shadow-lg z-6 rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : ''}`}>
                      <div className="flex flex-col justify-center">
                        <Link href="https://agex.com.br/quem-somos">
                          <div className="py-1.5 hover:bg-black/10 h-10 items-center rounded-[8px] flex px-4 text-blue-350 text-base leading-6 font-medium transition-colors duration-150">
                            Quem somos
                          </div>
                        </Link>
                        <a href="https://www.agex.com.br/trabalhe" target="_blank" rel="noopener noreferrer">
                          <div className="py-1.5 hover:bg-black/10 h-10 items-center rounded-[8px] px-4 text-blue-350 text-base leading-6 font-medium transition-colors duration-150 flex gap-1">
                            Trabalhe conosco
                          </div>
                        </a>
                        <Link href="https://agex.com.br/solucoes">
                          <div className="py-1.5 hover:bg-black/10 h-10 items-center rounded-[8px] px-4 text-blue-350 text-base leading-6 font-medium transition-colors duration-150 flex gap-1">
                            Soluções
                          </div>
                        </Link>
                        <Link href="https://agex.com.br/atendimento">
                          <div className="py-1.5 hover:bg-black/10 h-10 items-center rounded-[8px] px-4 text-blue-350 text-base leading-6 font-medium transition-colors duration-150 flex gap-1">
                            Ouvidoria
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="https://agex.com.br/seja-cliente" className={`text-black font-inter hover:bg-black/10 mx-1 h-10 flex items-center rounded-[14px] font-semibold py-[15px] px-[16px] min-h-10 justify-center ${shouldBeTransparent ? 'text-white' : ''}`}>
                  Seja cliente
                </Link>
                <Link href="https://agex.com.br/atendimento" className={`text-black font-inter hover:bg-black/10 mx-1 h-10 flex items-center rounded-[14px] font-semibold py-[15px] px-[16px] min-h-10 justify-center ${shouldBeTransparent ? 'text-white' : ''}`}>
                  Atendimento
                </Link>
                <Link href="https://agex.com.br/blog" className={`text-black font-inter hover:bg-black/10 mx-1 h-10 flex items-center rounded-[14px] font-semibold py-[15px] px-[16px] min-h-10 justify-center ${shouldBeTransparent ? 'text-white' : ''}`}>
                  Blog
                </Link>
              </nav>
            </div>

            <div className="hidden lg:block">
              <a href="https://cliente.agex.com.br/login" target="_blank" rel="noopener noreferrer">
                <button
                  type="button"
                  aria-label="Botão"
                  className="bg-[#E64100] hover:bg-[#CC3A00] py-[15px] px-[16px] gap-2 py-4 px-[20px] w-full h-10 rounded-[14px] gap-2 font-semibold text-base flex font-inter justify-center items-center cursor-pointer"
                >
                  <span className="text-white font-inter">Criar conta / Login</span>
                  <Image
                    src="/images/login-icon.svg"
                    alt="Login"
                    width={25}
                    height={25}
                    className="text-white"
                  />
                </button>
              </a>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-primary bg-transparent rounded-full p-2"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#FF4B12]" />
              ) : (
                <Menu className={`w-6 h-6 ${shouldBeTransparent ? 'text-white' : ''}`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile com carregamento dinâmico */}
      {isMobileMenuOpen && (
        <Suspense fallback={
          <div className="lg:hidden fixed inset-0 bg-white z-40 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#E64100]"></div>
          </div>
        }>
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
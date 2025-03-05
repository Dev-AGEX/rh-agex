'use client';

import { memo } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  onClose: () => void;
}

function MobileMenuComponent({ onClose }: MobileMenuProps) {
  return (
    <div className="lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform translate-x-0">
      <div className="pt-24 px-6">
        <nav className="flex flex-col gap-4">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400">Empresa</h3>
            <div className="flex flex-col gap-4">
              <Link href="https://site-agex.vercel.app/quem-somos" className="text-gray-800" onClick={onClose}>
                Quem somos
              </Link>
              <a href="https://www.agex.com.br/trabalhe" target="_blank" rel="noopener noreferrer" className="text-gray-800" onClick={onClose}>
                Trabalhe conosco
              </a>
              <Link href="https://site-agex.vercel.app/qualidade" className="text-gray-800" onClick={onClose}>
                Qualidade
              </Link>
              <Link href="https://site-agex.vercel.app/solucoes" className="text-gray-800" onClick={onClose}>
                Soluções
              </Link>
              <Link href="/atendimento" className="text-gray-800" onClick={onClose}>
                Ouvidoria
              </Link>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="text-sm font-bold text-gray-400">Menu</h3>
            <div className="flex flex-col gap-4">
              <Link href="/seja-cliente" className="text-gray-800" onClick={onClose}>
                Seja cliente
              </Link>
              <Link href="/atendimento" className="text-gray-800" onClick={onClose}>
                Fale conosco
              </Link>
              <Link href="/blog" className="text-gray-800" onClick={onClose}>
                Blog
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <a href="https://cliente.agex.com.br/login" target="_blank" rel="noopener noreferrer" onClick={onClose}>
              <button
                type="button"
                className="bg-[#E64100] hover:bg-[#CC3A00] w-full py-3 px-4 rounded-[14px] text-white font-semibold text-base flex justify-center items-center gap-2"
              >
                <span>Criar conta / Login</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 25" fill="none">
                  <path d="M12 2.5L12.324 2.505C14.9467 2.59002 17.4309 3.70254 19.2408 5.60261C21.0507 7.50268 22.0412 10.038 21.9987 12.6618C21.9562 15.2855 20.884 17.7874 19.0136 19.6279C17.1431 21.4683 14.6241 22.4998 12 22.4998C9.3759 22.4998 6.85694 21.4683 4.98645 19.6279C3.11596 17.7874 2.04383 15.2855 2.00131 12.6618C1.9588 10.038 2.9493 7.50268 4.75918 5.60261C6.56906 3.70254 9.05328 2.59002 11.676 2.505L12 2.5ZM12.613 7.71C12.412 7.55459 12.1594 7.48151 11.9065 7.5056C11.6536 7.52969 11.4193 7.64916 11.2513 7.83972C11.0832 8.03029 10.994 8.27767 11.0018 8.53162C11.0095 8.78557 11.1137 9.02704 11.293 9.207L13.584 11.5H8L7.883 11.507C7.62991 11.5371 7.39786 11.6627 7.23427 11.8582C7.07068 12.0536 6.98789 12.3042 7.00283 12.5586C7.01777 12.813 7.1293 13.0522 7.31463 13.2272C7.49997 13.4021 7.74512 13.4997 8 13.5H13.584L11.293 15.793L11.21 15.887C11.0546 16.088 10.9815 16.3406 11.0056 16.5935C11.0297 16.8464 11.1492 17.0807 11.3397 17.2488C11.5303 17.4168 11.7777 17.506 12.0316 17.4982C12.2856 17.4905 12.527 17.3863 12.707 17.207L16.707 13.207L16.78 13.125L16.844 13.036L16.906 12.923L16.95 12.813L16.98 12.701L16.997 12.575L17 12.5L16.993 12.382L16.964 12.234L16.929 12.129L16.875 12.016L16.804 11.905C16.7745 11.8653 16.742 11.8279 16.707 11.793L12.707 7.793L12.613 7.71Z" fill="white"/>
                </svg>
              </button>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}

// Memoização do componente para evitar re-renders desnecessários
export default memo(MobileMenuComponent);

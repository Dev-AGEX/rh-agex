'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#ECEAE6] px-[24px]">
      <div className="pt-[80px] pb-[40px] max-w-[1400px] w-full my-0 mx-auto">
        <div className="flex gap-6 justify-between flex-wrap items-start">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Agex"
              width={121}
              height={28}
              loading="lazy"
            />
          </Link>
          <div className="flex items-start content-start gap-6 flex-wrap">
            <div className="flex flex-col gap-4 w-[200px]">
              <h3 className="font-inter text-sm font-bold text-[#665E54]">CONTATO</h3>
              <ul className="flex list-none flex-col items-start gap-3 self-stretch">
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <Link href="https://agex.com.br/atendimento">Atendimento</Link>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <a target="_blank" rel="noopener noreferrer" href="https://cliente.agex.com.br/cotacao">Cotação</a>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <Link href="https://agex.com.br/seja-cliente">Seja cliente</Link>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <Link href="https://agex.com.br/agregar-veiculo">Agregue seu veículo</Link>
                </li>
                <li>
                  <Link href="https://agex.com.br/seja-um-agente-local">
                    <p className="font-inter text-sm hover:text-primary font-medium text-[#1D1D1D]">Seja um agenciador</p>
                  </Link>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <a target="_blank" rel="noopener noreferrer" href="/">Trabalhe conosco</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 w-[200px]">
              <h3 className="font-inter text-sm font-bold text-[#665E54]">AGEX</h3>
              <ul className="flex flex-col list-none items-start gap-3 self-stretch">
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <Link href="https://agex.com.br/quem-somos">Quem somos</Link>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <Link href="https://agex.com.br/qualidade">Qualidade</Link>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <Link href="https://agex.com.br/solucoes">Soluções</Link>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <Link href="https://agex.com.br/politica-de-privacidade">Privacidade</Link>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <Link href="https://agex.com.br/perfil-de-carga">Perfil de carga</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 w-[200px]">
              <h3 className="font-inter text-sm font-bold text-[#665E54]">CONTA</h3>
              <ul className="flex list-none flex-col items-start gap-3 self-stretch">
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <a target="_blank" rel="noopener noreferrer" href="https://cliente.agex.com.br/login">Criar conta / Login</a>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <a target="_blank" rel="noopener noreferrer" href="https://cliente.agex.com.br/rastrear">Rastrear envios</a>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <a target="_blank" rel="noopener noreferrer" href="https://cliente.agex.com.br/cotacao">Cotar frete</a>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <a target="_blank" rel="noopener noreferrer" href="https://cliente.agex.com.br/coleta">Agendar coleta</a>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <a target="_blank" rel="noopener noreferrer" href="https://cliente.agex.com.br/prazos">Prazos de entrega</a>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <a target="_blank" rel="noopener noreferrer" href="https://cliente.agex.com.br/faturas">Faturas</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 w-[200px]">
              <h3 className="font-inter text-sm font-bold text-[#665E54]">BLOG</h3>
              <ul className="flex list-none flex-col items-start gap-3 self-stretch">
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <Link href="https://agex.com.br/blog">Notícias</Link>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <Link href="https://agex.com.br/blog">Transporte</Link>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <Link href="https://agex.com.br/blog">Ecommerce</Link>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <Link href="https://agex.com.br/blog">Dicas</Link>
                </li>
                <li className="font-inter text-sm text-[#1D1D1D] font-medium hover:text-primary">
                  <Link href="https://agex.com.br/blog">A Agex</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-6">
            <div className="flex gap-6 items-start">
              <a aria-label="Instagram" href="https://www.instagram.com/transportadoraagex/">
                <div className="bg-primary w-[40px] h-[40px] rounded-xl flex items-center justify-center">
                  <Instagram className="text-white" size={26} />
                </div>
              </a>
              <a aria-label="Linkedin" href="https://www.linkedin.com/company/agextransportes/">
                <div className="bg-primary w-[40px] h-[40px] rounded-xl flex items-center justify-center">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24 24.2256H19.0688V15.8266C19.0688 13.5238 18.1938 12.2369 16.3711 12.2369C14.3883 12.2369 13.3523 13.5761 13.3523 15.8266V24.2256H8.6V8.22559H13.3523V10.3808C13.3523 10.3808 14.7813 7.73676 18.1766 7.73676C21.5703 7.73676 24 9.80919 24 14.0954V24.2256ZM2.93047 6.13052C1.31172 6.13052 0 4.8085 0 3.17805C0 1.5476 1.31172 0.225586 2.93047 0.225586C4.54922 0.225586 5.86016 1.5476 5.86016 3.17805C5.86016 4.8085 4.54922 6.13052 2.93047 6.13052ZM0.476562 24.2256H5.43203V8.22559H0.476562V24.2256Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] w-full my-0 mx-auto">
        <div className="flex justify-between flex-wrap py-[40px] items-start gap-8 self-stretch">
          <div className="flex flex-wrap flex-col md:flex-row items-start gap-8 md:gap-14">
            <div>
              <p className="font-inter text-sm font-medium text-[#665E54]"> 2025 Agex Transportes LTDA</p>
            </div>
            <div className="flex justify-center md:flex-row flex-col flex-wrap items-start md:gap-8 gap-4">
              <Link href="https://agex.com.br/seja-cliente">
                <p className="font-inter text-sm hover:text-primary font-medium text-[#1D1D1D]">Seja Cliente</p>
              </Link>
              <Link href="https://agex.com.br/agregar-veiculo">
                <p className="font-inter text-sm hover:text-primary font-medium text-[#1D1D1D]">Agregue seu veículo</p>
              </Link>
              <a target="_blank" rel="noopener noreferrer" href="/">
                <p className="font-inter text-sm hover:text-primary font-medium text-[#1D1D1D]">Trabalhe conosco</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
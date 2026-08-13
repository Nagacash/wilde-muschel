import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { ROUTES } from '../seo';

interface SiteFooterProps {
  onNavigate: (path: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const year = new Date().getFullYear();

  const go = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="border-t border-[#2a2a2a] bg-[#050505] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <p className="font-cinzel text-lg text-[#F5F5F5]">Wilde Muschel</p>
            <p className="text-xs text-[#888]">
              Ungeschminkt. Ehrlich. Kiez. — Hamburg, St. Pauli
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.15em] text-[#888]">
            <a href={ROUTES.home} onClick={(e) => go(e, ROUTES.home)} className="hover:text-[#FF2D55] transition-colors">
              Home
            </a>
            <a href={ROUTES.ueber} onClick={(e) => go(e, ROUTES.ueber)} className="hover:text-[#FF2D55] transition-colors">
              Über
            </a>
            <a href={ROUTES.folgen} onClick={(e) => go(e, ROUTES.folgen)} className="hover:text-[#FF2D55] transition-colors">
              Folgen
            </a>
            <a href={ROUTES.kontakt} onClick={(e) => go(e, ROUTES.kontakt)} className="hover:text-[#FF2D55] transition-colors">
              Kontakt
            </a>
            <a
              href={ROUTES.richtlinien}
              onClick={(e) => go(e, ROUTES.richtlinien)}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Datenschutz
            </a>
          </nav>
        </div>

        {/* Age restriction notice — keeps the 18+ status stated on every page,
            not just behind the entry gate. */}
        <div className="flex items-center gap-2 text-[11px] text-[#D4AF37] uppercase tracking-[0.2em]">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
          <span>18+ — Inhalte nur für Erwachsene</span>
        </div>

        <div className="pt-5 border-t border-[#1a1a1a] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[11px] text-[#666]">
            © {year} Wilde Muschel. Alle Rechte vorbehalten.
          </p>

          <p className="text-[11px] text-[#888]">
            Powered by{' '}
            <a
              href="https://nagaclub.de"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#D4AF37] hover:text-[#FF2D55] transition-colors"
            >
              Naga Apparel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

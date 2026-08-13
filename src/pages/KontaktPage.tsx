import React from 'react';
import { ContactNewsletter } from '../components/ContactNewsletter';

export const KontaktPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#050505]">
      <ContactNewsletter />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5]">
            Kontakt & Links
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="p-6 rounded-xl bg-[#121212] border border-[#2a2a2a]">
              <h3 className="text-xl font-bold text-[#FF2D55] mb-4">Email</h3>
              <a
                href="mailto:chosenfewrecords@hotmail.de"
                className="text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors"
              >
                chosenfewrecords@hotmail.de
              </a>
            </div>

            <div className="p-6 rounded-xl bg-[#121212] border border-[#2a2a2a]">
              <h3 className="text-xl font-bold text-[#D4AF37] mb-4">Location</h3>
              <p className="text-[#A0A0A0]">
                Hamburg, St. Pauli<br />
                Germany
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

import { GoogleGenAI } from '@google/genai';

const FALLBACKS = [
  'Moin Moin! Auf der Reeperbahn nachts um halb zwei zählen keine Ausreden, sondern nur klare Ansagen!',
  'Mädel, wer im Rotlicht bestanden hat, dem macht das echte Leben nix mehr vor. Ehrlich währt am längsten!',
  'Guschel auf, Herz auf den Tisch: Keine Ausflüchte, keine Lügen. Das Leben ist zu kurz für Sugarcoating!',
  'Ein echter Freier lernt mehr fürs Leben als so mancher Student an der Uni. Hauptsache Haltung bewahren!',
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { category, customTopic } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const quote = FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
    res.json({ quote, source: 'fallback' });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Du bist die Gastgeberin des Hamburger Podcasts 'Wilde Muschel' (47 Jahre alt, ehemals auf St. Pauli im Rotlichtmilieu tätig, jetzt 100% echt, direkt, humorvoll, mit trockenem Hamburger Kiez-Charme).
Deine Sprache ist direkt, ungeschminkt, warmherzig, hanseatisch ("Moin", "Digga", "Kiez", "Guschel"), aber niemals vulgär oder böse.
Kategorie: ${category || 'Reeperbahn Real-Talk'}.
Thema/Stichwort: ${customTopic || 'Das echte Leben ohne Filter'}.

Gib einen kurzen, knackigen, authentischen Kiez-Spruch oder eine Anekdote (max. 3-4 Sätze) im typischen Wilde-Muschel-Tonfall aus.
Slogan-Motto: 'Wilde Guschel über ihre Muschel'.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      quote: response.text || 'Moin! Aufm Kiez wird nicht geschnackt, sondern Tacheles geredet!',
      source: 'gemini',
    });
  } catch (err) {
    console.error('Gemini API Error:', err);
    res.json({
      quote:
        'Moin Digga! Der Kiez-Funk hat kurz geknackt, aber die Wilde Muschel schwätzt trotzdem fröhlich weiter!',
      source: 'error-fallback',
    });
  }
}

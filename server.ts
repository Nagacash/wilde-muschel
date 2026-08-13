import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI lazily if key exists
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  };

  // API endpoint: Kiez-Guschel Spruch Generator / Interactive Quote from Wilde Muschel
  app.post("/api/kiez-quote", async (req, res) => {
    try {
      const { category, customTopic } = req.body || {};
      const ai = getAi();

      if (!ai) {
        // Fallback quotes if API key is not present
        const fallbacks = [
          "Moin Moin! Auf der Reeperbahn nachts um halb zwei zählen keine Ausreden, sondern nur klare Ansagen!",
          "Mädel, wer im Rotlicht bestanden hat, dem macht das echte Leben nix mehr vor. Ehrlich währt am längsten!",
          "Guschel auf, Herz auf den Tisch: Keine Ausflüchte, keine Lügen. Das Leben ist zu kurz für Sugarcoating!",
          "Ein echter Freier lernt mehr fürs Leben als so mancher Student an der Uni. Hauptsache Haltung bewahren!"
        ];
        const randomQuote = fallbacks[Math.floor(Math.random() * fallbacks.length)];
        return res.json({ quote: randomQuote, source: "fallback" });
      }

      const prompt = `Du bist die Gastgeberin des Hamburger Podcasts 'Wilde Muschel' (47 Jahre alt, zwei Jahre im Hamburger Rotlichtmilieu, danach hinter den Kulissen auf St. Pauli tätig, jetzt 100% echt, direkt, humorvoll, mit trockenem Hamburger Kiez-Charme).
Deine Sprache ist direkt, ungeschminkt, warmherzig, hanseatisch ("Moin", "Digga", "Kiez", "Guschel"), aber niemals vulgär oder böse.
Kategorie: ${category || 'Reeperbahn Real-Talk'}.
Thema/Stichwort: ${customTopic || 'Das echte Leben ohne Filter'}.

Gib einen kurzen, knackigen, authentischen Kiez-Spruch oder eine Anekdote (max. 3-4 Sätze) im typischen Wilde-Muschel-Tonfall aus.
Slogan-Motto: 'Wilde Guschel über ihre Muschel'.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const quoteText = response.text || "Moin! Aufm Kiez wird nicht geschnackt, sondern Tacheles geredet!";
      res.json({ quote: quoteText, source: "gemini" });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.json({
        quote: "Moin Digga! Der Kiez-Funk hat kurz geknackt, aber die Wilde Muschel schwätzt trotzdem fröhlich weiter!",
        source: "error-fallback"
      });
    }
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "Wilde Muschel Podcast" });
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Wilde Muschel] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log("Server initialized GoogleGenAI client successfully.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined. Falling back to local template compiler.");
}

// Global WhatsApp redirect number
const DEFAULT_WHATSAPP_NUMBER = "+447404499119"; // A high-end mock/real setting ready for user editing

// API: Server configuration settings
app.get("/api/settings", (req, res) => {
  res.json({
    whatsappNumber: process.env.WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER,
    hasGemini: !!ai,
  });
});

// Heuristics fallback function when Gemini is missing
function generateHeuristicsBrief(serviceId: string, details: any) {
  let assessment = "";
  let recommendations: string[] = [];
  let whatsappBrief = "";

  switch (serviceId) {
    case "wikipedia": {
      const name = details.brandName || "Brand / Individual";
      const industry = details.industry || "Technology & Consulting";
      const sourcesCount = parseInt(details.sourcesCount || "0");
      const hasTrademark = details.hasTrademark === "true" || details.hasTrademark === true;

      assessment = `Wikipedia creation feasibility for "${name}" is evaluated as MODERATE to HIGH based on external sources.`;
      recommendations = [
        `Ensure you have at least 3-4 distinct press features (Forbes, TechCrunch, Bloomberg, etc.) that have significant coverage about you.`,
        `The draft must adhere strictly to Wiki Neutral Point of View (NPOV) formatting without promotional hyperbole.`,
        `Consolidate all permanent references before submission.`
      ];

      whatsappBrief = `*WIKIPEDIA SITE INQUIRY* 🌐\n\n` +
        `• *Entity Name:* ${name}\n` +
        `• *Industry / Niche:* ${industry}\n` +
        `• *Press References:* ${sourcesCount} notable publications\n` +
        `• *Trademark Status:* ${hasTrademark ? "Registered Trademark Available" : "No Registered Trademark"}\n` +
        `• *Project Scope:* Authoritative biography & notable achievements page.\n\n` +
        `Please provide a quotation and starting timeline to initiate this campaign.`;
      break;
    }
    case "instagram-unban": {
      const username = details.username || "@client_handle";
      const followers = details.followers || "5,000+";
      const banReason = details.banReason || "Terms Violation / Impersonation / Unknown";
      const dateBanned = details.dateBanned || "Recent";

      assessment = `Unban appeal success for "${username}" looks promising via priority operational portals. Status: ACTIONABLE.`;
      recommendations = [
        `Locate dynamic email or utility bills matching the registered company/name of the account.`,
        `Prepare any government-issued photo ID that corresponds with face-match verification data if triggered.`,
        `Do not submit continuous client appeals through standard self-help forms right now, as this limits operational success.`
      ];

      whatsappBrief = `*ACCOUNT RECOVERY ADVOCACY* 🛡️\n\n` +
        `• *Account Username:* ${username}\n` +
        `• *Audience Reach:* ${followers} followers\n` +
        `• *Reported Accusation:* ${banReason}\n` +
        `• *Ban Incidence:* Banned around ${dateBanned}\n` +
        `• *Operation Request:* Accelerated administrative recovery and unban.\n\n` +
        `Let us initiate the priority portal verification instantly.`;
      break;
    }
    case "username-claim": {
      const requested = details.desiredUsername || "elite_handle";
      const platform = details.platform || "Instagram";
      const status = details.trademarkStatus || "None";
      const outline = details.aboutClaim || "Target account has been completely inactive for over 2 years.";

      assessment = `We can help check the feasibility to recover "${requested}" on ${platform}. Inactive or dead accounts can usually be transferred with direct partner support.`;
      recommendations = [
        `Show us any existing business profiles or website URLs that use this name.`,
        `If you have a registered trademark or corporate filing for the name, please have it ready.`,
        `Make sure the target username matches your brand name closely to ensure a smooth transfer.`
      ];

      whatsappBrief = `*PREMIUM USERNAME CLAIM* 💎\n\n` +
        `• *Requested Username:* @${requested.replace("@", "")}\n` +
        `• *Platform:* ${platform}\n` +
        `• *Trademark Status:* ${status === "yes" ? "Registered Trademark" : "No Registered Trademark"}\n` +
        `• *Account State:* ${outline}\n\n` +
        `We are ready to secure this username. Let us proceed with getting this brand handle transferred.`;
      break;
    }
    case "meta-verify": {
      const handle = details.handle || "@brand_handle";
      const category = details.category || "Public Figure / Media / Business";
      const pressCount = parseInt(details.pressCount || "0");

      assessment = `Meta Verification Advisory for "${handle}" suggests high readiness for Instant Verified badge integration.`;
      recommendations = [
        `Ensure your primary brand profile photo represents a clear, recognizable logo or portrait.`,
        `Align bios across Meta ecosystem to reflect matching descriptions and titles.`,
        `Prepare a dedicated company profile landing page to optimize external back-reference links.`
      ];

      whatsappBrief = `*META VERIFICATION CAMPAIGN* ⚡\n\n` +
        `• *Core Handle:* ${handle}\n` +
        `• *Professional Niche:* ${category}\n` +
        `• *Top-Tier Features:* ${pressCount} media placement links available\n\n` +
        `Initiating premium advisory for instant verification & blue check authority.`;
      break;
    }
    case "news-pr": {
      const theme = details.storyTheme || "Tech Innovations / Luxury Brand PR";
      const pubs = details.targetedPubs || "Forbes, Bloomberg, Business Insider";
      const timeline = details.timeline || "Within 30 Days";

      assessment = `Excellent media angle. PR placements on "${pubs}" will build maximum brand authority.`;
      recommendations = [
        `Draft 3 key narrative hooks which highlight genuine commercial or tech breakthroughs.`,
        `Prepare high-resolution corporate executive portraits to head the editorial features.`,
        `Align internal press rooms with corresponding media back-links.`
      ];

      whatsappBrief = `*NEWS PR & MEDIA PLACEMENT BRIEF* 📰\n\n` +
        `• *Press Theme / Subject:* ${theme}\n` +
        `• *Targeted Outlets:* ${pubs}\n` +
        `• *Preferred Release Window:* ${timeline}\n\n` +
        `Please compile the media outreach package and set up custom publisher bids.`;
      break;
    }
    default: {
      assessment = "Digital marketing and public relations inquiry ready for specialist review.";
      recommendations = [
        "Consist of clear commercial strategy files.",
        "Include target goals for direct consulting session."
      ];
      whatsappBrief = `*DIGITAL PR SERVICE ENQUIRY*\n\nService Details:\n${JSON.stringify(details, null, 2)}`;
    }
  }

  return { assessment, recommendations, whatsappBrief };
}

// API: Premium Brief Assessment Powered by Gemini
app.post("/api/generate-brief", async (req, res) => {
  const { serviceId, details } = req.body;

  if (!serviceId) {
    return res.status(400).json({ error: "Service ID is required" });
  }

  // If Gemini is not available, return high-fidelity heuristics compiler output
  if (!ai) {
    console.log("GEMINI_API_KEY is missing. Providing premium heuristics fallback output.");
    const fallback = generateHeuristicsBrief(serviceId, details);
    return res.json({
      ...fallback,
      isAiGenerated: false,
      message: "Generated via local PR matching heuristics."
    });
  }

  try {
    const prompt = `You are the Lead Digital Operations Director at Notorious Digital Media.
An interested client wants to use our service: "${serviceId}".
Here are the specifications they provided:
${JSON.stringify(details, null, 2)}

Provide a simple, clear, and easy to understand assessment, 3 direct recommendations, and a clean WhatsApp message brief.
IMPORTANT: You MUST write everything in plain, friendly, and non-complex language. Avoid complex tech terminology, overly fancy words (like "notoriety metrics", "Sovereign/Escalation", "namespaces"), or business jargon. Instead of "trademark claims" or "namespace claims", refer to them as "Username Claims".

Return the response as a valid, pure JSON object with this exact schema:
{
  "assessment": "Detailed 2-3 sentence clear and helpful analysis. Tell them if their project is feasible and what we can do next in simple terms.",
  "recommendations": [
    "Simple recommendation 1 on what they should prepare",
    "Simple recommendation 2 to help prepare details",
    "Simple recommendation 3 on standard timelines"
  ],
  "whatsappBrief": "A beautifully formatted WhatsApp message. Start with a direct title using emojis. Display all input details in bullet points using bold tags (e.g. *Desired Username:* details). Keep sentences short and clear, and finish with a friendly call-to-action to proceed."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are a digital media manager at Notorious Digital Media. You write clean, simple, and direct replies using easy-to-understand terms. You avoid complex technical words or intense business jargon at all times, responding with pure JSON only.",
      }
    });

    const jsonText = response.text ? response.text.trim() : "";
    if (!jsonText) {
      throw new Error("Empty response from Gemini");
    }

    const result = JSON.parse(jsonText);
    res.json({
      assessment: result.assessment,
      recommendations: result.recommendations,
      whatsappBrief: result.whatsappBrief,
      isAiGenerated: true
    });
  } catch (error) {
    console.error("Gemini API call failed, compiled fallback heuristics:", error);
    const fallback = generateHeuristicsBrief(serviceId, details);
    res.json({
      ...fallback,
      isAiGenerated: false,
      error: "AI Builder temporarily unavailable. Serving matching heuristics."
    });
  }
});

// Configure Vite or Static Assets based on environment
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware activated.");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(`Serving static files from ${distPath}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Digital PR & Marketing Agency Server launched at http://0.0.0.0:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error("Error launching server:", err);
});

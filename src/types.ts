export interface ServiceField {
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "number" | "select" | "textarea";
  options?: string[];
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  badge: string;
  iconName: string;
  featured: boolean;
  difficulty: "Guaranteed" | "High Success" | "Custom Scope";
  avgTimeline: string;
  startingPrice: string;
  gradient: string; // Tailwind gradient class
  glowColor: string; // Shadow glow color
  fields: ServiceField[];
}

export interface BriefResponse {
  assessment: string;
  recommendations: string[];
  whatsappBrief: string;
  emailSubject?: string;
  emailBody?: string;
  isAiGenerated: boolean;
  error?: string;
}

export interface AgencySettings {
  whatsappNumber: string;
  agencyEmail?: string;
  hasGemini: boolean;
}

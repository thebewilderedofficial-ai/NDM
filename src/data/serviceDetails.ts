export interface ServiceBenefitDetail {
  title: string;
  description: string;
  impactTag: string;
  iconType: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  duration: string;
  description: string;
}

export interface ServiceDetailExtended {
  id: string;
  heroHeadline: string;
  heroSubheadline: string;
  urgentHook: string;
  conversionPunch: string;
  detailedBenefits: ServiceBenefitDetail[];
  processSteps: ServiceProcessStep[];
  deliverables: string[];
  clientStats: { label: string; value: string; detail: string }[];
  maintenanceAvailable?: boolean;
  maintenanceDetails?: {
    title: string;
    description: string;
    features: string[];
    ctaText: string;
  };
  specificFaqs: { q: string; a: string }[];
  guaranteeText: string;
  whatsappPreset: string;
}

export const EXTENDED_SERVICE_DATA: Record<string, ServiceDetailExtended> = {
  "wikipedia": {
    id: "wikipedia",
    heroHeadline: "Command Maximum Digital Authority With a Wikipedia Page",
    heroSubheadline: "Wikipedia is the world's most trusted knowledge repository. A Wikipedia entry triggers your Google Knowledge Panel, elevates Google Search to #1, and cements unassailable legitimacy in the eyes of investors, partners, and clients.",
    urgentHook: "Over 82% of enterprise clients and high-net-worth investors search an executive's Wikipedia page before signing multi-million contracts.",
    conversionPunch: "Without Wikipedia, Google algorithms treat your brand as unverified. With Wikipedia, you become an indexed historical authority.",
    deliverables: [
      "Full independent notability audit & press source verification",
      "Neutral Point of View (NPOV) compliant biographical draft written by seasoned Wikipedia editors",
      "Manual submission through verified editorial review pipelines",
      "Direct Google Knowledge Graph entity linking & search panel trigger",
      "Permanent citation archive protection & talk page monitoring",
      "Includes 12 months of post-publishing maintenance & monitoring"
    ],
    detailedBenefits: [
      {
        title: "Guaranteed Google Knowledge Panel Trigger",
        description: "Google's Knowledge Graph algorithm sources over 78% of its entity facts directly from Wikipedia. A published page is the fastest way to lock your permanent right-hand Google Knowledge Panel.",
        impactTag: "+340% Search Prominence",
        iconType: "Sparkles"
      },
      {
        title: "Domain Authority 98 High-Value Citations",
        description: "Wikipedia carries a world-class DA 98 domain score. Backlinks and entity mentions from Wikipedia signal absolute relevance to every search engine and AI model.",
        impactTag: "Unshakeable SEO Footprint",
        iconType: "Globe"
      },
      {
        title: "Foundational AI Knowledge Training (Gemini & ChatGPT)",
        description: "Modern LLMs like Google Gemini, Claude, and ChatGPT are pre-trained on Wikipedia dumps. Having a page ensures AI assistants provide accurate, prestigious answers when users ask about you.",
        impactTag: "Future-Proof AI Identity",
        iconType: "Cpu"
      },
      {
        title: "Investor & High-Ticket Client Conversion",
        description: "High-net-worth clients, venture capital partners, and banks treat Wikipedia as institutional validation. Overcome scrutiny and close deals at higher valuations.",
        impactTag: "Instant Trust Seal",
        iconType: "ShieldCheck"
      },
      {
        title: "Reputation Shield & Narrative Control",
        description: "Take definitive control over your biographical narrative and history. Protect your brand from malicious competitor gossip or misinformed forum threads.",
        impactTag: "Permanent Defense",
        iconType: "Award"
      },
      {
        title: "Unlock Official Verification on Social Platforms",
        description: "Meta, TikTok, and X verify public figures whose notability is confirmed by active Wikipedia articles and verified media features.",
        impactTag: "Fast-Track Blue Checkmark",
        iconType: "BadgeCheck"
      }
    ],
    processSteps: [
      {
        step: "Phase 1",
        title: "Notability Deep-Dive & Source Audit",
        duration: "Days 1 - 4",
        description: "We analyze your existing media footprint (Forbes, TechCrunch, Bloomberg, etc.) against Wikipedia's strict General Notability Guidelines (GNG)."
      },
      {
        step: "Phase 2",
        title: "Drafting in Strict Encyclopedic Tone",
        duration: "Days 5 - 12",
        description: "Our certified encyclopedic copywriters construct a rigorous, neutral draft with inline citations to prevent speedy deletion flags."
      },
      {
        step: "Phase 3",
        title: "Editorial Portal Submission & Peer Review",
        duration: "Weeks 3 - 6",
        description: "The article is submitted through legitimate editorial channels with proactive responses to review queries until officially approved and indexed."
      },
      {
        step: "Phase 4",
        title: "Google Knowledge Panel Sync & Defense",
        duration: "Permanent",
        description: "We link your Wikipedia Wikidata item directly with your website and Google Knowledge Graph, monitoring against unauthorized edits."
      }
    ],
    clientStats: [
      { label: "Published Pages", value: "142+", detail: "Across business, tech, & arts" },
      { label: "Deletion Rate", value: "< 1.4%", detail: "Industry-leading survival rate" },
      { label: "Average Approval", value: "28 Days", detail: "Fast-track editorial review" },
      { label: "Knowledge Panel Rate", value: "96.8%", detail: "Google entity recognition" }
    ],
    maintenanceAvailable: true,
    maintenanceDetails: {
      title: "Already Have a Wikipedia Page? We Provide 24/7 Maintenance & Content Defense",
      description: "Over 68% of published Wikipedia pages experience vandalism, competitor edits, malicious neutrality flags, or deletion nominations. Our dedicated Wikipedia monitoring service protects your legacy around the clock.",
      features: [
        "24/7 Automated & Human Watchlist Monitoring: Instant alerts on any unauthorized modifications",
        "Competitor Sabotage Defense: Immediate reversion of smear edits, defamatory sentences, or unverified claims",
        "Deletion Discussion (AfD) Defense: Seasoned representation in Wikipedia talk pages to defend your page from deletion tags",
        "Milestone & Press Updates: Seamless addition of new acquisitions, funding rounds, press features, or executive awards",
        "Broken Link & Citation Repair: Ensuring all source links remain active and compliant with Wiki guidelines"
      ],
      ctaText: "Inquire About Wikipedia Page Maintenance"
    },
    specificFaqs: [
      {
        q: "What makes someone eligible for a Wikipedia page?",
        a: "Wikipedia requires 'significant coverage in reliable, independent secondary sources'. This means articles written about you in reputable newspapers or magazines (such as Forbes, Bloomberg, Business Insider, TechCrunch, or major regional dailies) where you or your business are the primary subject."
      },
      {
        q: "What if I don't have enough press articles yet?",
        a: "We offer bundled PR & Press Distribution packages that publish tier-1 and tier-2 journalistic articles about your accomplishments before drafting your Wikipedia page, ensuring you meet the notability threshold."
      },
      {
        q: "Can a published Wikipedia page get deleted?",
        a: "Pages written by inexperienced editors often get tagged for deletion due to promotional language or weak citations. We write strictly adhering to Wikipedia's Neutral Point of View (NPOV) and provide 24/7 ongoing maintenance to defend your page from deletion attempts."
      },
      {
        q: "Can you maintain or fix a page that is already live?",
        a: "Yes! We specialize in page maintenance, updating outdated information, adding recent career accomplishments, and cleaning up disputed notices or competitor vandalism."
      }
    ],
    guaranteeText: "100% Transparent Review. If we evaluate your notability profile as ineligible during intake, we provide a full honest appraisal and media pathway before starting.",
    whatsappPreset: "Hello Notorious Digital Media, I am interested in your Wikipedia Page Creation & Maintenance Support service. I would like to get an initial eligibility evaluation."
  },

  "instagram-unban": {
    id: "instagram-unban",
    heroHeadline: "Recover Your Banned or Disabled Instagram Account Directly",
    heroSubheadline: "Stop waiting for automatic appeal forms that get ignored by automated filters. As an agency partner, our requests are routed directly to human review desks at Meta operations, rescuing your brand assets, followers, and revenue stream in record time.",
    urgentHook: "Every day your Instagram page is disabled, your competitors capture your audience and you lose hard-earned customer trust.",
    conversionPunch: "Pay On Success Guarantee: You pay absolutely zero service fee unless your account is 100% unlocked and handed back to you.",
    deliverables: [
      "Direct escalation to Meta Internal Review Representatives",
      "Custom legal & regulatory appeal memorandum drafted specifically for your case",
      "Handling of false copyright strikes, impersonation flags, TOS locks, and 30-day disablements",
      "Restoration of full follower history, direct messages, content archives, and shop integrations",
      "Security audit & 2FA hardening to prevent repeat suspensions"
    ],
    detailedBenefits: [
      {
        title: "Direct Human Desk Routing (No Automated Bots)",
        description: "Standard in-app appeal forms are filtered by AI algorithms that automatically reject over 90% of appeals. We bypass automated filters and place your file directly before authorized reviewers.",
        impactTag: "Bypass Bot Filters",
        iconType: "ShieldCheck"
      },
      {
        title: "100% Pay On Success Guarantee",
        description: "We take on all operational risk. If we are unable to recover your account, you do not pay a single dollar for our service. Pure performance-driven confidence.",
        impactTag: "Zero Financial Risk",
        iconType: "Award"
      },
      {
        title: "Preserve Years of Follower & Brand Equity",
        description: "Rebuilding a lost audience from scratch costs thousands in advertising and months of lost momentum. Recovery preserves all your posts, engagement history, and active client DMs.",
        impactTag: "Save Your Investment",
        iconType: "TrendingUp"
      },
      {
        title: "Urgent 24-72 Hour Turnaround",
        description: "For critical business accounts during product launches or active revenue campaigns, we offer expedited tier escalations that get resolved in as little as 24 to 72 hours.",
        impactTag: "Rapid Crisis Control",
        iconType: "Clock"
      },
      {
        title: "Permanent Immunity Consultation",
        description: "Following account recovery, we provide an operational checklist to ensure your team never triggers spam triggers, shadowbans, or copyright infringement filters again.",
        impactTag: "Long-Term Protection",
        iconType: "Check"
      }
    ],
    processSteps: [
      {
        step: "Phase 1",
        title: "Forensic Suspension Audit",
        duration: "Hour 1 - 6",
        description: "We analyze the exact suspension code (TOS, Intellectual Property, Impersonation, or Artificial Engagement) and review prior submitted appeals."
      },
      {
        step: "Phase 2",
        title: "Direct Representative Escalation",
        duration: "Hours 6 - 24",
        description: "We compile an authoritative appeal dossier and route it directly through our agency tier channel into Meta Operations desks."
      },
      {
        step: "Phase 3",
        title: "Internal Human Review & Re-Activation",
        duration: "Day 2 - 5",
        description: "The reviewer verifies the case, clears the automated penalty flags, and restores the account to full active status."
      },
      {
        step: "Phase 4",
        title: "Handover & Security Hardening",
        duration: "Immediate",
        description: "You verify full account access, we confirm payment under our Pay on Success guarantee, and we implement security safeguards."
      }
    ],
    clientStats: [
      { label: "Restored Accounts", value: "380+", detail: "Businesses & creators" },
      { label: "Success Rate", value: "94.6%", detail: "Across complex ban categories" },
      { label: "Average Speed", value: "36 - 72 hrs", detail: "Expedited operational route" },
      { label: "Billing Model", value: "Pay On Success", detail: "Zero upfront fees" }
    ],
    specificFaqs: [
      {
        q: "What types of bans can you recover?",
        a: "We recover accounts disabled for Terms of Service (TOS) violations, artificial engagement flags, false copyright or trademark strikes, impersonation misidentifications, and accounts locked after 30-day appeal countdowns."
      },
      {
        q: "Do I have to give you my Instagram password?",
        a: "No! We do not need your password. The recovery takes place directly through Meta internal review pipelines using your username, linked email, and suspension identifiers."
      },
      {
        q: "How does the 'Pay On Success' guarantee work?",
        a: "You submit your account details for our initial assessment. Once we accept the case and recover your account, you verify you are logged in and operational before paying our invoice."
      }
    ],
    guaranteeText: "Pay On Success Guarantee: If your account cannot be recovered, you owe us nothing.",
    whatsappPreset: "Hello Notorious Digital Media, my Instagram account has been disabled/banned and I would like an urgent recovery assessment under your Pay On Success guarantee."
  },

  "username-claim": {
    id: "username-claim",
    heroHeadline: "Claim High-Value Inactive Usernames for Your Official Brand",
    heroSubheadline: "Own the exact handle that matches your business identity across Instagram, X (Twitter), TikTok, and YouTube. We legally transfer dead, abandoned, or squatted usernames directly to your official profile via direct media portal claims.",
    urgentHook: "A clunky handle like @brand_official_123 degrades your brand credibility and causes hundreds of potential clients to land on abandoned pages.",
    conversionPunch: "Clean handles command prestige, eliminate customer confusion, and dramatically elevate word-of-mouth conversion rates.",
    deliverables: [
      "Direct portal acquisition of inactive handles (2+ years zero activity)",
      "Multi-platform claims: Instagram, X / Twitter, TikTok, and YouTube",
      "Trademark priority matching and legal brand alignment",
      "Zero account reset: seamlessly replaces your existing username without losing a single follower or post",
      "Protection from future squatters and brand hijacking"
    ],
    detailedBenefits: [
      {
        title: "Immediate Global Brand Authority",
        description: "An exact-match handle (e.g. @YourBrand instead of @YourBrand_LLC_Official) conveys multi-million dollar institutional scale from the moment visitors land on your page.",
        impactTag: "First Impression Gold",
        iconType: "Sparkles"
      },
      {
        title: "Capture 100% of Natural Direct Search Traffic",
        description: "Customers search by exact brand name in social app search bars. If a dead username holds your name, you are actively leaking customer discovery to an abandoned profile.",
        impactTag: "Zero Traffic Leakage",
        iconType: "TrendingUp"
      },
      {
        title: "Seamless Handle Swap Without Losing Followers",
        description: "Our claim process is executed behind the scenes. Your current profile simply receives the coveted handle while retaining all your existing posts, followers, and messages.",
        impactTag: "Zero Disruption",
        iconType: "Check"
      },
      {
        title: "Trademark Priority Protection",
        description: "If you own a registered trademark or pending business registration, our legal agency team leverages enterprise IP priority mechanisms to secure rightful ownership.",
        impactTag: "IP Enforcement",
        iconType: "ShieldCheck"
      }
    ],
    processSteps: [
      {
        step: "Phase 1",
        title: "Target Inactivity & Feasibility Audit",
        duration: "Day 1 - 2",
        description: "We run deep API queries on the target handle to confirm inactivity duration, lack of verification shields, and transfer feasibility."
      },
      {
        step: "Phase 2",
        title: "Brand Documentation & IP Alignment",
        duration: "Day 3 - 4",
        description: "We assemble your brand proof, trademark registrations, or company incorporation documents to establish prima facie entitlement."
      },
      {
        step: "Phase 3",
        title: "Enterprise Portal Submission",
        duration: "Days 5 - 12",
        description: "We initiate the transfer request through our direct media partner portal with platform legal and policy officers."
      },
      {
        step: "Phase 4",
        title: "Handle Swap & Activation",
        duration: "Day 14",
        description: "The target handle is released and instantly bound to your target account. Your team celebrates your new prestige digital identity."
      }
    ],
    clientStats: [
      { label: "Usernames Claimed", value: "410+", detail: "Rare & exact-match handles" },
      { label: "Platforms Supported", value: "4 Major", detail: "Instagram, X, TikTok, YouTube" },
      { label: "Average Cycle", value: "7 - 14 Days", detail: "Enterprise portal turnaround" },
      { label: "Safe Claiming", value: "100%", detail: "Legitimate transfer procedures" }
    ],
    specificFaqs: [
      {
        q: "What usernames can be claimed?",
        a: "We can claim usernames that have been inactive for an extended period (typically 18 to 24+ months without public posts or activity) and that do not hold active trademark shields or verified badges."
      },
      {
        q: "Do I need a trademark to claim a username?",
        a: "Having a trademark significantly speeds up the claim and increases success rate, but it is not strictly required. We have secured hundreds of handles through direct partner inactivity claims without prior trademarks."
      },
      {
        q: "Can you claim active accounts?",
        a: "No. We strictly adhere to platform policies and cannot seize active, verified, or actively maintained accounts."
      }
    ],
    guaranteeText: "Transparent feasibility evaluation: If a handle cannot be claimed due to recent activity, we inform you upfront within 24 hours.",
    whatsappPreset: "Hello Notorious Digital Media, I would like to claim an inactive username for my brand. Here is the handle I want: "
  },

  "meta-verify": {
    id: "meta-verify",
    heroHeadline: "Secure the Blue Checkmark: Official Verification Guidance",
    heroSubheadline: "The verified blue badge is the ultimate seal of public interest, trust, and authenticity on Instagram and Facebook. We build your press dossier, optimize your digital footprint, and submit your application through guaranteed partner review channels.",
    urgentHook: "Fake profiles, impersonators, and phishing clones damage your reputation. The blue checkmark protects your identity and proves you are the authentic source.",
    conversionPunch: "Verified accounts enjoy up to 3x higher direct message response rates, top-of-comment placement, and enhanced algorithmic trust.",
    deliverables: [
      "Complete notability dossier curation tailored to Meta's public figure guidelines",
      "Editorial press link curation & PR alignment to satisfy notability criteria",
      "Profile SEO overhaul (Bio, external link structure, category selection)",
      "Direct portal submission through authorized agency partner desks",
      "Immediate re-appeal coordination if ever challenged"
    ],
    detailedBenefits: [
      {
        title: "Dominant Comment & DM Priority",
        description: "Verified profiles automatically float to the top of comment sections on high-traffic posts and land directly in the primary inbox of executives and creators.",
        impactTag: "Top Priority Visibility",
        iconType: "Sparkles"
      },
      {
        title: "Impersonation Immunity",
        description: "Scammers frequently duplicate profiles of founders and coaches. The official blue checkmark alerts your customers instantly to the one true account.",
        impactTag: "Client Trust Defense",
        iconType: "ShieldCheck"
      },
      {
        title: "Elevated Brand Partnership Rates",
        description: "Verified influencers, creators, and agency owners command between 2x and 5x higher sponsorship and consulting fees due to established public stature.",
        impactTag: "Monetization Multiplier",
        iconType: "TrendingUp"
      },
      {
        title: "Algorithm Favorability & Reach",
        description: "Verified accounts receive higher trust scores in recommendation engines, helping reels and explore placements reach genuine prospective clients.",
        impactTag: "Organic Reach Surge",
        iconType: "Award"
      }
    ],
    processSteps: [
      {
        step: "Phase 1",
        title: "Eligibility & Media Footprint Audit",
        duration: "Day 1",
        description: "We evaluate your current press coverage, Google Knowledge Graph presence, and identify any missing notability criteria."
      },
      {
        step: "Phase 2",
        title: "Profile Optimization & Identity Package",
        duration: "Day 2",
        description: "We re-align your bio, category tags, link anchors, and submit national ID credentials according to Meta's strict formatting standards."
      },
      {
        step: "Phase 3",
        title: "Partner Channel Submission",
        duration: "Days 3 - 4",
        description: "Your comprehensive verification application is dispatched directly to senior partner review teams."
      },
      {
        step: "Phase 4",
        title: "Badge Approval & Celebration",
        duration: "Day 5",
        description: "The coveted blue checkmark appears beside your name across Instagram and Facebook."
      }
    ],
    clientStats: [
      { label: "Verified Accounts", value: "290+", detail: "Executives, artists, & founders" },
      { label: "Approval Rate", value: "98.2%", detail: "For audited & qualified files" },
      { label: "Decision Window", value: "2 - 5 Days", detail: "Direct agency portal speed" },
      { label: "Badge Durability", value: "100%", detail: "Permanent legitimate badge" }
    ],
    specificFaqs: [
      {
        q: "What is the difference between this and Meta Verified subscription?",
        a: "Meta Verified subscription is a paid monthly subscription that requires your legal name and shows a basic badge. Our service secures legacy public-interest verification based on authentic press notability, allowing you to use your business brand name without monthly subscription handcuffs."
      },
      {
        q: "What if I don't have news articles yet?",
        a: "We pair verification applications with our Press & Media PR package to place articles in authoritative news publications first, building the required proof of notability."
      }
    ],
    guaranteeText: "Clear Pre-Qualification: We only submit your dossier once our compliance team confirms you meet 100% of Meta's public figure criteria.",
    whatsappPreset: "Hello Notorious Digital Media, I want to get verified on Instagram/Facebook with an official blue checkmark. Please audit my profile."
  },

  "news-pr": {
    id: "news-pr",
    heroHeadline: "Get Featured on Tier-1 News Outlets (Forbes, Bloomberg & TechCrunch)",
    heroSubheadline: "Guaranteed high-authority press placements that elevate your Google ranking, build undisputed credibility, and fulfill the strict notability prerequisites for Wikipedia and social media verification.",
    urgentHook: "Prospective buyers and investors Google your name before doing business. What does the first page of Google say about you right now?",
    conversionPunch: "A single feature in an authoritative publication provides permanent digital proof of your leadership and delivers high-DA backlinks forever.",
    deliverables: [
      "Guaranteed publishing on top-tier global news networks (Forbes, Bloomberg, TechCrunch, Business Insider)",
      "High-authority editorial articles crafted by seasoned investigative and financial journalists",
      "Permanent do-follow and contextual backlinks that rocket your website's search ranking",
      "Full syndication across major digital news wires (AP News, Yahoo Finance, MarketWatch)",
      "Social proof badge kit ('As Featured In...') for your website and landing pages"
    ],
    detailedBenefits: [
      {
        title: "Instant 'As Seen On' Credibility",
        description: "Place the logos of Forbes, Bloomberg, and Reuters directly on your website hero section. Studies show this boosts landing page conversion rates by up to 48%.",
        impactTag: "+48% Conversion Lift",
        iconType: "Sparkles"
      },
      {
        title: "Permanent SEO Backlinks from High-DA Sites",
        description: "Articles published on Domain Authority 90+ news portals pass powerful link equity to your domain, pushing your main website into the top positions on Google.",
        impactTag: "Top Google Search Rank",
        iconType: "TrendingUp"
      },
      {
        title: "Foundation for Wikipedia & Verification",
        description: "You cannot get a Wikipedia page or legacy blue checkmark without independent press coverage. Our PR packages provide the exact citations required.",
        impactTag: "Unlock All Other Portals",
        iconType: "Award"
      },
      {
        title: "Control Your Search Results Reputation",
        description: "Flood page one of Google with prestigious, positive editorial coverage about your career and brand, pushing outdated or negative mentions off the first page.",
        impactTag: "Reputation Dominance",
        iconType: "ShieldCheck"
      }
    ],
    processSteps: [
      {
        step: "Phase 1",
        title: "Angle & Narrative Architecture",
        duration: "Days 1 - 3",
        description: "Our senior PR strategists interview you to uncover compelling story hooks, industry insights, and notable company achievements."
      },
      {
        step: "Phase 2",
        title: "Journalistic Writing & Editorial Review",
        duration: "Days 4 - 8",
        description: "Experienced writers draft magazine-style features tailored precisely to the editorial guidelines of target publications."
      },
      {
        step: "Phase 3",
        title: "Direct Placement & Editorial Approval",
        duration: "Days 9 - 16",
        description: "The feature is placed with our network of partner editors, verified, and officially scheduled for publication."
      },
      {
        step: "Phase 4",
        title: "Publication, Syndication & Live Links",
        duration: "Day 18 - 20",
        description: "Your article goes live! You receive live links, syndication proofs, and high-resolution publication logos for your brand assets."
      }
    ],
    clientStats: [
      { label: "Articles Published", value: "1,200+", detail: "Across Tier-1 and Tier-2 media" },
      { label: "Media Network", value: "350+ Outlets", detail: "Global business & tech portals" },
      { label: "Placement Guarantee", value: "100%", detail: "Guaranteed publication contracts" },
      { label: "Syndication Reach", value: "10M+ Readers", detail: "Combined monthly readership" }
    ],
    specificFaqs: [
      {
        q: "Are these placements guaranteed?",
        a: "Yes! Unlike traditional PR agencies that bill large monthly retainers with no guarantee of coverage, our agency works on guaranteed placement contracts. If we accept your story, we guarantee it will be published or you receive a full refund."
      },
      {
        q: "Do I get to approve the article before it goes live?",
        a: "Always. You have 100% editorial review and sign-off on the written copy, quotes, and bio details before submission."
      },
      {
        q: "Do these articles stay up permanently?",
        a: "Yes. All our media features are permanent editorial publications archived in the publication's official index."
      }
    ],
    guaranteeText: "100% Placement Guarantee: We deliver the exact media publication agreed upon or you are fully refunded.",
    whatsappPreset: "Hello Notorious Digital Media, I want to get featured on major news platforms (Forbes, Bloomberg, etc.) to boost my brand and PR footprint."
  },
  "web-development": {
    id: "web-development",
    heroHeadline: "Bespoke Web Development & High-Conversion Digital Infrastructure",
    heroSubheadline: "Command instant authority online with precision-engineered web portals, corporate platforms, and conversion funnels built with modern stacks (React, Next.js, Tailwind). Optimized for lightning speed, technical SEO, and seamless lead acquisition.",
    urgentHook: "75% of consumers judge a company's credibility and executive pedigree based solely on their website design and responsiveness.",
    conversionPunch: "A slow, outdated website actively burns high-ticket clients. Our web engineering turns casual visitors into booked retainers.",
    deliverables: [
      "Custom responsive UI/UX design crafted with mobile-first precision",
      "Modern full-stack engineering (React, Next.js, Node.js, Tailwind CSS)",
      "Technical SEO foundation (JSON-LD schema, OpenGraph tags, sitemap & metadata)",
      "Interactive consultation workflows, client portals & automated quotation flows",
      "SSL security hardening, HTTPS encryption, domain DNS setup & Cloud CDN deployment",
      "Post-launch technical support, maintenance & speed optimization"
    ],
    detailedBenefits: [
      {
        title: "Bespoke Modern Architecture",
        description: "Zero generic cookie-cutter WordPress bloat. We engineer clean, modular, ultra-responsive web applications that load in under 1 second.",
        impactTag: "< 1s Global Load Speeds",
        iconType: "Cpu"
      },
      {
        title: "Conversion-Engineered UX",
        description: "Every layout, CTA, and interactive tool is strategically mapped to direct high-intent prospects straight into your WhatsApp or email inbox.",
        impactTag: "+320% Lead Conversion",
        iconType: "TrendingUp"
      },
      {
        title: "Comprehensive Technical SEO & Schema",
        description: "Built with Google-first semantic markup, OpenGraph social sharing preview cards, JSON-LD structured schemas, and full Google Lighthouse optimization.",
        impactTag: "100 Lighthouse Performance",
        iconType: "Globe"
      },
      {
        title: "Enterprise Security & Global CDN",
        description: "Hardened against DDoS, malicious scraping, and downtime with Cloudflare CDN routing, SSL certification, and zero-vulnerability frameworks.",
        impactTag: "99.99% Uptime SLA",
        iconType: "ShieldCheck"
      }
    ],
    processSteps: [
      {
        step: "Phase 1",
        title: "Architecture & Wireframe Blueprint",
        duration: "Days 1 - 3",
        description: "We map your brand narrative, target audience profile, required interactive flows, and conversion goals into visual wireframes."
      },
      {
        step: "Phase 2",
        title: "Bespoke UI/UX Design & Prototyping",
        duration: "Days 4 - 8",
        description: "Crafting modern, high-contrast dark/light visuals with refined typography, custom 3D iconography, and fluid layout motion."
      },
      {
        step: "Phase 3",
        title: "Full-Stack Code Development",
        duration: "Days 9 - 18",
        description: "Developing clean, type-safe code with responsive layouts, interactive tools, quote engines, and API integrations."
      },
      {
        step: "Phase 4",
        title: "Speed Optimization, SEO & Deployment",
        duration: "Days 19 - 21",
        description: "Running rigorous cross-device audits, configuring domain DNS, SSL security, XML sitemaps, and handing over full source code."
      }
    ],
    clientStats: [
      { label: "Platforms Delivered", value: "85+", detail: "Agencies, SaaS, & luxury brands" },
      { label: "Lighthouse Score", value: "98/100", detail: "Industry-leading performance" },
      { label: "Average Delivery", value: "2 - 3 Weeks", detail: "Rapid agile development" },
      { label: "Mobile Optimization", value: "100%", detail: "Flawless on all screen sizes" }
    ],
    specificFaqs: [
      {
        q: "What tech stack do you use for web development?",
        a: "We specialize in modern frontend and full-stack technologies including React, Next.js, TypeScript, Tailwind CSS, and Node.js. For clients who require custom CMS capabilities or static generation, we implement headless architectures with zero security bloat."
      },
      {
        q: "Do you provide hosting and domain setup?",
        a: "Yes! We handle the entire deployment pipeline—connecting your custom domain, configuring SSL/HTTPS encryption, setting up Cloudflare CDN, and ensuring optimal server routing."
      },
      {
        q: "Will my website look great on phones and tablets?",
        a: "Every project is developed with a strict mobile-first methodology. Your website will be fully responsive, pixel-perfect, and ultra-smooth across iPhones, Androids, iPads, and high-resolution desktop monitors."
      },
      {
        q: "Do I own 100% of the code and website assets?",
        a: "Absolutely. Once the project is completed, all intellectual property, source code, design files, and deployment accounts belong 100% to you."
      }
    ],
    guaranteeText: "100% Satisfaction Guarantee: We provide revision cycles until your web portal matches your exact specifications and brand standards.",
    whatsappPreset: "Hello Notorious Digital Media, I want to discuss building a modern website / web application for my brand. Please share your portfolio and pricing."
  }
};

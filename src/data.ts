import { Service } from "./types";

export const SERVICES_DATA: Service[] = [
  {
    id: "wikipedia",
    title: "Wikipedia Page Creation",
    tagline: "Publish your biographical or brand presence on Wikipedia",
    description: "We write and publish professional Wikipedia articles for brands, business owners, and creators. We verify your links and help you trigger a Google Knowledge Panel on web search.",
    benefits: [
      "Helps you get a Google Knowledge Panel",
      "Gives your brand high search ranking on Google",
      "Written clearly to meet Wikipedia standards",
      "Safe and monitored page draft submission"
    ],
    badge: "Knowledge Authority",
    iconName: "Globe",
    featured: true,
    difficulty: "Custom Scope",
    avgTimeline: "4 - 8 Weeks",
    startingPrice: "Contact Us for Quote",
    gradient: "from-blue-600 via-indigo-600 to-violet-700",
    glowColor: "rgba(99, 102, 241, 0.45)",
    fields: [
      {
        name: "brandName",
        label: "Your Name or Brand Name",
        placeholder: "e.g., John Smith, Acme Agency",
        type: "text"
      },
      {
        name: "industry",
        label: "Your Business or Field",
        placeholder: "e.g., Software, real estate, arts",
        type: "text"
      },
      {
        name: "sourcesCount",
        label: "How many news articles are written about you?",
        placeholder: "Select...",
        type: "select",
        options: ["None yet", "1 to 3 news articles", "4 to 8 news articles", "More than 8 articles"]
      },
      {
        name: "hasTrademark",
        label: "Do you own a registered trademark?",
        placeholder: "Select...",
        type: "select",
        options: ["Yes, I have a registered brand trademark", "Trademark is pending or filed", "No trademark"]
      },
      {
        name: "briefOutline",
        label: "Major achievements or history",
        placeholder: "Briefly explain what makes your brand or yourself notable...",
        type: "textarea"
      }
    ]
  },
  {
    id: "instagram-unban",
    title: "Instagram Unban & Recovery",
    tagline: "Get your disabled or banned accounts back",
    description: "We help you recover banned, disabled, or locked social media accounts. We guide you through the process step-by-step and help bypass automatic appeals.",
    benefits: [
      "Help with disabled and locked pages",
      "Very high success rate for businesses",
      "Protection from false copyright claims",
      "No payment requested unless we succeed"
    ],
    badge: "Account Recovery",
    iconName: "ShieldCheck",
    featured: true,
    difficulty: "High Success",
    avgTimeline: "3 - 7 Days",
    startingPrice: "Pay on Success",
    gradient: "from-pink-600 via-rose-500 to-amber-500",
    glowColor: "rgba(244, 63, 94, 0.45)",
    fields: [
      {
        name: "username",
        label: "Instagram Username",
        placeholder: "e.g., @john_smith",
        type: "text"
      },
      {
        name: "followers",
        label: "Follower Count",
        placeholder: "e.g., 10,000",
        type: "text"
      },
      {
        name: "banReason",
        label: "Why was the account banned?",
        placeholder: "Select...",
        type: "select",
        options: [
          "Copyright or brand violation",
          "Impersonation issues",
          "Terms and rules violations",
          "Rules on engagement",
          "Banned for no clear reason"
        ]
      },
      {
        name: "dateBanned",
        label: "When was it banned?",
        placeholder: "e.g., 2 weeks ago",
        type: "text"
      },
      {
        name: "history",
        label: "Previous Appeals",
        placeholder: "Have you submitted an appeal or hired anyone else? Please explain...",
        type: "textarea"
      }
    ]
  },
  {
    id: "username-claim",
    title: "Username Claims",
    tagline: "Claim inactive and dead usernames for your brand",
    description: "Get inactive, locked, or dead usernames on Instagram, Twitter, TikTok, or YouTube transferred directly to your business profile.",
    benefits: [
      "Claim short or high-value usernames",
      "Protect your brand name from inactive pages",
      "Simple and secure claiming process",
      "Safe setup with direct brand support"
    ],
    badge: "Username Claim",
    iconName: "Sparkles",
    featured: true,
    difficulty: "High Success",
    avgTimeline: "7 - 14 Days",
    startingPrice: "Custom Quote",
    gradient: "from-teal-500 via-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.45)",
    fields: [
      {
        name: "desiredUsername",
        label: "The Username You Want",
        placeholder: "e.g., Acme (without the @)",
        type: "text"
      },
      {
        name: "platform",
        label: "Which App / Platform?",
        placeholder: "Select...",
        type: "select",
        options: ["Instagram", "Twitter / X", "TikTok", "YouTube Handle"]
      },
      {
        name: "trademarkStatus",
        label: "Do you own a trademark for this name?",
        placeholder: "Select...",
        type: "select",
        options: [
          "Yes, I own a registered trademark",
          "Trademark filed and pending",
          "No registered trademark"
        ]
      },
      {
        name: "aboutClaim",
        label: "Current state of the targeted account",
        placeholder: "e.g., Has 0 posts, inactive since 2019, 0 followers...",
        type: "textarea"
      }
    ]
  },
  {
    id: "meta-verify",
    title: "Social Verification Advice",
    tagline: "Get verified on Instagram and Facebook",
    description: "We help you style your profile, fix documentation, and coordinate articles to submit a successful application for the blue checkmark.",
    benefits: [
      "Organize profile links for high success",
      "Guide you on required media articles",
      "Submitted through Media Portal",
      "Continuous audit to protect your badge"
    ],
    badge: "Blue Checkmark",
    iconName: "BadgeCheck",
    featured: false,
    difficulty: "Guaranteed",
    avgTimeline: "2 - 5 Days",
    startingPrice: "Consultation Form",
    gradient: "from-indigo-500 via-sky-500 to-emerald-500",
    glowColor: "rgba(56, 189, 248, 0.45)",
    fields: [
      {
        name: "handle",
        label: "Target Username Handle",
        placeholder: "e.g., @acme_official",
        type: "text"
      },
      {
        name: "category",
        label: "Profile Type",
        placeholder: "Select...",
        type: "select",
        options: ["Public Figure or influencer", "Company, Startup or Tech Brand", "Artist, Musician or Actor", "News Website or Publisher"]
      },
      {
        name: "pressCount",
        label: "Links to articles about you",
        placeholder: "Paste up to 3 links to articles about your brand (optional)",
        type: "textarea"
      }
    ]
  },
  {
    id: "news-pr",
    title: "Press & Media PR",
    tagline: "Get featured on major news websites",
    description: "Get news articles about your company published on high-ranking press networks. This increases trust, SEO rankings, and helps you get verified.",
    benefits: [
      "Guaranteed publishing on top news platforms",
      "Increases customer trust and brand credibility",
      "Better ranking for your website on Google search",
      "Professional story writing and outreach"
    ],
    badge: "Media PR",
    iconName: "Newspaper",
    featured: false,
    difficulty: "Guaranteed",
    avgTimeline: "10 - 20 Days",
    startingPrice: "Sized Packages",
    gradient: "from-slate-800 via-zinc-950 to-neutral-900",
    glowColor: "rgba(24, 24, 27, 0.6)",
    fields: [
      {
        name: "storyTheme",
        label: "Your Story or Announcement topic",
        placeholder: "e.g., launching a new product, funding announcement, brand story...",
        type: "textarea"
      },
      {
        name: "targetedPubs",
        label: "Preferred News Websites",
        placeholder: "e.g., tech blogs, business news, generalized newspapers...",
        type: "text"
      },
      {
        name: "timeline",
        label: "Preferred Publishing Timeframe",
        placeholder: "Select...",
        type: "select",
        options: ["Urgent (within 1-2 weeks)", "Standard (3-5 weeks)", "Ongoing campaigns"]
      }
    ]
  },
  {
    id: "web-development",
    title: "Web Development & Digital Portals",
    tagline: "High-performance websites, web apps & agency portals",
    description: "Custom, ultra-fast web development built for founders, elite brands, and digital agencies. Designed for high conversion, robust SEO, and bespoke user experiences.",
    benefits: [
      "Custom responsive design engineered for all devices",
      "Full SEO foundation, structured schemas & performance tuning",
      "Interactive client portals, CRM & quotation flows",
      "Secure hosting, HTTPS, and domain deployment support"
    ],
    badge: "Web Solutions",
    iconName: "Globe",
    featured: false,
    difficulty: "Custom Scope",
    avgTimeline: "2 - 4 Weeks",
    startingPrice: "Custom Quote",
    gradient: "from-cyan-900 via-blue-950 to-indigo-950",
    glowColor: "rgba(6, 182, 212, 0.45)",
    fields: [
      {
        name: "projectType",
        label: "Website or App Type",
        placeholder: "Select...",
        type: "select",
        options: [
          "Agency or Corporate Portfolio Website",
          "Custom Web Application / Client Portal",
          "High-Conversion Landing Page / Sales Funnel",
          "E-Commerce / Brand Storefront"
        ]
      },
      {
        name: "brandName",
        label: "Brand or Company Name",
        placeholder: "e.g., Acme International, John Doe Brand",
        type: "text"
      },
      {
        name: "currentWebsite",
        label: "Existing Website Link (if redesign)",
        placeholder: "e.g., https://yourcurrentsite.com (optional)",
        type: "text"
      },
      {
        name: "requirements",
        label: "Core Features & Specific Requirements",
        placeholder: "Explain what functionality, integrations, or design aesthetic you need...",
        type: "textarea"
      },
      {
        name: "targetLaunch",
        label: "Target Launch Timeline",
        placeholder: "Select...",
        type: "select",
        options: ["Urgent (within 2 weeks)", "Standard (3 to 6 weeks)", "Flexible / Planning Phase"]
      }
    ]
  }
];


// All editable website text lives here.
// Defaults below are what the site shows until the admin saves changes
// from Admin → Website Content. Saved values are stored as one JSON object
// in the `settings` table under the key `site_content`.

export type SiteContent = Record<string, string>;

export type ContentField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "list"; // list = one item per line
  default: string;
};

export type ContentSection = {
  id: string;
  title: string;
  description: string;
  fields: ContentField[];
};

export const SITE_CONTENT_KEY = "site_content";

export const CONTENT_SCHEMA: ContentSection[] = [
  {
    id: "banner",
    title: "Safety Banner",
    description: "Red emergency strip at the very top of the page",
    fields: [
      { key: "banner.badge", label: "Badge", default: "IMMEDIATE SAFETY" },
      { key: "banner.message", label: "Message (desktop)", type: "textarea", default: "If you or someone you love is experiencing an acute psychological crisis or self-harm emergency, please dial:" },
      { key: "banner.message_mobile", label: "Message (mobile)", default: "In crisis? Call now:" },
      { key: "banner.helpline1_name", label: "Helpline 1 name", default: "Tele-MANAS" },
      { key: "banner.helpline1_number", label: "Helpline 1 number", default: "14416" },
      { key: "banner.helpline2_name", label: "Helpline 2 name", default: "Vandrevala" },
      { key: "banner.helpline2_number", label: "Helpline 2 number", default: "+91 9999 666 555" },
      { key: "banner.note", label: "Note", default: "(24x7 Free & Confidential)" },
    ],
  },
  {
    id: "nav",
    title: "Navigation Bar",
    description: "Top menu labels and buttons",
    fields: [
      { key: "nav.about", label: "About link", default: "About" },
      { key: "nav.specializations", label: "Specializations link", default: "Specializations" },
      { key: "nav.quiz", label: "Quiz link", default: "Match Quiz" },
      { key: "nav.services", label: "Services link", default: "Services & Fees" },
      { key: "nav.clinic", label: "Clinic link", default: "Gurgaon Clinic" },
      { key: "nav.feedback", label: "Feedback link", default: "Feedback" },
      { key: "nav.mindful", label: "Mindful Space link", default: "Mindful Space" },
      { key: "nav.free_call", label: "Free call button", default: "Free 15-Min Call" },
      { key: "nav.book", label: "Book button", default: "Book Session" },
    ],
  },
  {
    id: "hero",
    title: "Hero (Top Section)",
    description: "Main heading, intro and profile card",
    fields: [
      { key: "hero.badge", label: "Badge", default: "Accepting New In-Person & Online Clients" },
      { key: "hero.heading", label: "Heading", default: "Find Healing, Rebuild Boundaries, &" },
      { key: "hero.heading_highlight", label: "Heading (blue part)", default: "Pause for Love." },
      { key: "hero.description", label: "Description", type: "textarea", default: "A confidential, evidence-informed therapeutic sanctuary led by Neha, M.A. Psychology. Specializing in recovery from narcissistic abuse, restoring relationship intimacy, and rediscovering peaceful emotional autonomy." },
      { key: "hero.cta_primary", label: "Primary button", default: "Book 1-Hour Session" },
      { key: "hero.cta_secondary", label: "Secondary button", default: "Take Therapy Match Quiz" },
      { key: "hero.cred1_title", label: "Credential 1 title", default: "M.A. Psychology" },
      { key: "hero.cred1_text", label: "Credential 1 text", default: "Clinical Counseling Spec" },
      { key: "hero.cred2_title", label: "Credential 2 title", default: "100% Confidential" },
      { key: "hero.cred2_text", label: "Credential 2 text", default: "Protected Safe Space" },
      { key: "hero.cred3_title", label: "Credential 3 title", default: "Hybrid Practice" },
      { key: "hero.cred3_text", label: "Credential 3 text", default: "Gurgaon Clinic & Zoom" },
      { key: "hero.name", label: "Therapist name", default: "Neha" },
      { key: "hero.title", label: "Therapist title", default: "M.A. Psychology | Counselling Therapist" },
      { key: "hero.experience", label: "Experience line", default: "8+ Years Clinical Experience" },
      { key: "hero.quote", label: "Quote", type: "textarea", default: "Recovery is not about becoming who you were before trauma; it is about gently shedding who you had to be to survive it." },
      { key: "hero.stat1_value", label: "Stat 1 value", default: "1,200+" },
      { key: "hero.stat1_label", label: "Stat 1 label", default: "Hours Held" },
      { key: "hero.stat2_value", label: "Stat 2 value", default: "100%" },
      { key: "hero.stat2_label", label: "Stat 2 label", default: "Non-Judgmental" },
      { key: "hero.stat3_value", label: "Stat 3 value", default: "Mon–Fri" },
      { key: "hero.stat3_label", label: "Stat 3 label", default: "9 AM – 5 PM" },
      { key: "hero.booking_note", label: "Booking note", default: "Advance booking required • Strict 16h cancellation window" },
    ],
  },
  {
    id: "about",
    title: "About Therapist",
    description: "Bio, quote and ethics principles",
    fields: [
      { key: "about.badge", label: "Badge", default: "About Your Therapist" },
      { key: "about.heading", label: "Heading", default: "Meet Neha, M.A." },
      { key: "about.heading_italic", label: "Heading (italic part)", default: "Psychology" },
      { key: "about.bio1", label: "Bio paragraph 1", type: "textarea", default: "I believe that therapy is not about fixing what is broken; it is about uncovering the intrinsic wisdom and resilience that life trauma, toxic relationships, and chronic stress have obscured." },
      { key: "about.bio2", label: "Bio paragraph 2", type: "textarea", default: "Holding a Master's degree in Psychology with specialized post-graduate training in trauma-informed counseling and cognitive behavioral interventions, I combine clinical rigor with authentic human presence. I have helped hundreds of survivors of narcissistic abuse, divorce, panic disorders, and deep family estrangements rebuild their lives from a place of grounded self-worth." },
      { key: "about.quote", label: "Quote", default: "When you pause for love, you start with yourself." },
      { key: "about.ethics_heading", label: "Ethics heading", default: "Clinical Ethics" },
      { key: "about.ethics_heading_italic", label: "Ethics heading (italic part)", default: "& Standards" },
      { key: "about.ethics_intro", label: "Ethics intro", default: "The non-negotiable principles anchoring every interaction:" },
      { key: "about.ethic1_title", label: "Principle 1 title", default: "Strict Confidentiality Guarantee" },
      { key: "about.ethic1_text", label: "Principle 1 text", type: "textarea", default: "Everything shared within sessions or through our intake portal is fully confidential under standard psychological ethics." },
      { key: "about.ethic2_title", label: "Principle 2 title", default: "Zero-Gaslighting, Affirming Space" },
      { key: "about.ethic2_text", label: "Principle 2 text", type: "textarea", default: "Your experiences and emotional truths will never be minimized or doubted." },
      { key: "about.ethic3_title", label: "Principle 3 title", default: "Client-Paced Progression" },
      { key: "about.ethic3_text", label: "Principle 3 text", type: "textarea", default: "You retain full agency over which memories, relationships, or coping systems we open up during each session." },
    ],
  },
  {
    id: "focus",
    title: "Therapeutic Focus",
    description: "The three specialization cards",
    fields: [
      { key: "focus.badge", label: "Badge", default: "Therapeutic Focus" },
      { key: "focus.heading", label: "Heading", default: "Compassionate, Tailored Interventions" },
      { key: "focus.description", label: "Description", type: "textarea", default: "Every human journey holds unique complexities. My practice integrates psychodynamic insights, Cognitive Behavioral Therapy (CBT), and somatic nervous system grounding." },
      { key: "focus.card1_title", label: "Card 1 title", default: "Recovery from Narcissistic Abuse" },
      { key: "focus.card1_text", label: "Card 1 text", type: "textarea", default: "Overcoming the destabilizing cycle of gaslighting, emotional manipulation, and cognitive dissonance. We gently unravel trauma bonds and re-anchor your trust in your own reality." },
      { key: "focus.card1_tags", label: "Card 1 tags", type: "list", default: "Gaslighting Recovery\nBoundary Restoration\nTrauma Bonding" },
      { key: "focus.card1_cta", label: "Card 1 link text", default: "Book Healing Session" },
      { key: "focus.card2_title", label: "Card 2 title", default: "Relationship & Family Counseling" },
      { key: "focus.card2_text", label: "Card 2 text", type: "textarea", default: "Navigating communication impasses, systemic family stressors, infidelity fractures, and codependency. Designed for individuals or couples seeking emotionally authentic alignment." },
      { key: "focus.card2_tags", label: "Card 2 tags", type: "list", default: "Healthy Conflict\nIntimacy & Attachment\nFamily Dynamics" },
      { key: "focus.card2_cta", label: "Card 2 link text", default: "Explore Couple/Family Care" },
      { key: "focus.card3_title", label: "Card 3 title", default: "Depression & Anxiety Management" },
      { key: "focus.card3_text", label: "Card 3 text", type: "textarea", default: "Practical coping architectures to regulate heightened nervous systems, disrupt depressive paralysis, eliminate chronic self-doubt, and reconnect with meaningful daily vitality." },
      { key: "focus.card3_tags", label: "Card 3 tags", type: "list", default: "CBT Tools\nSomatic Grounding\nEmotional Regulation" },
      { key: "focus.card3_cta", label: "Card 3 link text", default: "Start Anxious Mind Relief" },
    ],
  },
  {
    id: "quiz",
    title: "Therapy Match Quiz",
    description: "Quiz heading, questions and answer options",
    fields: [
      { key: "quiz.badge", label: "Badge", default: "Interactive Assessment" },
      { key: "quiz.heading", label: "Heading", default: "Therapy Match Quiz" },
      { key: "quiz.description", label: "Description", type: "textarea", default: "Unsure which session structure meets you where you are today? Answer 3 gentle questions to determine the ideal path forward." },
      { key: "quiz.q1", label: "Question 1", default: "What is currently weighing heaviest on your heart and mind?" },
      { key: "quiz.q1_sub", label: "Question 1 hint", default: "Select the area that feels most urgent to examine." },
      { key: "quiz.q1_options", label: "Question 1 options", type: "list", default: "Feeling drained, second-guessing myself after a toxic relationship or parent\nCommunication breakdown or recurring resentment with my partner/family\nConstant anxiety, burnout, feeling overwhelmed, or persistent emotional sadness\nI am new to therapy and want to ask questions before diving deep" },
      { key: "quiz.q2", label: "Question 2", default: "How do you typically process difficult emotions?" },
      { key: "quiz.q2_sub", label: "Question 2 hint", default: "There are no wrong answers — this helps me meet you where you are." },
      { key: "quiz.q2_options", label: "Question 2 options", type: "list", default: "I tend to suppress them and keep going until I crash\nI replay conversations and overthink what I could have said\nI feel physically tense, restless, or unable to sleep\nI prefer to talk things through with someone I trust" },
      { key: "quiz.q3", label: "Question 3", default: "What does a successful therapy outcome look like for you?" },
      { key: "quiz.q3_sub", label: "Question 3 hint", default: "Your vision shapes the approach we take together." },
      { key: "quiz.q3_options", label: "Question 3 options", type: "list", default: "Feeling safe enough to set boundaries without guilt\nHaving healthier, more honest relationships\nManaging my anxiety so it doesn't run my life\nUnderstanding myself on a deeper level" },
    ],
  },
  {
    id: "pricing",
    title: "Services & Fees",
    description: "Section text and button labels. Plan names, prices and features are edited on the Services page.",
    fields: [
      { key: "pricing.badge", label: "Badge", default: "Transparent & Ethical Care" },
      { key: "pricing.heading", label: "Heading", default: "Services & Advance Consultation Fees" },
      { key: "pricing.description", label: "Description", type: "textarea", default: "Clear, upfront fees with zero hidden costs. All consultations are booked in advance to ensure dedicated time without interruptions." },
      { key: "pricing.popular_badge", label: "Popular plan badge", default: "Most Popular" },
      { key: "pricing.cta1", label: "Plan 1 button", default: "Book Free 15-Min Call" },
      { key: "pricing.cta2", label: "Plan 2 button", default: "Book Individual Session" },
      { key: "pricing.cta3", label: "Plan 3 button", default: "Book Joint Session" },
      { key: "pricing.policy_title", label: "Policy title", default: "Advance Booking & Cancellation Policy:" },
      { key: "pricing.policy_text", label: "Policy text", type: "textarea", default: "All appointments must be confirmed in advance. Because therapy slots are reserved exclusively for you, cancellations or rescheduling requests must be notified at least 16 hours prior to the scheduled time; otherwise, a 50% reservation retention fee applies." },
    ],
  },
  {
    id: "booking",
    title: "Booking Section",
    description: "Heading above the booking form",
    fields: [
      { key: "booking.badge", label: "Badge", default: "Schedule Consultation" },
      { key: "booking.heading", label: "Heading", default: "Client Booking System" },
      { key: "booking.description", label: "Description", type: "textarea", default: "Reserve your 1-hour session or free discovery call in four seamless steps. Mon–Fri from 9:00 AM to 5:00 PM." },
    ],
  },
  {
    id: "location",
    title: "Clinic Location",
    description: "Address, hours and map card",
    fields: [
      { key: "location.badge", label: "Badge", default: "Gurgaon Practice Location" },
      { key: "location.heading", label: "Heading", default: "In-Person Therapeutic Suite" },
      { key: "location.description", label: "Description", type: "textarea", default: "A tranquil, sound-insulated space situated along Gurgaon's prime corridor, designed for mindful privacy and grounded reflection." },
      { key: "location.address", label: "Full address", type: "textarea", default: "F10/12B, Second Floor, Independent Floors, Golf Course Road, DLF Phase 1, Gurgaon, Haryana 122002" },
      { key: "location.hours", label: "Hours", default: "Mon – Fri: 9:00 AM – 5:00 PM (By prior appointment only)" },
      { key: "location.landmarks", label: "Landmarks & transit", type: "textarea", default: "3-minute drive from Sikanderpur Metro Station (Yellow Line / Rapid Metro). Ample street parking available." },
      { key: "location.cta", label: "Button", default: "Book In-Person Visit at Clinic" },
      { key: "location.map_title", label: "Map card title", default: "DLF Phase 1, Golf Course Road" },
      { key: "location.map_subtitle", label: "Map card subtitle", default: "F10/12B Independent Floors, Gurgaon" },
      { key: "location.map_url", label: "Google Maps link", default: "https://maps.google.com/?q=DLF+Phase+1+Golf+Course+Road+Gurgaon" },
    ],
  },
  {
    id: "feedback",
    title: "Client Feedback",
    description: "Feedback section heading and form text",
    fields: [
      { key: "feedback.badge", label: "Badge", default: "Client Feedback" },
      { key: "feedback.heading", label: "Heading", default: "Words From Those Who Paused" },
      { key: "feedback.description", label: "Description", type: "textarea", default: "Experiences shared by clients, with their permission. Names may be shortened to protect privacy." },
      { key: "feedback.empty", label: "Text when no feedback yet", default: "Be the first to share your experience." },
      { key: "feedback.form_heading", label: "Form heading", default: "Share Your Experience" },
      { key: "feedback.form_note", label: "Form note", type: "textarea", default: "Your feedback is reviewed before it appears on the website. You can use initials if you prefer." },
      { key: "feedback.submit", label: "Submit button", default: "Submit Feedback" },
      { key: "feedback.thanks", label: "Thank-you message", default: "Thank you! Your feedback has been received and will appear once reviewed." },
    ],
  },
  {
    id: "mindful",
    title: "Mindful Pause",
    description: "Breathing exercise and affirmations",
    fields: [
      { key: "mindful.badge", label: "Badge", default: "Mindful Space" },
      { key: "mindful.heading", label: "Heading", default: "The \"Mindful Pause\" Corner" },
      { key: "mindful.description", label: "Description", type: "textarea", default: "Before your session, take 60 seconds to soothe your nervous system and reclaim internal emotional space." },
      { key: "mindful.breath_heading", label: "Breathing card heading", default: "4-4-4 Box Breathing Guide" },
      { key: "mindful.breath_text", label: "Breathing card text", default: "Activates the parasympathetic vagal nerve to reduce heart rate and stress." },
      { key: "mindful.start", label: "Start button", default: "Start Breathing Exercise" },
      { key: "mindful.reset", label: "Reset button", default: "Reset" },
      { key: "mindful.affirmation_heading", label: "Affirmation card heading", default: "Daily Boundary & Self-Love Affirmation" },
      { key: "mindful.affirmations", label: "Affirmations", type: "list", default: "My peace is more valuable than maintaining an image of self-sacrifice. Saying 'no' to others is saying 'yes' to myself.\nI am allowed to outgrow versions of myself that no longer protect my peace.\nHealing is not linear, and I honor every small step I take toward wholeness.\nI release the need to earn love through suffering. I am enough as I am.\nMy boundaries are not walls to keep people out — they are gates to protect my inner sanctuary.\nI deserve relationships that feel like safety, not survival.\nChoosing myself is not selfish — it is essential for my healing journey.\nI am allowed to grieve the relationship I deserved but never received." },
      { key: "mindful.draw", label: "New affirmation button", default: "Draw New Affirmation" },
    ],
  },
  {
    id: "footer",
    title: "Footer",
    description: "Bottom of the page",
    fields: [
      { key: "footer.brand", label: "Brand name", default: "Pause for Love" },
      { key: "footer.about", label: "About text", type: "textarea", default: "Psychological counselling and compassionate relational healing practice led by Neha, M.A. Psychology. Based at DLF Phase 1, Gurgaon, and available worldwide via secure video." },
      { key: "footer.copyright", label: "Copyright", default: "© 2025 Pause for Love. All rights reserved." },
      { key: "footer.emergency_heading", label: "Emergency heading", default: "Emergency Helplines" },
      { key: "footer.emergency_intro", label: "Emergency intro", default: "For immediate psychiatric crisis:" },
      { key: "footer.emergency_line1", label: "Helpline line 1", default: "Tele-MANAS: 14416" },
      { key: "footer.emergency_line2", label: "Helpline line 2", default: "Vandrevala Foundation: +91 9999 666 555" },
      { key: "footer.emergency_note", label: "Emergency note", type: "textarea", default: "Pause for Love is an outpatient practice and does not offer 24/7 psychiatric emergency services." },
      { key: "footer.bottom", label: "Bottom bar text", default: "Strict Client Confidentiality Protected • Professional Psychological Practice Standards" },
    ],
  },
];

export const DEFAULT_CONTENT: SiteContent = Object.fromEntries(
  CONTENT_SCHEMA.flatMap((s) => s.fields.map((f) => [f.key, f.default]))
);

/** Merge saved values over defaults. Empty saved values fall back to the default. */
export function mergeContent(saved: unknown): SiteContent {
  const out: SiteContent = { ...DEFAULT_CONTENT };
  if (saved && typeof saved === "object") {
    for (const [k, v] of Object.entries(saved as Record<string, unknown>)) {
      if (typeof v === "string" && v.trim() !== "") out[k] = v;
    }
  }
  return out;
}

export function parseContent(raw: string | null | undefined): SiteContent {
  if (!raw) return { ...DEFAULT_CONTENT };
  try {
    return mergeContent(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_CONTENT };
  }
}

/** Split a "list" field (one item per line) into items. */
export function list(value: string | undefined): string[] {
  return (value || "").split("\n").map((s) => s.trim()).filter(Boolean);
}

/** Turn a phone number into a tel: link value. */
export function telHref(number: string): string {
  return "tel:" + number.replace(/[^\d+]/g, "");
}

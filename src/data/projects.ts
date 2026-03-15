import project1 from "/src/assets/project-1.jpg";
import project2 from "/src/assets/project-2.jpg";
import project3 from "/src/assets/project-3.jpg";
import project4 from "/src/assets/project-4.jpg";
import project5 from "/src/assets/project-5.jpg";
import project6 from "/src/assets/project-6.jpg";
import project7 from "/src/assets/project-7.jpg";
import project8 from "/src/assets/project-8.jpg";
import project9 from "/src/assets/project-9.jpg";

export interface Project {
  slug: string;
  image: string;
  name: string;
  type: string;
  year: number;
  description: string[];
  additionalImages: string[];
}

export const projects: Project[] = [
  {
    slug: "stellar-corp",
    image: project1,
    name: "Stellar Corp",
    type: "Logo, Identity Program",
    year: 2024,
    description: [
      "Stellar Corp needed a brand identity that communicated innovation and reliability. The resulting mark uses bold geometric forms to convey strength and forward momentum, creating an immediately recognizable symbol.",
      "In order to make the identity both functional and memorable, the design was streamlined to its essential elements. The color palette and typography were carefully selected to ensure versatility across digital and print applications.",
      "The identity has since become a cornerstone of Stellar Corp's visual presence, appearing across all touchpoints from digital platforms to physical signage and merchandise.",
    ],
    additionalImages: [project1],
  },
  {
    slug: "bloom-media",
    image: project2,
    name: "Bloom Media",
    type: "Logo, Identity Program",
    year: 2023,
    description: [
      "Bloom Media required an identity that captured the essence of growth and creativity. The organic forms in the logo reflect the company's dynamic approach to media production and storytelling.",
      "The design process involved extensive exploration of natural motifs, ultimately arriving at a mark that feels both modern and timeless. The color system supports a wide range of applications while maintaining brand cohesion.",
      "Since its launch, the Bloom Media identity has helped establish the company as a distinctive voice in the competitive media landscape.",
    ],
    additionalImages: [project2],
  },
  {
    slug: "nation-350",
    image: project3,
    name: "Nation 350",
    type: "Logo, Identity System",
    year: 2023,
    description: [
      "Nation 350's identity system was developed to represent unity and collective purpose. The mark draws on symbolic elements that resonate across cultures, creating a universal visual language.",
      "The identity system extends beyond the logo to encompass a comprehensive toolkit of patterns, icons, and typography that allow for flexible yet consistent brand expression.",
      "The resulting system has proven highly adaptable, serving the organization's diverse communication needs across events, publications, and digital platforms.",
    ],
    additionalImages: [project3],
  },
  {
    slug: "shield-entertainment",
    image: project4,
    name: "Shield Entertainment",
    type: "Logo, Identity System",
    year: 2022,
    description: [
      "Shield Entertainment's rebrand aimed to position the company as a premium player in the entertainment industry. The shield motif in the logo communicates protection, trust, and prestige.",
      "The identity system was designed to work seamlessly across screen and print, with careful attention to how the mark performs at various scales and in different contexts.",
      "The new identity has been instrumental in Shield Entertainment's market positioning, lending credibility and visual sophistication to all brand touchpoints.",
    ],
    additionalImages: [project4],
  },
  {
    slug: "frame-geographic",
    image: project5,
    name: "Frame Geographic",
    type: "Logo, Identity System",
    year: 2022,
    description: [
      "Frame Geographic's identity captures the spirit of exploration and discovery. The logo's geometric precision reflects the organization's commitment to accuracy and clarity in geographic storytelling.",
      "The design balances scientific rigor with visual appeal, creating a mark that is both authoritative and inviting. The supporting identity elements extend this balance across all applications.",
      "The identity has helped Frame Geographic establish itself as a trusted source of geographic content and education.",
    ],
    additionalImages: [project5],
  },
  {
    slug: "nature-channel",
    image: project6,
    name: "Nature Channel",
    type: "Logo, Identity Program",
    year: 2021,
    description: [
      "The Nature Channel identity was created to embody the beauty and diversity of the natural world. The mark uses fluid, organic forms that evoke natural landscapes and wildlife.",
      "The color palette draws directly from nature, with earth tones and vibrant accents that reflect the channel's programming content. The typography is clean and modern, providing contrast to the organic logo mark.",
      "Since its introduction, the Nature Channel identity has become synonymous with quality natural history programming and environmental awareness.",
    ],
    additionalImages: [project6],
  },
  {
    slug: "circle-insurance",
    image: project7,
    name: "Circle Insurance",
    type: "Logo, Identity Program",
    year: 2021,
    description: [
      "Circle Insurance's identity communicates wholeness, protection, and continuity. The circular form of the logo is a universal symbol of completeness, perfectly aligned with the company's promise of comprehensive coverage.",
      "The design is deliberately simple, ensuring recognition and recall across all media. The supporting identity system uses the circle motif as a flexible design element throughout brand communications.",
      "The rebrand has contributed to Circle Insurance's positioning as a modern, trustworthy provider in a competitive market.",
    ],
    additionalImages: [project7],
  },
  {
    slug: "apex-financial",
    image: project8,
    name: "Apex Financial",
    type: "Logo, Identity Program",
    year: 2020,
    description: [
      "Apex Financial required an identity that projected authority, precision, and ambition. The angular mark suggests upward movement and peak performance, core values of the organization.",
      "The identity system pairs the bold logo with a refined typographic system and restrained color palette, creating a visual language that conveys both strength and sophistication.",
      "The new identity has supported Apex Financial's growth strategy, providing a professional and memorable brand presence across all client-facing materials.",
    ],
    additionalImages: [project8],
  },
  {
    slug: "green-initiative",
    image: project9,
    name: "Green Initiative",
    type: "Logo, Identity System",
    year: 2020,
    description: [
      "The Green Initiative identity was designed to inspire action and convey environmental responsibility. The mark combines natural imagery with bold graphic design, creating a symbol that is both hopeful and urgent.",
      "The identity system uses a vibrant green palette alongside clean typography, supporting clear communication across campaigns, reports, and digital platforms.",
      "The identity has become a rallying point for the initiative's supporters, recognized as a symbol of positive environmental change.",
    ],
    additionalImages: [project9],
  },
];

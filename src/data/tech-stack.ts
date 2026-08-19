import { Code2, KeyRound, type LucideIcon, Palette, PenTool, Zap } from "lucide-react";
import {
  type SimpleIcon as SimpleIconType,
  siBootstrap,
  siClaude,
  siClaudecode,
  siCodeigniter,
  siCss,
  siDeepseek,
  siExpo,
  siFigma,
  siFlutter,
  siFramer,
  siHtml5,
  siJavascript,
  siLaravel,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpencode,
  siPhp,
  siPrisma,
  siRailway,
  siReact,
  siShadcnui,
  siSupabase,
  siTailwindcss,
  siVercel,
  siVuedotjs,
} from "simple-icons";

export interface TechStackItem {
  name: string;
  icon: SimpleIconType | LucideIcon;
  description: string;
  img?: string;
  color?: string;
  darkInvert?: boolean;
}

export interface TechStackGroup {
  label: string;
  items: TechStackItem[];
}

// ponytail: OpenAI icon removed from simple-icons; path embedded from simple-icons v11.14.0
const siOpenai = {
  title: "OpenAI",
  slug: "openai",
  svg: "",
  path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
  source: "https://github.com/simple-icons/simple-icons/blob/11.14.0/icons/openai.svg",
  hex: "#412991",
} satisfies SimpleIconType;

export const techStackGroups: TechStackGroup[] = [
  {
    label: "Graphic and UI/UX Design",
    items: [
      // ponytail: Adobe brand icons removed from simple-icons; lucide fallbacks until replaced
      { name: "Adobe Photoshop", icon: Palette, description: "Image editor", img: "/assets/img/photoshop-logo.svg" },
      {
        name: "Adobe Illustrator",
        icon: PenTool,
        description: "Vector editor",
        img: "/assets/img/illustrator-logo.svg",
      },
      { name: "Figma", icon: siFigma, description: "UI design", img: "/assets/img/figma-logo.svg" },
      // ponytail: no colored Framer SVG exists; brand hex fill instead
      { name: "Framer", icon: siFramer, description: "Design & prototyping", color: "#48A1F7" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "HTML", icon: siHtml5, description: "Markup", img: "/assets/img/html-logo.svg" },
      { name: "CSS", icon: siCss, description: "Styling", img: "/assets/img/css-logo.svg" },
      { name: "JavaScript", icon: siJavascript, description: "Language", img: "/assets/img/javascript-logo.svg" },
      { name: "Bootstrap 5", icon: siBootstrap, description: "CSS framework", img: "/assets/img/bootstrap-logo.svg" },
      { name: "Tailwind CSS", icon: siTailwindcss, description: "CSS framework", img: "/assets/img/tailwind-logo.svg" },
      {
        name: "Shadcn",
        icon: siShadcnui,
        description: "UI library",
        img: "/assets/img/shadcn-logo.svg",
        darkInvert: true,
      },
      { name: "React", icon: siReact, description: "UI library", img: "/assets/img/react-logo.svg" },
      {
        name: "Next.js",
        icon: siNextdotjs,
        description: "React framework",
        img: "/assets/img/nextjs-logo.svg",
        darkInvert: true,
      },
      { name: "Vue.js", icon: siVuedotjs, description: "Framework", img: "/assets/img/vue-logo.svg" },
      {
        name: "Expo",
        icon: siExpo,
        description: "React Native framework",
        img: "/assets/img/expo-logo.svg",
        darkInvert: true,
      },
      { name: "Flutter", icon: siFlutter, description: "UI framework" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "PHP", icon: siPhp, description: "Language", img: "/assets/img/php-logo.svg" },
      { name: "Laravel", icon: siLaravel, description: "PHP framework", img: "/assets/img/laravel-logo.svg" },
      { name: "CodeIgniter", icon: siCodeigniter, description: "PHP framework" },
      { name: "Supabase", icon: siSupabase, description: "Backend platform", img: "/assets/img/supabase-logo.svg" },
      { name: "MySQL", icon: siMysql, description: "Database", img: "/assets/img/mysql-logo.svg" },
      { name: "NodeJS", icon: siNodedotjs, description: "Runtime", img: "/assets/img/nodejs-logo.svg" },
      {
        name: "Prisma ORM",
        icon: siPrisma,
        description: "Database ORM",
        img: "/assets/img/prisma-logo.svg",
        darkInvert: true,
      },
      // ponytail: Auth.js has no simple-icons entry; lucide fallback until replaced
      { name: "Auth JS", icon: KeyRound, description: "Authentication", img: "/assets/img/authjs-logo.svg" },
      {
        name: "Railway",
        icon: siRailway,
        description: "Deployment platform",
        img: "/assets/img/railway-logo.svg",
        darkInvert: true,
      },
      {
        name: "Vercel",
        icon: siVercel,
        description: "Deployment platform",
        img: "/assets/img/vercel-logo.svg",
        darkInvert: true,
      },
    ],
  },
  {
    label: "AI",
    items: [
      // ponytail: OpenAI/Groq/Codex icons not in simple-icons; lucide fallbacks until replaced
      {
        name: "ChatGPT",
        icon: siOpenai,
        description: "AI assistant",
        img: "/assets/img/chatgpt-logo.svg",
        darkInvert: true,
      },
      { name: "Claude", icon: siClaude, description: "AI assistant", img: "/assets/img/claude-logo.svg" },
      // ponytail: official Codex logo has no vector path; using OpenAI's app-icon PNG
      { name: "Codex", icon: Code2, description: "AI coding agent", img: "/assets/img/codex-logo.png" },
      { name: "Claude Code", icon: siClaudecode, description: "AI coding agent" },
      { name: "Groq", icon: Zap, description: "AI inference API", img: "/assets/img/groq-logo.svg" },
      {
        name: "Open Code",
        icon: siOpencode,
        description: "AI coding agent",
        img: "/assets/img/opencode-logo.svg",
        darkInvert: true,
      },
      { name: "DeepSeek", icon: siDeepseek, description: "AI assistant", img: "/assets/img/deepseek-logo.svg" },
    ],
  },
];

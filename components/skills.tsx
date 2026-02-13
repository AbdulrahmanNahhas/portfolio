// skills-data.tsx
// ────────────────────────────────────────────────
//  Skills data module – import this where you need the data
// ────────────────────────────────────────────────

import {
  CpuIcon,
  WrenchIcon,
  TranslateIcon,
  BinocularsIcon,
  GlobeIcon,
  BinaryIcon,
  TerminalIcon,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";

// ────────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────────

export type SkillLevel =
  | "Beginner"
  | "Working Knowledge"
  | "Learning"
  | "Intermediate"
  | "Proficient"
  | "Advanced"
  | "Planned";

export interface BaseSkill {
  name: string;
  level: SkillLevel;
  featured?: boolean;
}

export interface IconProps {
  size?: number;
  className?: string;
}

export type IconComponent = ComponentType<IconProps>;

export interface Section {
  id: string;
  title: string;
  icon: IconComponent;
  skills: BaseSkill[];
}

export interface LanguageEntry {
  name: string;
  level: string;
  active: boolean;
}

export interface RoadmapEntry {
  name: string;
  level: string;
}

// ────────────────────────────────────────────────
//  Data
// ────────────────────────────────────────────────

export const skillsData = {
  titleKey: "title", // for next-intl: t("SkillsSection.title")

  sections: [
    {
      id: "firmware",
      title: "Firmware & Systems",
      icon: CpuIcon,
      skills: [
        { name: "C/C++", level: "Intermediate", featured: true },
        { name: "Arduino Framework", level: "Proficient" },
        { name: "ESP-IDF (C++)", level: "Learning", featured: true },
        { name: "FreeRTOS", level: "Beginner" },
        { name: "I²C / SPI / UART", level: "Proficient" },
        { name: "MCU Peripherals", level: "Proficient" },
        { name: "Memory Management", level: "Working Knowledge" },
      ] satisfies BaseSkill[],
    },
    {
      id: "cs-foundations",
      title: "Computer Science",
      icon: BinaryIcon,
      skills: [
        { name: "OOP Patterns", level: "Learning", featured: true },
        { name: "Data Structures & Algorithms", level: "Beginner" },
        { name: "JSON & Serialization", level: "Proficient" },
      ] satisfies BaseSkill[],
    },
    {
      id: "hardware",
      title: "Hardware & Tools",
      icon: WrenchIcon,
      skills: [
        { name: "Reading Datasheets", level: "Working Knowledge" },
        { name: "Circuit Troubleshooting", level: "Beginner" },
        { name: "CMake / Build Systems", level: "Working Knowledge" },
        { name: "Linux / Bash", level: "Advanced" },
      ] satisfies BaseSkill[],
    },
    {
      id: "devops-cloud",
      title: "DevOps & Cloud",
      icon: TerminalIcon,
      skills: [
        { name: "Git & GitLab flow", level: "Proficient", featured: true },
        { name: "GitLab CI/CD", level: "Proficient", featured: true },
        { name: "Docker", level: "Learning" },
        { name: "PostgreSQL / Supabase", level: "Proficient" },
        { name: "MQTT & WebSockets", level: "Proficient", featured: true },
      ] satisfies BaseSkill[],
    },
    {
      id: "web-mobile",
      title: "Web & Mobile Interfaces",
      icon: GlobeIcon,
      skills: [
        { name: "JavaScript / TypeScript", level: "Advanced", featured: true },
        { name: "React / Next.js 16", level: "Advanced", featured: true },
        { name: "React Native (Expo)", level: "Proficient" },
        { name: "Tailwind CSS v4", level: "Advanced" },
        { name: "shadcn/ui", level: "Advanced" },
        { name: "Figma (Handoff)", level: "Working Knowledge" },
        { name: "TanStack Query", level: "Proficient" },
      ] satisfies BaseSkill[],
    },
  ] as const,

  languages: {
    title: "Languages",
    icon: TranslateIcon,
    items: [
      { name: "Arabic", level: "Native", active: true },
      { name: "English", level: "C1 Professional", active: true },
      { name: "Spanish", level: "A1 Beginner", active: false },
    ],
  } as const,

  roadmap: {
    title: "Current R&D",
    icon: BinocularsIcon,
    items: [
      { name: "Computer Architecture", level: "Planned" },
      { name: "PCB Design (KiCad)", level: "Planned" },
      { name: "Rust for Embedded", level: "Planned" },
    ],
  } as const,
} as const;

export type SkillsData = typeof skillsData;

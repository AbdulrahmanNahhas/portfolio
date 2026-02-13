"use client";

import { useTranslations } from "next-intl";
import { SkillBadge } from "../skill-badge";
import { skillsData } from "../skills";

function SkillsSection() {
  const t = useTranslations("SkillsSection");

  const [firmware, cs, hardware, devops, webMobile] = skillsData.sections;

  return (
    <section className="container border-x text-left h-full w-full border-r min-h-full flex flex-col">
      <h3 className="text-foreground text-3xl md:text-4xl font-semibold p-4 md:p-6 uppercase font-header border-b">
        {t(skillsData.titleKey)}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 p-0">
        {/* Main Content Area (3 Columns) */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2">

          {/* Row 1: Core Engineering */}
          <div className="p-4 md:p-6 border-b md:border-r space-y-6">
            <header className="flex items-center gap-2.5 text-primary border-b border-primary/20 pb-2">
              <firmware.icon size={18} />
              <h4 className="font-bold uppercase text-xs tracking-widest">{firmware.title}</h4>
            </header>
            <div className="flex flex-wrap gap-2">
              {firmware.skills.map((s, i) => <SkillBadge key={i} {...s} />)}
            </div>
          </div>

          <div className="p-4 md:p-6 border-b space-y-6">
            <header className="flex items-center gap-2.5 text-primary border-b border-primary/20 pb-2">
              <cs.icon size={18} />
              <h4 className="font-bold uppercase text-xs tracking-widest">{cs.title}</h4>
            </header>
            <div className="flex flex-wrap gap-2">
              {cs.skills.map((s, i) => <SkillBadge key={i} {...s} />)}
            </div>
          </div>

          {/* Row 2: Infrastructure */}
          <div className="p-4 md:p-6 border-b md:border-r space-y-6">
            <header className="flex items-center gap-2.5 text-primary border-b border-primary/20 pb-2">
              <hardware.icon size={18} />
              <h4 className="font-bold uppercase text-xs tracking-widest">{hardware.title}</h4>
            </header>
            <div className="flex flex-wrap gap-2">
              {hardware.skills.map((s, i) => <SkillBadge key={i} {...s} />)}
            </div>
          </div>

          <div className="p-4 md:p-6 border-b space-y-6">
            <header className="flex items-center gap-2.5 text-primary border-b border-primary/20 pb-2">
              <devops.icon size={18} />
              <h4 className="font-bold uppercase text-xs tracking-widest">{devops.title}</h4>
            </header>
            <div className="flex flex-wrap gap-2">
              {devops.skills.map((s, i) => <SkillBadge key={i} {...s} />)}
            </div>
          </div>

          {/* Row 3: The Full Width Interface Section */}
          <div className="md:col-span-2 p-4 md:p-6 border-b space-y-6">
            <header className="flex items-center gap-2.5 text-primary border-b border-primary/20 pb-2">
              <webMobile.icon size={18} />
              <h4 className="font-bold uppercase text-xs tracking-widest">{webMobile.title}</h4>
            </header>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {webMobile.skills.map((s, i) => <SkillBadge key={i} {...s} />)}
            </div>
          </div>
        </div>

        {/* Sidebar (1 Column) */}
        <div className="col-span-1 flex flex-col border-l bg-muted/5">
          {/* Languages */}
          <div className="p-4 md:p-6 border-b space-y-4">
            <header className="flex items-center gap-2 text-muted-foreground">
              <skillsData.languages.icon size={16} />
              <h5 className="text-[10px] uppercase font-bold tracking-widest">{skillsData.languages.title}</h5>
            </header>
            <div className="flex flex-col gap-3 text-sm">
              {skillsData.languages.items.map((lang, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={lang.active ? "text-primary" : "text-muted-foreground/40"}>●</span>
                  <span className={lang.active ? "font-medium" : "text-muted-foreground"}>{lang.name}</span>
                  <span className="text-[10px] opacity-50 ml-auto">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="p-4 md:p-6 space-y-4 grow">
            <header className="flex items-center gap-2 text-muted-foreground">
              <skillsData.roadmap.icon size={16} />
              <h5 className="text-[10px] uppercase font-bold tracking-widest">{skillsData.roadmap.title}</h5>
            </header>
            <div className="flex flex-col gap-2">
              {skillsData.roadmap.items.map((item, i) => (
                <SkillBadge key={i} name={item.name} level={item.level} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;

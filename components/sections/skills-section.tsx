"use client";

import React from "react";
import LetterGlitch from "../react-bits/LetterGlitch";
import SkillsList from "../skills-list";

const SkillsSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-8">
      <SkillsList />
      <div className="flex justify-center md:w-full md:h-[292px] size-[290px] pt-3 md:pt-9">
        <LetterGlitch
          glitchColors={["#008000", "#006400", "#013220"]}
          glitchSpeed={60}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
        />
      </div>
    </section>
  );
};

export default SkillsSection;

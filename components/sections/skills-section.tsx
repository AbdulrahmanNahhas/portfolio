"use client";

import React from "react";
import LetterGlitch from "../react-bits/LetterGlitch";
import SkillsList from "../skills-list";

const SkillsSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center gap-0 overflow-hidden border-t">
      <SkillsList />
      <div className="flex justify-end w-full h-[500px]">
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

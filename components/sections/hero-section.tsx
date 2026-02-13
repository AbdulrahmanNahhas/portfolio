"use client";

import { siteConfig } from "../../lib/config";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Button } from "../ui/button";
import { GitlabLogoSimpleIcon, MastodonLogoIcon, MatrixLogoIcon } from "@phosphor-icons/react";

const HeroSection = () => {
  const t = useTranslations("HeroSection");
  const locale = useLocale();

  return (
    <section className="container text-left lg:px-0 border border-b-0" id="home">
      <div className="flex flex-col lg:flex-row lg:items-start gap-0 lg:gap-4">
        {/* Left Column */}
        <div className="space-y-4 p-6">
          <p className="text-md text-lg md:text-3xl lg:text-lg text-foreground/70 shiny-white rtl:w-55">
            {t("greeting")}
          </p>
          <h1 className="text-foreground text-6xl sm:text-7xl md:text-8xl sm:uppercase lg:text-5xl rtl:lg:text-6xl! font-bold text-pretty leading-none font-header">
            {t("title").split(" & ")[0]}
            {locale === "en" && <br />}
            {t("title").split(" & ")[1]}
          </h1>

          {/* Social Links */}
          <div className="flex justify-start gap-2 pt-3 md:pt-6">
            <Button variant={"outline"} size={"icon-lg"} render={
              <Link
                target="_blank"
                href={siteConfig.social.gitlab}
                aria-label={t("ariaLabels.gitlab")}
                className="cursor-target  transition duration-0 ease-in-out border size-16! rounded-xl"
              >
                <GitlabLogoSimpleIcon className="size-8!" />
              </Link>
            } />
            <Button variant={"outline"} size={"icon-lg"} render={
              <Link
                target="_blank"
                href={siteConfig.social.mastodon}
                aria-label={t("ariaLabels.mastodon")}
                className="cursor-target  transition duration-0 ease-in-out border size-16! rounded-xl"
              >
                <MastodonLogoIcon className="size-8!" />
              </Link>
            } />
            <Button variant={"outline"} size={"icon-lg"} render={
              <Link
                target="_blank"
                href={siteConfig.social.matrix}
                aria-label={t("ariaLabels.matrix")}
                className="cursor-target transition duration-0 ease-in-out border size-16! rounded-xl"
              >
                <MatrixLogoIcon className="size-8!" />
              </Link>
            } />
          </div>
        </div>

        {/* Right Column */}
        <div className="text-lg h-full text-justify sm:text-base md:text-lg space-x-1! text-foreground/70 space-y-4 lg:pl-4 border-t lg:border-t-0 ltr:lg:border-l rtl:lg:border-r p-6">
          <p>
            {t("introLine1")}{" "}
            {t("name")}
            , {t("ageAndLocation")}
          </p>
          <p>
            {t("bioLine1")} 👨‍💻 {t("passionateAbout")}{" "}
            {t("webApps")}{" "}
            {t("and")}{" "}
            {t("embeddedSystems")}
            {t("bioLine2")}
          </p>
          <p>
            {t("enjoyLine")}{" "}
            {t("modernTech")}{" "}
            ⚡ {t("from")}{" "}
            {t("nextjs")}{" "}
            {t("to")}{" "}
            {t("esp32Iot")}{" "}
            {t("andBuilding")}{" "}
            {t("interactiveSolutions")}{" "}
            {t("finalLine")} 🌟
          </p>

          {/* Info Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="bg-accent/50 border inline-flex items-center gap-1 px-3 py-1 text-accent-foreground rounded-full text-sm">
              📅 {t("born")}
            </span>
            <span className="bg-accent/50 border inline-flex items-center gap-1 px-3 py-1 text-accent-foreground rounded-full text-sm">
              📍 {t("location")}
            </span>
            <span className="bg-accent/50 border inline-flex items-center gap-1 px-3 py-1 text-accent-foreground rounded-full text-sm">
              🎓 {t("status")}
            </span>
          </div>
        </div>
      </div>

    </section >
  );
};

export default HeroSection;

import React from "react";
import DecryptedText from "../react-bits/DecryptedText";
import { siteConfig } from "../../lib/config";
import { useTranslations, useLocale } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("HeroSection");
  const locale = useLocale();

  // Calculate age based on birthday
  // const calculateAge = (birthDate: string) => {
  //   const today = new Date();
  //   const birth = new Date(birthDate);
  //   let age = today.getFullYear() - birth.getFullYear();
  //   const monthDiff = today.getMonth() - birth.getMonth();

  //   if (
  //     monthDiff < 0 ||
  //     (monthDiff === 0 && today.getDate() < birth.getDate())
  //   ) {
  //     age--;
  //   }

  //   return age;
  // };

  // const age = calculateAge("2007-04-17");

  return (
    <section className="max-w-5xl mx-auto space-y-8 lg:px-0 border-y" id="home">
      <div className="text-left space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start gap-0 lg:gap-4">
          {/* Left Column */}
          <div className="space-y-4 p-6">
            <p className="text-md text-lg md:text-3xl lg:text-lg text-foreground/70 shiny-white rtl:w-[220px]">
              {t("greeting")}
            </p>
            <h1 className="text-foreground text-6xl sm:text-7xl md:text-8xl sm:uppercase lg:text-5xl rtl:lg:!text-6xl font-bold text-pretty leading-none font-header">
              {t("title").split(" & ")[0]}
              {locale === "en" && <br />}
              {t("title").split(" & ")[1]}
            </h1>

            {/* Social Links */}
            <div className="flex justify-start gap-2 pt-3 md:pt-6">
              <a
                target="_blank"
                href={siteConfig.social.gitlab}
                aria-label={t("ariaLabels.gitlab")}
                className="cursor-target text-foreground/70 hover:text-foreground transition duration-0 ease-in-out border p-3 rounded-xl bg-black/20 hover:bg-white/10"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="size-8"
                >
                  <path d="m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z" />
                </svg>
              </a>
              <a
                target="_blank"
                href={siteConfig.social.twitter}
                aria-label={t("ariaLabels.twitter")}
                className="cursor-target text-foreground/70 hover:text-foreground transition duration-0 ease-in-out border p-3 rounded-xl bg-black/20 hover:bg-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                target="_blank"
                href={siteConfig.social.email}
                aria-label={t("ariaLabels.email")}
                className="cursor-target text-foreground/70 hover:text-foreground transition duration-0 ease-in-out border p-3 rounded-xl bg-black/20 hover:bg-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.1em"
                  height="2.1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m18.73 5.41l-1.28 1L12 10.46L6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="text-lg h-full text-justify sm:text-base md:text-lg !space-x-1 text-foreground/70 space-y-4 lg:pl-4 border-t lg:border-t-0 ltr:lg:border-l rtl:lg:border-r p-6">
            <p>
              {t("introLine1")}{" "}
              <DecryptedText
                key={`name-${locale}`}
                text={t("name")}
                speed={100}
                maxIterations={20}
                characters="ABCD1234!?"
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
                animateOn="view"
                revealDirection="start"
                sequential={true}
                useOriginalCharsOnly={true}
              />
              , {t("ageAndLocation")}
            </p>
            <p>
              {t("bioLine1")} 👨‍💻 {t("passionateAbout")}{" "}
              <DecryptedText
                key={`webApps-${locale}`}
                text={t("webApps")}
                speed={100}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
                animateOn="view"
                revealDirection="start"
                sequential={true}
                useOriginalCharsOnly={true}
              />{" "}
              {t("and")}{" "}
              <DecryptedText
                key={`embeddedSystems-${locale}`}
                text={t("embeddedSystems")}
                speed={100}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
                animateOn="view"
                revealDirection="start"
                sequential={true}
                useOriginalCharsOnly={true}
              />
              {t("bioLine2")}
            </p>
            <p>
              {t("enjoyLine")}{" "}
              <DecryptedText
                key={`modernTech-${locale}`}
                text={t("modernTech")}
                speed={100}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
                animateOn="view"
                revealDirection="start"
                sequential={true}
                useOriginalCharsOnly={true}
              />{" "}
              ⚡ {t("from")}{" "}
              <DecryptedText
                key={`nextjs-${locale}`}
                text={t("nextjs")}
                speed={100}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz."
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
                animateOn="view"
                revealDirection="start"
                sequential={true}
                useOriginalCharsOnly={true}
              />{" "}
              {t("to")}{" "}
              <DecryptedText
                key={`esp32Iot-${locale}`}
                text={t("esp32Iot")}
                speed={100}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz& "
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
                animateOn="view"
                revealDirection="start"
                sequential={true}
                useOriginalCharsOnly={true}
              />{" "}
              {t("andBuilding")}{" "}
              <DecryptedText
                key={`interactiveSolutions-${locale}`}
                text={t("interactiveSolutions")}
                speed={100}
                maxIterations={20}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
                animateOn="view"
                revealDirection="start"
                sequential={true}
                useOriginalCharsOnly={true}
              />{" "}
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
      </div>
    </section>
  );
};

export default HeroSection;

import React from "react";
import DecryptedText from "../react-bits/DecryptedText";
import { siteConfig } from "../../lib/config";

const HeroSection = () => {
  // Calculate age based on birthday
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const age = calculateAge("2007-04-17");

  return (
    <section className="max-w-5xl mx-auto space-y-8 lg:px-0 border-y" id="home">
      <div className="text-left space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start gap-0 lg:gap-4">
          <div className="space-y-4 p-6">
            <p className="text-md text-lg md:text-3xl lg:text-lg text-foreground/70 shiny-white">
              Hi, I&apos;m Abdulrahman Nahhas
            </p>
            <h1 className="text-foreground text-6xl sm:text-7xl md:text-8xl sm:uppercase lg:text-5xl font-medium text-pretty leading-none">
              Student & <br /> Programmer
            </h1>
            <div className="flex justify-start gap-2 pt-3 md:pt-6">
              <a
                target="_blank"
                href={siteConfig.social.gitlab}
                aria-label="GitLab"
                className="cursor-target text-foreground/70 hover:text-foreground transition duration-300 ease-in-out border border-white/20 p-3 rounded-xl bg-black/20 hover:bg-white/10"
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
                aria-label="Twitter"
                className="cursor-target text-foreground/70 hover:text-foreground transition duration-300 ease-in-out border border-white/20 p-3 rounded-xl bg-black/20 hover:bg-white/10"
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
                aria-label="Email"
                className="cursor-target text-foreground/70 hover:text-foreground transition duration-300 ease-in-out border border-white/20 p-3 rounded-xl bg-black/20 hover:bg-white/10"
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
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="text-lg text-justify sm:text-lg md:text-xl text-foreground/70 space-y-4 lg:pl-4 border-t lg:border-t-0 lg:border-l p-6">
            <p>
              Hello, I&apos;m{" "}
              <DecryptedText
                text="Abdulrahman Nahhas"
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
              , a{" "}
              <DecryptedText
                text={age.toString()}
                speed={100}
                maxIterations={20}
                characters="0123456789"
                className="shiny-sec font-semibold"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
                animateOn="view"
                revealDirection="start"
                sequential={true}
                useOriginalCharsOnly={true}
              />
              -year-old from Syria.
            </p>
            <p>
              I&apos;m a{" "}
              <DecryptedText
                text="student & developer"
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
              👨‍💻 passionate about building both{" "}
              <DecryptedText
                text="web applications"
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
              and{" "}
              <DecryptedText
                text="embedded systems"
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
              . I combine my studies with projects that challenge me to grow as
              a full-stack and systems developer.
            </p>
            <p>
              I enjoy working with{" "}
              <DecryptedText
                text="modern technologies"
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
              ⚡ — from{" "}
              <DecryptedText
                text="Next.js"
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
              to{" "}
              <DecryptedText
                text="ESP32 & IoT"
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
              — and creating{" "}
              <DecryptedText
                text="interactive"
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
              solutions that make a difference. Beyond coding, I explore new
              frameworks, contribute to open source, and dive deep into the
              latest tech trends 🌟
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                📅 Born: April 17, 2007
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                📍 Hims, Syria
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                🎓 University Student
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

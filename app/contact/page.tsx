"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { ArrowRightIcon, DiscordLogoIcon, GithubLogoIcon, GitlabLogoSimpleIcon, LinkedinLogoIcon, MastodonLogoIcon, MatrixLogoIcon, XLogoIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const ContactPage = () => {
  const t = useTranslations("HeroSection");

  return (
    <div className="min-h-screen container border-x gap-4 text-3xl md:text-5xl lg:text-7xl flex flex-col items-center justify-center font-header font-bold">
      <Button variant={"outline"} size={"lg"} render={
        <Link
          target="_blank"
          href={siteConfig.social.gitlab}
          aria-label={t("ariaLabels.gitlab")}
          className="cursor-target  transition duration-0 ease-in-out border h-18! rounded-xl gap-2"
        >
          <GithubLogoIcon className="size-12! opacity-50 cursor-not-allowed" />
          <span className="text-2xl -ml-2 opacity-50">
            GitHub
          </span>
          <ArrowRightIcon className="size-8!" />
          <GitlabLogoSimpleIcon className="size-12!" />
          <span className="text-2xl -ml-1">
            Gitlab
          </span>
        </Link>
      } />
      <Button variant={"outline"} size={"lg"} render={
        <Link
          target="_blank"
          href={siteConfig.social.mastodon}
          aria-label={t("ariaLabels.mastodon")}
          className="cursor-target  transition duration-0 ease-in-out border h-18! rounded-xl gap-2"
        >
          <XLogoIcon className="size-12! opacity-50 cursor-not-allowed" />
          <span className="text-2xl -ml-2 opacity-50">
            Twitter
          </span>
          <ArrowRightIcon className="size-8!" />
          <MastodonLogoIcon className="size-12!" />
          <span className="text-2xl! -ml-1">
            Mastodon
          </span>
        </Link>
      } />
      <Button variant={"outline"} size={"lg"} render={
        <Link
          target="_blank"
          href={siteConfig.social.matrix}
          aria-label={t("ariaLabels.matrix")}
          className="cursor-target  transition duration-0 ease-in-out border h-18! rounded-xl gap-2"
        >
          <DiscordLogoIcon className="size-12! opacity-50 cursor-not-allowed" />
          <span className="text-2xl -ml-1 opacity-50">
            Discord
          </span>
          <ArrowRightIcon className="size-8!" />
          <MatrixLogoIcon className="size-12!" />
          <span className="text-2xl! -ml-1">
            Matrix
          </span>
        </Link>
      } />      <Button variant={"outline"} size={"lg"} render={
        <Link
          target="_blank"
          href={siteConfig.social.linkedin}
          aria-label={t("ariaLabels.linkedin")}
          className="cursor-target  transition duration-0 ease-in-out border h-18! rounded-xl gap-2"
        >
          <LinkedinLogoIcon className="size-12!" />
          <span className="text-2xl!">
            Linkedin
          </span>
        </Link>
      } />
    </div>
  );
};

export default ContactPage;

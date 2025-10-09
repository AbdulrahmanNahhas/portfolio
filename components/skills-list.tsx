import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ListIcon, MicrochipIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const CategoryIcons: Record<string, React.ReactElement> = {
  webDevelopment: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 11H4V19H20V11ZM20 5H4V9H20V5ZM11 6V8H9V6H11ZM7 6V8H5V6H7Z"></path>
    </svg>
  ),
  embeddedSystems: <MicrochipIcon className="size-6" />,
  otherSkills: <ListIcon className="size-6" />,
};

const SkillsList = () => {
  const t = useTranslations("SkillsSection");

  const skills = {
    webDevelopment: t.raw("webDevelopment"),
    embeddedSystems: t.raw("embeddedSystems"),
    otherSkills: t.raw("otherSkills"),
  };

  return (
    <div className="text-left h-full w-full border-r min-h-full">
      <h3 className="text-foreground text-3xl md:text-4xl font-semibold sm:my-4 p-4 md:p-0 ltr:md:pl-3 rtl:md:pr-3 uppercase font-header">
        {t("title")}
      </h3>
      <div className="mt-0 w-full">
        <Accordion
          type="single"
          defaultValue="webDevelopment"
          className="space-y-0"
        >
          {Object.entries(skills).map(([categoryKey, items]) => (
            <AccordionItem
              key={categoryKey}
              value={categoryKey}
              className="w-full !border py-0 px-0 rounded-none [&[data-state=open]]:bg-card duration-200 !border-x-0"
            >
              <AccordionTrigger className="cursor-target px-3 flex items-center !rounded-none">
                <div className="flex items-center gap-3 w-full">
                  <div className="[&>svg]:!rotate-0">
                    {CategoryIcons[categoryKey]}
                  </div>
                  <div className="flex items-center gap-2 flex-grow justify-between">
                    <div className="min-w-0 max-w-[200px] md:max-w-none overflow-hidden">
                      <span className="block truncate text-foreground text-lg font-medium">
                        {t(`categories.${categoryKey}`)}
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="px-3 space-y-2 text-foreground/70 text-sm">
                  {items.map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <span className="pl-1 text-foreground">•</span>
                      <span className="pl-3">{item}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default SkillsList;

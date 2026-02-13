import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get("locale")?.value || "en";

  return {
    locale,
    messages: (await import(`@/i18n/dictionaries/${locale}.json`)).default,
  };
});

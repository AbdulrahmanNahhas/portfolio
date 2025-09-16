export const siteConfig = {
  // Contact Information
  contact: {
    email: "abdulrahman.nahhas@example.com", // Update with your actual email
    phone: "+963 XXX XXX XXX", // Update with your actual phone
    location: "Hims, Syria",
  },

  // Social Media Links
  social: {
    gitlab: "https://gitlab.com/AbdulrahmanNahhas",
    twitter: "https://x.com/nahhas_tech",
    email: "mailto:nahhas909@protonmail.com", // Will be generated from contact.email
  },

  // Website Configuration
  site: {
    name: "Abdulrahman Nahhas",
    title: "Abdulrahman Nahhas - Student & Programmer",
    description:
      "Portfolio of Abdulrahman Nahhas, a student and programmer from Syria passionate about web development and embedded systems.",
    url: "https://abdulrahmannahhas.dev", // Update with your actual domain
    ogImage: "/og-image.png", // Add your Open Graph image
    keywords: [
      "Abdulrahman Nahhas",
      "Portfolio",
      "Web Developer",
      "Student",
      "Programmer",
      "Syria",
      "Next.js",
      "React",
      "TypeScript",
      "ESP32",
      "IoT",
      "Full Stack Developer",
    ],
    author: "Abdulrahman Nahhas",
    language: "en",
    locale: "en_US",
  },

  // SEO and Analytics
  seo: {
    googleAnalytics: null, // Add your GA tracking ID
    googleSearchConsole: null, // Add your GSC verification code
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  },
} as const;

// Helper function to generate social media links with proper formatting
export const getSocialLinks = () => {
  return Object.entries(siteConfig.social)
    .filter(([, url]) => url !== null)
    .map(([platform, url]) => ({
      platform,
      url,
      label: platform.charAt(0).toUpperCase() + platform.slice(1),
    }));
};

// Helper function to get contact information
export const getContactInfo = () => {
  return {
    ...siteConfig.contact,
    social: getSocialLinks(),
  };
};

// Type definitions for better TypeScript support
export type SiteConfig = typeof siteConfig;
export type SocialLinks = typeof siteConfig.social;

export const CONFIG = {
  CMS_URL: process.env.NEXT_PUBLIC_CMS_URL || "https://directus-agex.onrender.com/",
  CMS_TOKEN: process.env.NEXT_PUBLIC_CMS_TOKEN || "mlFPufQG253pKoOLfPS8ovjSYSY5kswA"
} as const;
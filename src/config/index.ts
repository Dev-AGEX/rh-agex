export const CONFIG = {
  CMS_URL: process.env.NEXT_PUBLIC_CMS_URL || "https://directus.agex.com.br",
  CMS_TOKEN: process.env.NEXT_PUBLIC_CMS_TOKEN || "jy1t4FBssVk2V7EQEby_pRMriFaaBu6e"
} as const;
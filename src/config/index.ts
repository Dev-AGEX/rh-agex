export const CONFIG = {
  CMS_URL: process.env.NEXT_PUBLIC_CMS_URL || "https://directus.agex.com.br",
  CMS_TOKEN: process.env.NEXT_PUBLIC_CMS_TOKEN || "TFh5hvC6wApM0yGyIr7P9vtwnr_sbz1v"
} as const;
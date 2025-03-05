import { apiCMS } from "./api";

export default async function getConfigForm() {
  return await apiCMS({
    collection: "Trabalhe_conosco_config",
    nextTag: ["Trabalhe_conosco_config"],
  });
}
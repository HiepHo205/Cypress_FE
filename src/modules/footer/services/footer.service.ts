import { fetchFooter } from "../api/footer.api";
import type { Footer } from "../types/footer.type";

export const getFooter = async (): Promise<Footer> => {
  const data = await fetchFooter();

  return data;
};

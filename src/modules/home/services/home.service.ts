import { HomeApi } from "../api/home.api";
export const HomeService = {
  async getHomepage() {
    const res = await HomeApi.getHomepage();
    if (res.data?.errors?.length) {
      console.error("GRAPHQL ERROR:", res.data.errors);
      throw new Error(res.data.errors[0].message);
    }
    return res.data?.data?.homepage ?? null;
  },
};

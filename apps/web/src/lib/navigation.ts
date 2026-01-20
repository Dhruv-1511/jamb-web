import { sanityFetch } from "./sanity/live";
import {
  queryDrawerNavigation,
  queryGlobalSeoSettings,
  queryHomePageData,
  queryNavbarData,
} from "./sanity/query";
import type { QueryHomePageDataResult } from "./sanity/sanity.types";

type PageBuilderBlock =
  NonNullable<NonNullable<QueryHomePageDataResult>["pageBuilder"]>[number];

type CategoryLinksBlock = Extract<PageBuilderBlock, { _type: "categoryLinks" }>;

export const getNavigationData = async () => {
  const [navbarData, settingsData, drawerData, homePageData] =
    await Promise.all([
      sanityFetch({ query: queryNavbarData }),
      sanityFetch({ query: queryGlobalSeoSettings }),
      sanityFetch({ query: queryDrawerNavigation }),
      sanityFetch({ query: queryHomePageData }),
    ]);

  // Extract category links from home page
  const categoryLinks =
    homePageData.data?.pageBuilder
      ?.filter((block: PageBuilderBlock) => block._type === "categoryLinks")
      ?.flatMap((block: CategoryLinksBlock) => block.links || [])
      ?.filter(Boolean) || [];

  return {
    navbarData: navbarData.data,
    settingsData: settingsData.data,
    drawerData: drawerData.data,
    categoryLinks,
  };
};

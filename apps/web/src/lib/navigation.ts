import { sanityFetch } from "./sanity/live";
import {
  queryDrawerNavigation,
  queryGlobalSeoSettings,
  queryNavbarData,
} from "./sanity/query";

export const getNavigationData = async () => {
  const [navbarData, settingsData, drawerData] = await Promise.all([
    sanityFetch({ query: queryNavbarData }),
    sanityFetch({ query: queryGlobalSeoSettings }),
    sanityFetch({ query: queryDrawerNavigation }),
  ]);

  return {
    navbarData: navbarData.data,
    settingsData: settingsData.data,
    drawerData: drawerData.data,
  };
};

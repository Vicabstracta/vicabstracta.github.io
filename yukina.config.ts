import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const YukinaConfig: Configuration = {
  title: "Archivo de Miradas",
  subTitle: "by vicabstracta",
  brandTitle: "",

  description: "Ensayos, reseñas y entrevistas en profundidad acerca de artes visuales.",

  site: "https://archivodemiradas.com/",

  locale: "es", // set for website language and date format

  navigators: [
    {
      nameKey: I18nKeys.nav_bar_home,
      href: "/",
    },
    {
      nameKey: I18nKeys.nav_bar_archive,
      href: "/archive",
    },
    {
      nameKey: I18nKeys.nav_bar_about,
      href: "/about",
    },
  ],

  username: "Victoria Abaroa Cajiao",
  sign: "Periodista cultural",
  avatarUrl: "/profile.jpg",
  socialLinks: [
    {
      icon: "line-md:instagram",
      link: "https://www.instagram.com/vicabstracta/",
    },
    {
      icon: "line-md:email",
      link: "mailto:vpabaroa@gmail.com",
    },
  ],
  maxSidebarCategoryChip: 6, // It is recommended to set it to a common multiple of 2 and 3
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,

  banners: [
    "/color_1.webp",
  ],

  banners_carousel: [
    { src: "/light.webp", focalPoint: "50% 50%" },
    { src: "/goya.webp", focalPoint: "50% 40%", cropPosition: "50% 40%" },
    { src: "/dark.webp", focalPoint: "50% 50%" },
    { src: "/goya.webp", focalPoint: "50% 40%", cropPosition: "50% 40%" },
  ],

  slugMode: "HASH", // 'RAW' | 'HASH'

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'
};

export default YukinaConfig;

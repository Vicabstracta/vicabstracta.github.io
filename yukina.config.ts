import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const YukinaConfig: Configuration = {
  title: "vicabstracta",
  subTitle: "Yukina Template Demo Site",
  brandTitle: "vicabstracta",

  description: "Demo Site",

  site: "https://yukina-blog.vercel.app",

  locale: "en", // set for website language and date format

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
  avatarUrl: "/public/profile.jpg",
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
    "/public/color_1.webp",
  ],

  banners_carousel: [
    "/public/color_1.webp",
    "/public/color_2.webp",
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

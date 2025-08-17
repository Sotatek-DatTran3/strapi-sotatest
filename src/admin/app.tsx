import type { StrapiApp } from "@strapi/strapi/admin";

export default {
  config: {
    locales: [
      // Add your locales here if needed
    ],
  },
  register(app: StrapiApp) {
    // Add the custom test page to the main menu
    app.addMenuLink({
      to: "test-page",
      icon: "grid" as any,
      intlLabel: {
        id: "test-page.title",
        defaultMessage: "Test Page",
      },
      Component: async () => {
        const component = await import("./pages/TestPage");
        return component;
      },
      permissions: [],
      position: 5,
    });

    // Add the second test page to the main menu
    // app.addMenuLink({
    //   to: "test-page-2",
    //   icon: "dashboard" as any,
    //   intlLabel: {
    //     id: "test-page-2.title",
    //     defaultMessage: "Test Page 2",
    //   },
    //   Component: async () => {
    //     const component = await import("./pages/TestPage2");
    //     return component;
    //   },
    //   permissions: [],
    // });

    // Optionally add to settings
    app.addSettingsLink("global", {
      id: "test-page-settings",
      to: "test-page-settings",
      intlLabel: {
        id: "test-page.settings.title",
        defaultMessage: "Test Page Settings",
      },
      Component: async () => {
        const component = await import("./pages/TestPage");
        return component;
      },
      permissions: [],
    });
  },
  bootstrap(app: StrapiApp) {
    console.log("Strapi admin bootstrapped with custom page!", app);
  },
  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data,
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};

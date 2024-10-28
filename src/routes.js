export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "./pages/Home.vue"),
    meta: {
      sitemap: {
        priority: 1.0,
        changefreq: "monthly",
      },
    },
  },
  {
    path: "/about-us",
    name: "About Us",
    component: () =>
      import(/* webpackChunkName: "About Us" */ "./pages/AboutUs.vue"),
    meta: {
      sitemap: {
        priority: 0.7,
        changefreq: "monthly",
      },
    },
  },
  {
    path: "/events",
    name: "Events",
    component: () =>
      import(/* webpackChunkName: "Events" */ "./pages/Events.vue"),
    meta: {
      sitemap: {
        priority: 0.9,
        changefreq: "weekly",
      },
    },
  },
  {
    path: "/insights",
    name: "Insights",
    component: () =>
      import(/* webpackChunkName: "Insights" */ "./pages/Insights.vue"),
    meta: {
      sitemap: {
        priority: 0.9,
        changefreq: "weekly",
      },
    },
  },
  {
    path: "/tools",
    name: "Tools",
    component: () =>
      import(/* webpackChunkName: "Tools" */ "./pages/Tools.vue"),
    meta: {
      sitemap: {
        priority: 0.7,
        changefreq: "yearly",
      },
    },
  },
  {
    path: "/cxa",
    name: "CX Advisory",
    component: () =>
      import(/* webpackChunkName: "CX Advisory" */ "./pages/CXAdvisory.vue"),
    meta: {
      sitemap: {
        priority: 0.7,
        changefreq: "yearly",
      },
    },
  },
];

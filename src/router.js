import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("./pages/Home.vue");
const Auth = () => import("./pages/auth/Login.vue");
const Register = () => import("./pages/auth/RegisterPage.vue");
const ResetPassword = () => import("./pages/auth/ResetPassword.vue");
const Profile = () => import("./pages/auth/Profile.vue");
const ProfileUpdate = () => import("./pages/auth/ProfileUpdate.vue");
const AboutUs = () => import("./pages/AboutUs.vue");
const Events = () => import("./pages/Events.vue");
const EventsDetail = () => import("./pages/EventsDetail.vue");
const Insights = () => import("./pages/Insights.vue");
const InsightsDetail = () => import("./pages/InsightsDetail.vue");
const Forum = () => import("./pages/Forum.vue");
const Academy = () => import("./pages/academy/Academy.vue");
const Tools = () => import("./pages/Tools.vue");
const Contact = () => import("./pages/Contact.vue");
const CXAdvisory = () => import("./pages/CXAdvisory.vue");
const AcademyBadge = () => import("./pages/academy/badge/Badge.vue");
const NotFound = () => import("./pages/NotFound.vue");

//Reports
const Reports = () => import("./pages/reports/Reports.vue");

const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash };
    }
  },
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/auth", name: "Auth", component: Auth },
    { path: "/register", name: "Register", component: Register },

    {
      path: "/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    { path: "/profile", name: "Profile", component: Profile },
    {
      path: "/profile-update",
      name: "Profile Update",
      component: ProfileUpdate,
    },
    { path: "/about-us", name: "About Us", component: AboutUs },
    { path: "/events", name: "Events", component: Events },
    {
      path: "/events/:id/:event",
      name: "Events Detail",
      component: EventsDetail,
    },
    { path: "/insights", name: "Insights", component: Insights },
    {
      path: "/insights/:id/:article",
      name: "Insights Detail",
      component: InsightsDetail,
    },
    { path: "/forum", name: "Forum", component: Forum },
    { path: "/academy", name: "Academy", component: Academy },
    { path: "/tools", name: "Tools", component: Tools },
    { path: "/contact", name: "Contact", component: Contact },
    { path: "/cxa", name: "CX Advisory", component: CXAdvisory },
    { path: "/reports", name: "Reports", component: Reports },
    { path: "/academy/badge", name: "Academy Badge", component: AcademyBadge },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;

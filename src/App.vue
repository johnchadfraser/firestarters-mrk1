<template>
  <div class="container-fluid">
    <the-header></the-header>

    <router-view v-slot="slotProps">
      <component :is="slotProps.Component"></component>
    </router-view>

    <the-footer></the-footer>

    <div class="cookie-wrapper">
      <vue-cookie-accept-decline
        :debug="false"
        :disableDecline="true"
        :showPostponeButton="false"
        @clicked-accept="cookieClickedAccept"
        @clicked-decline="cookieClickedDecline"
        @clicked-postpone="cookieClickedPostpone"
        @removed-cookie="cookieRemovedCookie"
        @status="cookieStatus"
        elementId="gdpr"
        position="bottom"
        message="We use cookies to improve your experience and to help us understand how you use our site. Please refer to our cookie notice and privacy statement for more information regarding cookies and other third-party tracking that may be enabled."
        ref="gdpr"
        transitionName="slideFromBottom"
        type="bar"
      >
        <template #message>
          We use cookies to improve your experience and to help us understand
          how you use our site. Please refer to our cookie notice and privacy
          statement for more information regarding cookies and other third-party
          tracking that may be enabled.
          <a
            href="https://support.sap.com/en/release-upgrade-maintenance/value-support/quick-values-gdpr.html"
            target="_blank"
            >Learn More</a
          >
        </template>

        <template #acceptContent> Accept </template>
      </vue-cookie-accept-decline>
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
  },

  data() {
    return {
      cookieClickedAccept: "",
      cookieClickedDecline: "",
      cookieClickedPostpone: "",
      cookieRemovedCookie: "",
      cookieStatus: "",
    };
  },
};
</script>

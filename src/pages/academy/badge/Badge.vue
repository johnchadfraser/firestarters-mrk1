<template>
  <jumbotron-page
    :pageImage="pageImage"
    :pageTitle="pageTitle"
    :pageSubTitle="pageSubTitle"
    :pageMessage="pageMessage"
  ></jumbotron-page>

  <div class="container p-container pt pb rb">
    <div class="row pb">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <p class="text-center">
          <badge-list :token="token"></badge-list>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1 class="diamond-icon">Firestarters Badges</h1>
        <p>
          Firestarters Academy issues badges to its members and attendees after
          passing a short quiz in acknowledgement of their participation!
          Typically, the quiz link is sent via email shortly after the training
          session. Once passing the quiz, a link will be provided to share the
          badge on your LinkedIn profile page. Don't forget to
          <router-link :to="{ name: 'Register' }" target="_blank" class="link"
            >become a Firestarters member</router-link
          >
          to receive more valuable business insights and access to valuable
          tools!
        </p>
      </div>
    </div>

    <div class="row pt">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h2 class="diamond-icon">Firestarters - Become a Member</h2>
        <p>
          Join the Firestarters community to stay up to date on the continuous
          development and availability of tools that can help you unlock value,
          and drive your business forward.
        </p>
        <p>
          <router-link :to="{ name: 'Register' }" class="btn btn-primary"
            >Register</router-link
          >
          <router-link :to="{ name: 'About Us' }" class="btn btn-info"
            >Learn More</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import JumbotronPage from "../../../components/layout/JumbotronPage.vue";
import BadgeList from "../badge/BadgeList.vue";

export default {
  setup() {},

  components: {
    JumbotronPage,
    BadgeList,
  },

  data() {
    return {
      pageImage: "page-banner-academy-badge",
      pageTitle: "Firestarters Academy Badges",
      pageSubTitle: "Share your badge with your LinkedIn account",
      pageMessage:
        "If you have been awarded a badge it should be available below.",
      token: this.$route.query.token,
    };
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

h1 {
  font-size: 1.5rem;
  margin: 2rem 2rem 1rem;
}

h2 {
  font-size: 1.25rem;
  margin: 1rem 1.5rem;
}

p {
  font-size: 0.875rem;
  padding: 0rem 2.25rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 1.75rem;
    margin: 1.5rem 2rem 1rem;
  }

  h2 {
    font-size: 1.65rem;
    margin: 0rem 2rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 2rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 2rem;
    margin: 1.5rem 2.25rem 1rem;
  }

  h2 {
    font-size: 1.75rem;
    margin: 0rem 2.5rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 2.75rem;
  }

  p img {
    display: block;
    width: 60%;
    margin: 0 auto;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 2.5rem;
    margin: 5rem 4.5rem 1rem;
  }

  h2 {
    font-size: 2rem;
    margin: 0rem 5rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 5.5rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    font-size: 3rem;
    margin: 2rem 4rem 1rem;
  }

  h2 {
    font-size: 2.5rem;
    padding: 0.625rem 3.5rem;
    margin: 0rem 4rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 5.6rem;
  }

  p img {
    display: block;
    width: 50%;
    margin: 0 auto;
  }
}
</style>

<template>
  <div class="container p-container rt">
    <event-main></event-main>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1 class="diamond-icon">Event Information</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <p>
          Members of the community will have an opportunity to connect with each
          other on various CX topics and build a network of like-minded
          colleagues to collectively define what a great customer experience can
          be.
        </p>

        <p>
          <router-link :to="{ name: 'Events' }" class="btn btn-info"
            >More Events</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import EventMain from "../../components/layout/EventMain.vue";

export default {
  components: {
    EventMain,
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

h1 {
  font-size: 1.5rem;
  margin: 1rem 2rem 1rem;
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

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 2.75rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 2.5rem;
    margin: 5rem 4.5rem 1rem;
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

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 5.6rem;
  }
}
</style>

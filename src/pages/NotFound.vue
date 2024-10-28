<template>
  <metainfo></metainfo>

  <div class="sub-header"></div>

  <div class="container p-container pt rb rt">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1>Page not found</h1>

        <p>This page could not be found!</p>

        <p>
          <router-link :to="{ name: 'Home' }" class="btn btn-primary"
            >Return to Home</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";

export default {
  setup() {
    useMeta({
      title: "Not Found - Firestarters",
      description:
        "Join the Firestarters community to stay up to date on the continuous development and availability of tools that can help you unlock value, and drive your business forward.",
    });
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/
.sub-header {
  height: 4.5rem;
}

h1 {
  font-size: 2.25rem;
  margin: 2rem 2rem 1rem;
}

h2 {
  font-size: 1.5rem;
  margin: 1rem 2rem;
}

h3 {
  font-size: 1.5rem;
  margin: 0rem 2.25rem;
}

p {
  padding: 0.5rem 2.25rem;
}

ul {
  margin: 0rem 4rem 1rem 2.25rem;
}

li {
  padding: 0.5rem 0rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 2.5rem;
    margin: 0rem 3rem 1rem;
  }

  h2 {
    font-size: 2rem;
    margin: 0rem 3rem;
  }

  h3 {
    font-size: 1.5rem;
    margin: 0rem 2.75rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 2rem 1rem;
  }

  ul {
    margin: 1rem 4rem 2rem;
  }

  li {
    font-size: 1rem;
    font-weight: normal;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 3rem;
    margin: 0rem 4rem 1rem;
  }

  h2 {
    font-size: 2rem;
    margin: 0rem 4rem;
  }

  h3 {
    font-size: 1.75rem;
    margin: 0rem 4rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 2rem;
  }

  ul {
    margin: 1rem 5.25rem 2rem;
  }

  li {
    font-size: 1.15rem;
    font-weight: normal;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .sub-header {
    height: 6.5rem;
  }

  h1 {
    font-size: 4rem;
    margin: 1rem 4.5rem 1rem;
  }

  h2 {
    font-size: 2rem;
    margin: 0rem 4.75rem;
  }

  h3 {
    font-size: 2rem;
    margin: 0rem 4.75rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 2rem 2.5rem;
  }

  ul {
    margin: 1rem 6.5rem 2rem;
  }

  li {
    font-size: 1.15rem;
    font-weight: normal;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .sub-header {
    height: 6.5rem;
  }

  h1 {
    font-size: 5rem;
    margin: 1rem 4.75rem 2rem;
  }

  h2 {
    font-size: 2.5rem;
    margin: 0rem 4.75rem;
  }

  h3 {
    font-size: 2.25rem;
    margin: 2rem 5rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2.75rem 2rem;
  }

  ul {
    margin: 0rem 6.5rem;
  }

  li {
    font-size: 1.15rem;
    font-weight: normal;
  }
}
</style>

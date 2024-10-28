<template>
  <div class="container p-container pt pb rb">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1>CX Advisory</h1>

        <p>
          Connect with a collection of real industry experts that have
          experience with the challenges you are facing.
        </p>

        <p>
          <router-link :to="{ name: 'CX Advisory' }" class="arrow-link"
            >Learn About CXA</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

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
    margin: 1rem 2rem 1rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 0rem;
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
    margin: 1rem 0rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 2.5rem;
    margin: 2rem 4.5rem 1rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2.35rem;
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
    margin: 1rem 2rem;
  }
}
</style>

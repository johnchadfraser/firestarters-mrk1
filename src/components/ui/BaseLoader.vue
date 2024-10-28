<template>
  <div class="loading"></div>

  <div class="loading-image">
    <img
      role="img"
      class="loading-logo"
      src="~@/assets/svg/firestarters-icon.svg"
      aria-label="firestarters icon"
    />
    <p>Loading</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

.loading {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.8;
  background-color: #ccc;
  z-index: 2000;
}

.loading-image {
  position: fixed;
  text-align: center;
  width: 100%;
  top: 25%;
  left: 0rem;
  z-index: 2001;
}

.loading-logo {
  opacity: 1;
  width: 3rem;
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -1px) rotate(-1deg);
  }
  20% {
    transform: translate(-1px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 1px) rotate(-1deg);
  }
  60% {
    transform: translate(-1px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(1px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -1px) rotate(-1deg);
  }
}

p {
  padding: 1rem 0rem;
  font-weight: 700;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .loading {
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.8;
    background-color: #ccc;
    z-index: 2000;
  }

  .loading-image {
    position: fixed;
    text-align: center;
    width: 100%;
    top: 25%;
    left: 0rem;
    z-index: 2001;
  }

  .loading-logo {
    opacity: 1;
    width: 3rem;
    animation: shake 0.5s;
    animation-iteration-count: infinite;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .loading {
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2000;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(50px);
  }

  .loading-image {
    position: fixed;
    text-align: center;
    width: 100%;
    top: 25%;
    left: 0rem;
    z-index: 2001;
  }

  .loading-logo {
    opacity: 1;
    width: 4rem;
    animation: shake 0.5s;
    animation-iteration-count: infinite;
  }
}
</style>

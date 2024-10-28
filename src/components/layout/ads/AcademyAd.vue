<template>
  <div class="ad-container">
    <h1>Learn & Earn</h1>
    <p>Members Earn Digital Badges</p>
    <img
      role="img"
      class="img-fluid"
      src="~@/assets/logo/firestarters-academy-logo-reversed-275px.png"
      loading="lazy"
      aria-label="Firestarters Academy Logo"
    />
    <p>Take Advantage of the Knowledge Our Industry Leaders Have to Share!</p>
    <a
      href="#"
      class="btn btn-sm btn-primary"
      data-toggle="modal"
      data-target="#registerModal"
      role="button"
      >Register Now!</a
    >
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
  color: #fff;
  margin: 0rem;
}

p {
  color: #fff;
  margin: 1rem;
}

.ad-container {
  display: block;
  float: left;
  width: 100%;
  background-color: #565b61;
  background-image: url("~@/assets/bg/bg-texture-05.png");
  background-size: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  margin: 0.5rem;
}
</style>

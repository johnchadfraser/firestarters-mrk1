<template>
  <auth></auth>
  <register></register>
  <forgot-password></forgot-password>
  <header class="container p-container">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="nav">
        <a
          href="/"
          @click="
            () => {
              resetAuth();
            }
          "
        >
          <img
            role="img"
            class="logo-icon"
            src="~@/assets/svg/firestarters-icon.svg"
            aria-label="firestarters icon"
            alt="Firestarters Icon"
          />

          <span class="logo-text">
            Firestarters
            <span class="logo-text-caption"
              >Your Global Business Community</span
            >
          </span>
        </a>
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-dropdown"
        aria-controls="navbar-dropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="
          () => {
            toggleNavbar();
            resetAuth();
          }
        "
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbar-dropdown" class="navbar-collapse collapse">
        <div class="navbar-header">
          <h1>Menu</h1>
          <a
            type="button"
            class="navbar-close"
            aria-label="Close"
            data-target="#navbar-dropdown"
            data-toggle="collapse"
            @click="
              () => {
                toggleNavbar();
                resetAuth();
              }
            "
          >
            Close
          </a>
        </div>

        <ul class="nav navbar-nav">
          <div class="navbar-nav-auth">
            <span v-if="isAuthenticated === true">
              <li class="navbar-item-auth">
                <router-link
                  :to="{ name: 'Profile' }"
                  class="navbar-link-auth"
                  data-target="#navbar-dropdown"
                  data-toggle="collapse"
                  @click="
                    () => {
                      resetAuth();
                    }
                  "
                  >Profile</router-link
                >
              </li>

              <li class="navbar-item-auth">
                <router-link
                  :to="{ name: 'Home' }"
                  class="navbar-link-auth"
                  data-target="#navbar-dropdown"
                  data-toggle="collapse"
                  @click="
                    () => {
                      setSignOut();
                    }
                  "
                  >Sign Out</router-link
                >
              </li>
            </span>

            <span v-else>
              <li class="navbar-item-auth">
                <a
                  class="navbar-link-auth"
                  data-toggle="modal"
                  data-dismiss="modal"
                  data-target="#loginModal"
                  >Log In</a
                >
              </li>
              <li class="navbar-item-auth">
                <a
                  class="navbar-link-auth"
                  data-toggle="modal"
                  data-dismiss="#navbar-dropdown"
                  data-target="#registerModal"
                  >Sign Up</a
                >
              </li>
            </span>
          </div>

          <div class="navbar-nav-main">
            <li class="navbar-item">
              <router-link
                to="/about-us"
                :active="$route.name === 'About Us'"
                class="navbar-link"
                data-target="#navbar-dropdown"
                data-toggle="collapse"
                @click="
                  () => {
                    resetAuth();
                  }
                "
                >About Us
              </router-link>
            </li>
            <li class="navbar-item">
              <router-link
                :to="{ name: 'Events' }"
                :active="$route.name === 'Events'"
                class="navbar-link"
                data-target="#navbar-dropdown"
                data-toggle="collapse"
                @click="
                  () => {
                    resetAuth();
                  }
                "
                >Events</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                :to="{ name: 'Insights' }"
                :active="$route.name === 'Insights'"
                class="navbar-link"
                data-target="#navbar-dropdown"
                data-toggle="collapse"
                @click="
                  () => {
                    resetAuth();
                  }
                "
                >Insights</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                :to="{ name: 'Academy' }"
                :active="$route.name === 'Academy'"
                class="navbar-link"
                data-target="#navbar-dropdown"
                data-toggle="collapse"
                @click="
                  () => {
                    resetAuth();
                  }
                "
                >Academy</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                :to="{ name: 'Tools' }"
                :active="$route.name === 'Tools'"
                class="navbar-link"
                data-target="#navbar-dropdown"
                data-toggle="collapse"
                @click="
                  () => {
                    resetAuth();
                  }
                "
                >Tools</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                :to="{ name: 'Contact' }"
                :active="$route.name === 'Contact'"
                class="navbar-link"
                data-target="#navbar-dropdown"
                data-toggle="collapse"
                @click="
                  () => {
                    resetAuth();
                  }
                "
                >Contact</router-link
              >
            </li>
          </div>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import Auth from "../../pages/auth/Login.vue";
import Register from "../../pages/auth/Register.vue";
import ForgotPassword from "../../pages/auth/ForgotPassword.vue";
const ls = require("../../store/storage/LocalStorage");
const common = require("../../common");

export default {
  components: {
    Auth,
    Register,
    ForgotPassword,
  },

  data() {
    return {
      loginModal: false,
      isActiveNavbar: true,
      isActiveLogoText: true,
      isAuthenticated: ls.getStorage("userAuthenticated"),
    };
  },

  mounted() {
    //Check the local storage session based on intervalTime.
    const intervalTime = 5000;
    this.$nextTick(function () {
      window.setInterval(() => {
        if (ls.getStorage("userAuthenticated") === null) {
          this.isAuthenticated = null;
        }
      }, intervalTime);
    });
  },

  methods: {
    toggleNavbar() {
      common.toggleNavbar();
    },

    resetAuth() {
      ls.resetAuth();
    },

    setSignOut() {
      ls.setSignOut();
    },
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

/* Prevent nav jump set width & height.*/
.navbar {
  width: 100%;
  height: 4rem;
}

/* Always display the header.*/
header.container {
  display: block !important;
  background-color: transparent;
}

.container {
  background-color: #363031;
}

header {
  position: absolute;
  top: 0rem;
  left: 0rem;
  right: 0rem;
  z-index: 1000;
}

h1 {
  display: block;
  float: left;
  font-size: 1.5rem;
  color: #fff;
}

.logo-icon {
  display: block;
  float: left;
  width: 2rem;
  margin-top: 0.5rem;
  margin-right: 0.75rem;
}

.logo-text {
  display: block;
  float: left;
  font-family: "Roboto", Arial, Helvetica, sans-serif !important;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  margin-top: 0.4rem;
}

.logo-text-caption {
  display: block;
  font-family: "Roboto Condensed", Arial, Helvetica, sans-serif !important;
  font-size: 0.65rem;
  font-weight: 700;
  color: #837678;
  text-transform: capitalize;
}

/* Navbar styles */

.navbar-nav {
  width: 100%;
}

.navbar-header {
  padding-top: 2rem;
}

.navbar-close {
  display: block;
  float: right;
  color: #fff;
}

.navbar-nav {
  display: block;
  margin-top: 5rem;
}

.navbar-item {
  display: block;
}

.navbar-link {
  display: block;
  color: #fff;
  font-weight: 400;
  width: 100%;
  margin: 1.5rem 0rem;
  padding: 1rem;
  border: solid 1px #fff;
  border-radius: 0.5rem;
  text-align: center;
  white-space: nowrap;
}

.navbar-link:hover {
  font-weight: 700;
  color: #363031;
  background-color: #fcbf49;
  border: solid 1px #363031;
  text-decoration: none;
}

.navbar-link-auth {
  display: block;
  color: #363031 !important;
  background-color: #fcbf49;
  font-weight: 700;
  width: 100%;
  margin: 1.5rem 0rem;
  padding: 1rem;
  border: solid 1px #363031;
  border-radius: 0.5rem;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
}

.navbar-link-auth:hover {
  font-weight: 700;
  color: #fff;
  background-color: #363031;
  border: solid 1px #fff;
  text-decoration: none;
}

.navbar-link:active {
  color: #fcbf49;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .logo-icon {
    display: block;
    float: left;
    width: 2rem;
    margin-top: 0.5rem;
    margin-right: 0.75rem;
  }

  .logo-text {
    display: block;
    float: left;
    font-family: "Roboto", Arial, Helvetica, sans-serif !important;
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    margin-top: 0.4rem;
  }

  .logo-text-caption {
    display: block;
    font-family: "Roboto Condensed", Arial, Helvetica, sans-serif !important;
    font-size: 0.65rem;
    font-weight: 700;
    color: #837678;
    text-transform: capitalize;
  }

  /* Navbar styles */
  .navbar {
    height: 6.5rem;
  }

  .navbar-header {
    display: none;
  }

  .navbar-nav {
    display: inline;
    margin: 2rem 1.5rem;
  }

  .navbar-item {
    display: inline;
  }

  .navbar-link {
    display: inline;
    color: #fff;
    font-size: 1rem;
    font-weight: 400;
    padding: 0rem 1rem;
    border: none;
    border-radius: none;
    text-align: center;
    white-space: nowrap;
  }

  .navbar-link:hover {
    font-weight: 400;
    color: #fcbf49;
    background-color: transparent;
    border: none;
    text-decoration: none;
  }

  .navbar-item-auth {
    display: inline;
    float: right;
  }

  .navbar-link-auth {
    display: inline;
    color: #363031 !important;
    background-color: #fcbf49;
    font-size: 0.85rem;
    font-weight: 700;
    margin: 1.5rem 0.5rem;
    padding: 0.5rem 1rem;
    border: solid 1px #363031;
    border-radius: 0.5rem;
    text-align: center;
    white-space: nowrap;
  }

  .navbar-link-auth:hover {
    font-weight: 700;
    color: #fff !important;
    background-color: #363031;
    border: solid 1px #fff;
    text-decoration: none;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .navbar {
    height: 6.5rem;
  }

  .logo-icon {
    display: block;
    float: left;
    width: 2.5rem;
    margin-top: 0.5rem;
    margin-right: 0.75rem;
  }

  .logo-text {
    display: block;
    float: left;
    font-family: "Roboto", Arial, Helvetica, sans-serif !important;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    margin-top: 0.4rem;
  }

  .logo-text-caption {
    display: block;
    font-family: "Roboto Condensed", Arial, Helvetica, sans-serif !important;
    font-size: 0.875rem;
    font-weight: 700;
    color: #837678;
    text-transform: capitalize;
  }

  /* Navbar styles */

  .navbar-header {
    display: none;
  }

  .navbar-nav {
    display: inline;
    margin: 2rem 2.5rem;
  }

  .navbar-nav-main {
    display: inline;
    width: 100%;
    height: 1rem;
  }

  .navbar-nav-auth {
    display: inline;
    float: right;
    margin-left: 2rem;
    text-align: right;
  }

  .navbar-item {
    display: inline;
  }

  .navbar-link {
    display: inline;
    color: #fff;
    font-size: 1rem;
    font-weight: 400;
    padding: 0rem 1rem;
    border: none;
    border-radius: none;
    text-align: center;
    white-space: nowrap;
  }

  .navbar-link:hover {
    font-weight: 400;
    color: #fcbf49;
    background-color: transparent;
    border: none;
    text-decoration: none;
  }

  .navbar-nav-auth {
    display: inline;
    float: right;
    margin-left: 3rem;
  }

  .navbar-item-auth {
    display: inline;
    float: right;
  }

  .navbar-link-auth {
    display: inline;
    color: #363031 !important;
    background-color: #fcbf49;
    font-size: 1rem;
    font-weight: 700;
    margin: 1.5rem 0.5rem;
    padding: 0.5rem 1rem;
    border: solid 1px #363031;
    border-radius: 0.5rem;
    text-align: center;
    white-space: nowrap;
  }

  .navbar-link-auth:hover {
    font-weight: 700;
    color: #fff !important;
    background-color: #363031;
    border: solid 1px #fff;
    text-decoration: none;
  }
}
</style>

<template>
  <footer>
    <div class="container p-container">
      <div class="row pt pb">
        <div class="col-9">
          <router-link :to="{ name: 'Home' }" @click="resetAuth()">
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
          </router-link>
        </div>

        <div class="col-3">
          <img
            role="img"
            class="cxa-logo"
            src="~@/assets/svg/footer-logo.svg"
            aria-label="cxa logo"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-4 inset">
          <h1>Links</h1>
          <ul class="navbar-nav">
            <li class="navbar-item">
              <router-link
                :to="{ name: 'About Us' }"
                class="navbar-link"
                @click="resetAuth()"
                >About Us</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                :to="{ name: 'Events' }"
                class="navbar-link"
                @click="resetAuth()"
                >Events</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                :to="{ name: 'Insights' }"
                class="navbar-link"
                @click="resetAuth()"
                >Insights</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                :to="{ name: 'Tools' }"
                class="navbar-link"
                @click="resetAuth()"
                >Tools</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                :to="{ name: 'Contact' }"
                class="navbar-link"
                @click="resetAuth()"
                >Contact</router-link
              >
            </li>
            <li class="navbar-item">
              <router-link
                :to="{ name: 'CX Advisory' }"
                class="navbar-link"
                @click="resetAuth()"
                >Customer Experience Advisory</router-link
              >
            </li>
          </ul>
        </div>

        <div class="col-lg-4 col-md-4 col-sm-4 inset">
          <h1>Support & Inquiries</h1>
          <ul class="navbar-nav">
            <li class="navbar-item">
              <a
                class="navbar-link"
                :href="`mailto:${companyEmail}?subject=Firestarters General Inquiry`"
                >{{ companyEmail }}</a
              >
            </li>
            <li class="navbar-item">
              <a
                class="navbar-link"
                href="/"
                data-toggle="modal"
                data-target="#forgotPasswordModal"
                >Forgot Password</a
              >
            </li>
          </ul>
        </div>

        <div class="col-lg-4 col-md-4 col-sm-4 inset">
          <h1>Useful Links</h1>
          <ul class="navbar-nav">
            <li class="navbar-item">
              <a
                class="navbar-link"
                href="https://www.sap.com/about/legal/privacy.html"
                target="_blank"
                @click="resetAuth()"
                >Privacy Policy</a
              >
            </li>
            <li class="navbar-item">
              <a
                class="navbar-link"
                href="https://www.sap.com/corporate/en/legal/terms-of-use.html"
                target="_blank"
                @click="resetAuth()"
                >Terms Of Use</a
              >
            </li>
            <li class="navbar-item">
              <a
                class="navbar-link"
                href="https://www.sap.com/about/legal/impressum.html"
                target="_blank"
                @click="resetAuth()"
                >Legal Disclosure</a
              >
            </li>
            <li class="navbar-item">
              <a
                class="navbar-link"
                href="https://www.sap.com/about/legal/copyright.html"
                target="_blank"
                @click="resetAuth()"
                >Copyright</a
              >
            </li>
            <li class="navbar-item">
              <a
                class="navbar-link"
                href="https://www.sap.com/about/legal/trademark.html"
                target="_blank"
                @click="resetAuth()"
                >Trademark</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 text-center">
          <a :href="linkedInURL" target="_blank">
            <img
              role="img"
              class="linkedin-icon"
              src="~@/assets/svg/linkedin-icon.svg"
              aria-label="linkedin icon"
            />
          </a>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <h4>Presented by SAP®</h4>
          <p>
            Use of select third parties cookies or similar technologies for
            technical purposes and, with your consent, for other purposes as
            specified in the cookie policy. Consent the use of such technologies
            by using the “Accept” button. By closing this notice, you continue
            without accepting.
          </p>
          <p>Copyright © 2022 Firestarters. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
const ls = require("../../store/storage/LocalStorage");

export default {
  data() {
    return {
      companyEmail: process.env.VUE_APP_COMPANY_EMAIL,
      linkedInURL: process.env.VUE_APP_FIRESTARTERS_LINKEDIN_URL,
    };
  },

  methods: {
    resetAuth() {
      ls.resetAuth();
    },
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/
footer {
  background-color: #363031;
}
footer .container {
  display: block !important;
  margin-top: 0.85rem;
  padding: 0rem 1rem;
  //background-color: transparent;
  background-color: #363031;
}

h1 {
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  padding: 0rem;
}

h4 {
  font-size: 1rem;
  text-transform: capitalize;
  color: #fff;
  text-align: center;
}

p {
  color: #fff;
  font-size: 0.75rem;
  padding: 0rem 2.25rem;
  text-align: center;
}

.inset {
  padding: 0rem 3rem;
}

.logo-icon {
  display: block;
  float: left;
  width: 1.5rem;
  margin: 1rem 0.75rem 0rem 2.25rem;
}

.logo-text {
  display: block;
  float: left;
  font-family: "Roboto", Arial, Helvetica, sans-serif !important;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  margin-top: 0.8rem;
}

.logo-text-caption {
  display: block;
  font-family: "Roboto Condensed", Arial, Helvetica, sans-serif !important;
  font-size: 0.575rem;
  font-weight: 700;
  color: #837678;
  text-transform: capitalize;
}

.cxa-logo {
  display: block;
  float: right;
  width: 2.5rem;
  margin: 0.75rem 2.25rem 0rem 0rem;
}

.linkedin-icon {
  padding: 1rem;
}

/* Navbar styles */

.navbar-nav {
  margin-bottom: 2rem;
}

.navbar-item {
  padding: 0rem;
}

.navbar-link {
  font-size: 0.875rem;
  color: #fcbf49;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 1rem;
    font-weight: 400;
    color: #fff;
    margin: 0rem;
    padding: 2rem 0rem;
    white-space: nowrap;
  }

  .logo-icon {
    display: block;
    float: left;
    width: 1.5rem;
    margin: 1rem 0.75rem 0rem 0.5rem;
  }

  .navbar-item {
    padding: 0rem;
  }

  .inset {
    padding: 0rem 1.5rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  footer {
    padding: 2rem 2rem;
  }

  .cxa-logo {
    margin: 0.65rem 2.25rem 0rem 0rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  footer {
    padding: 2rem 4rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  footer {
    padding: 2rem;
  }

  h1 {
    margin: 0rem 2.25rem;
  }

  .logo-icon {
    margin: 1rem 0.75rem 0rem 2.25rem;
  }

  .navbar-item {
    padding: 0rem 2.25rem;
  }
}
</style>

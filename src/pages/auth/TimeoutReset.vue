<template>
  <div
    class="modal fade"
    id="timeoutResetModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="timeoutResetLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="form">
      <div class="modal-content">
        <div class="svg-container">
          <img
            role="img"
            src="~@/assets/svg/x-large-background.svg"
            class="x-background-icon"
            loading="lazy"
            aria-label="background icon"
          />
        </div>

        <div class="modal-header">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <h1 class="modal-title" id="forgotModalLabel">
                  {{ modalTitle }}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-body">
          <p>
            Your session is about to timeout, to continue click "Reset Session".
          </p>
        </div>

        <div class="modal-footer">
          <input
            type="button"
            class="btn btn-primary"
            value="Reset Session"
            data-dismiss="modal"
            @click="resetAuth()"
          />
          <input
            type="button"
            class="btn btn-primary"
            value="Cancel"
            data-dismiss="modal"
            @click="setSignOut()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ls = require("../../store/storage/LocalStorage");

export default {
  data() {
    return {
      modalTitle: "Session Timeout",
    };
  },

  methods: {
    resetAuth() {
      ls.setSignOutTimer("cancelSignOut");
      ls.resetAuth();
    },

    setSignOut() {
      ls.setSignOutTimer("cancelSignOut");
      ls.setSignOut();
    },
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

.modal-content {
  border-radius: 0.5rem !important;
}

.modal-body {
  padding: 0rem 1.5rem;
}

.modal-header {
  border-bottom: none;
}

.modal-title {
  margin: 0rem;
}

.modal-footer {
  justify-content: flex-start;
  padding: 1.5rem;
  border-top: none;
}

h1 {
  font-size: 3rem;
}

.result {
  margin: 2rem 1rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h4 {
    font-size: 3rem;
  }

  h5 {
    font-size: 2.5rem;
  }

  a.arrow-link {
    font-size: 0.75rem;
    margin-left: 1rem;
  }

  .result {
    margin: 2rem 1rem;
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
  h4 {
    font-size: 3rem;
  }

  h5 {
    font-size: 2.5rem;
  }

  a.arrow-link {
    font-size: 1rem;
    margin-left: 1rem;
  }

  .result {
    margin: 2rem 1rem;
  }
}
</style>

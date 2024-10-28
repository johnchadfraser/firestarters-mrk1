import router from "../../router";
import jquery from "jquery";

//Set ttl values.
const ttl30min = 1800000; //30 mins = 1800000
const ttl60day = 5184000000; //60 days = 5184000000

// Sets an item with a Key to local storage
const saveStorage = function (key, data, ttl) {
  //Set current time.
  const now = new Date();

  //Set item with exiration time.
  const item = {
    value: data,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

// Looks for a local storage item and returns if present
const getStorage = function (key) {
  const itemStr = localStorage.getItem(key);

  // If the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  //Warn user of timeout.
  if (key === "userAuthenticated") {
    const warningTime = new Date(Date.now() + 60000);
    const timeCheck = warningTime.getTime();

    if (timeCheck >= item.expiry) {
      var timeWarn = (function () {
        var executed = false;

        return function () {
          if (executed === false) {
            executed = true;
            timeWarning();
          }
        };
      })();

      timeWarn();
    }
  }

  // Compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
};

// Clear a single item or the whole local storage
const timeWarning = function () {
  //Show the timeout reset modal.
  jquery("#timeoutResetModal").modal("show");

  //If the reset does not occur force sign out.
  setSignOutTimer("forceSignOut");
};

const setSignOutTimer = function (action) {
  var forceSignOut = false;
  var timeoutInterval = "";

  if (action === "forceSignOut" && !forceSignOut) {
    forceSignOut = true;
    timeoutInterval = setInterval(setSignOut, 55000);
  }

  if (action === "cancelSignOut") {
    clearInterval(timeoutInterval);
  }
};

// Clear a single item or the whole local storage
const clearStorage = function (key = "false") {
  if (key) {
    localStorage.removeItem(key);
  } else {
    localStorage.clear();
  }
};

const setLogin = function (email, remember) {
  //Set session.
  saveStorage("userAuthenticated", true, ttl30min);
  saveStorage("userEmail", email, ttl60day);
  saveStorage("userRemember", remember, ttl60day);
};

const setLocale = function (locale, reset = false) {
  if (localStorage.getItem("userLocale") == null) {
    saveStorage("userLocale", locale, ttl60day);
  } else if (reset === true) {
    saveStorage("userLocale", locale, ttl60day);
  }
};

const resetAuth = function () {
  if (localStorage.getItem("userAuthenticated") !== null) {
    //Set session.
    saveStorage("userAuthenticated", true, ttl30min);
  }
};

const checkAuth = function (auth, email) {
  //Return to home if session expired.
  if (auth === null) {
    router.push({ name: "Home" });
  }

  //Return to home if email cookie is missing.
  if (email === "" || email === null) {
    clearStorage("userAuthenticated");
    router.push({ name: "Home" });
  }
};

const setSignOut = function () {
  clearStorage("userAuthenticated");

  //Go to home page.
  router.push({ name: "Home" }).then(() => {
    router.go();
  });
};

// Exports all avaliable functions on the script
export {
  getStorage,
  saveStorage,
  clearStorage,
  setLogin,
  setLocale,
  resetAuth,
  checkAuth,
  setSignOut,
  setSignOutTimer,
};

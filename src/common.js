//Close modal on back button.
const clearModal = function () {
  window.onhashchange = function () {
    document.querySelector(".modal-backdrop").removeAttribute("class");
    window.location.reload();
  };
}

const toggleNavbar = function () {
  //Find all containers and hide then when mobile nav menu is toggled.

  var elem = document.getElementsByClassName("p-container");
  
  //Get all containers and hide/show them.
  Array.from(elem).forEach((x) => {
    
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  });

}

export {
  clearModal,
  toggleNavbar
}

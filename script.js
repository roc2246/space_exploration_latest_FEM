const navToggle = {
  container: document.getElementsByClassName("top__hamburger-container")[0],
  hamburger: document.getElementsByClassName(
    "top__hamburger-container--icon-open"
  )[0],
  close: document.getElementsByClassName(
    "top__hamburger-container--icon-close"
  )[0],
  nav: document.getElementsByClassName("top__nav")[0],
  toggle: () => {
    const condition =
      navToggle.nav.style.display === "none" ||
      navToggle.nav.style.display === "";
    if (condition) {
      navToggle.nav.style.display = "flex";
      navToggle.hamburger.style.display = "none";
      navToggle.close.style.display = "inline-block";
    } else {
      navToggle.nav.style.display = "none";
      navToggle.hamburger.style.display = "inline-block";
      navToggle.close.style.display = "none";
    }
  },
};

navToggle.container.onclick = () => {
  navToggle.toggle();
};

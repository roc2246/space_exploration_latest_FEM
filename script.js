const navToggle = {
  container: document.getElementsByClassName("top__hamburger-container")[0],
  hamburger: document.getElementsByClassName(
    "top__hamburger-container--icon-open"
  )[0],
  close: document.getElementsByClassName(
    "top__hamburger-container--icon-close"
  )[0],
  nav: document.getElementsByClassName("top__nav")[0],
  setDisplay: (nav, hamburger, close) => {
    navToggle.nav.style.display = nav;
    navToggle.hamburger.style.display = hamburger;
    navToggle.close.style.display = close;
  },
  toggle: () => {
    const condition =
      navToggle.nav.style.display === "none" ||
      navToggle.nav.style.display === "";
    if (condition) {
      navToggle.setDisplay("flex", "none", "inline-block");
    } else {
      navToggle.setDisplay("none", "inline-block", "none");
    }
  },
};

navToggle.container.onclick = () => {
  navToggle.toggle();
};

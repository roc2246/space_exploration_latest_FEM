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

function getSelector(type) {
  const selector = document.getElementsByClassName(`${type}__selector`)[0];
  return selector;
}

function createSelection(type, text) {
  const btn = document.createElement("button");
  btn.className = `${type}__selector--btn`;
  btn.innerText = `${text}`;
  return btn;
}

function getSelectorBtns(type) {
  const btn = document.getElementsByClassName(`${type}__selector--btn`);
  return btn;
}

const selectors = {
  destinations: getSelector("destination"),
  crew: getSelector("crew"),
  technology: getSelector("technology"),
  loadSelections: (selector, data, ele) => {
    if (selector) {
      for (let x in data) {
        let name;
        if (ele === "crew") {
          name = "";
        } else if (ele === "destination") {
          name = data[x].name.toUpperCase();
        } else if (ele === "technology") {
          name = parseInt(x) + 1;
        }

        const selection = createSelection(`${ele}`, name);
        selector.append(selection);
      }
    }
  },
};

async function getData() {
  const resonse = await fetch("data.json");
  const data = await resonse.json();
  return data;
}

getData().then((data) => {
  const { destinations, crew, technology } = data;

  selectors.loadSelections(selectors.destinations, destinations, "destination");
  selectors.loadSelections(selectors.crew, crew, "crew");
  selectors.loadSelections(selectors.technology, technology, "technology");

  const selectBtns ={
    destination: getSelectorBtns("destination"),
    crew: getSelectorBtns("crew"),
    technology: getSelectorBtns("technology")
  } ;

});

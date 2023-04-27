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

const selectors = {
  destinations: getSelector("destination"),
  crew: getSelector("crew"),
  technology: getSelector("technology"),
  loadSelections: (type, text) => {},
};

async function getData() {
  const resonse = await fetch("data.json");
  const data = await resonse.json();
  return data;
}

getData().then((data) => {
  const { destinations, crew, technology } = data;


  if (selectors.destinations) {
    for (let x in destinations) {
      const selection = destinations[x].name.toUpperCase();
      const destination = createSelection("destination", selection);
      selectors.destinations.append(destination);
    }
  }

  if (selectors.crew) {
    for (let x in crew) {
      const selection = "";
      const crewSelection = createSelection("crew", selection);
      selectors.crew.append(crewSelection);
    }
  }

  if (selectors.technology) {
    for (let x in technology) {
      const selection = parseInt(x) + 1;
      const technology = createSelection("technology", selection);
      selectors.technology.append(technology);
    }
  }


});

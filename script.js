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

function getContainers(block) {
  let headings;
  let img;

  let distance;
  let travel;

  if (block === "crew" || block === "technology") {
    headings = {
      secondary: document.getElementsByClassName(
        `${block}__heading--secondary`
      )[0],
      primary: document.getElementsByClassName(`${block}__heading--primary`)[0],
    };
  } else {
    headings = document.getElementsByClassName(`${block}__heading`)[0];
  }

  if (block === "technology") {
    img = {
      landscape: document.getElementsByClassName(
        `${block}__img-cont--landscape`
      )[0],
      portrait: document.getElementsByClassName(
        `${block}__img-cont--portrait`
      )[0],
    };
  } else {
    img = document.getElementsByClassName(`${block}__img-cont--img`)[0];
  }

  if (block === "destination") {
    distance = {
      heading: document.getElementsByClassName("distance__heading")[0],
      stat: document.getElementsByClassName("distance__stat")[0],
    };

    travel = {
      heading: document.getElementsByClassName("travel__heading")[0],
      stat: document.getElementsByClassName("travel__stat")[0],
    };
  } else {
    distance = null;
    travel = null;
  }

  return {
    heading: headings,
    info: document.getElementsByClassName(`${block}__info`)[0],
    img: img,
    distance: distance,
    travel: travel,
  };
}

const techCont = getContainers("technology");
const crewCont = getContainers("crew");
const destCont = getContainers("destination");

function getSelector(block, element) {
  const ele = document.getElementsByClassName(`${block}__${element}`);
  return ele;
}

const selectors = {
  destinations: getSelector("destination", "selector")[0],
  crew: getSelector("crew", "selector")[0],
  technology: getSelector("technology", "selector")[0],
  createSelection: (type, text) => {
    const btn = document.createElement("button");
    btn.className = `${type}__selector--btn`;
    btn.innerText = `${text}`;
    return btn;
  },
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

        const selection = selectors.createSelection(`${ele}`, name);
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

  const selectBtns = {
    destination: getSelector("destination", "selector--btn"),
    crew: getSelector("crew", "selector--btn"),
    technology: getSelector("technology", "selector--btn"),
    changeState: (buttons, outerCount) => {
      Object.keys(buttons).forEach((btn) => {
        if (buttons === selectBtns.destination) {
          buttons[btn].style.borderBottom = "none";
        } else if (buttons === selectBtns.crew) {
          buttons[btn].style.backgroundColor = "#bbb";
        } else if (buttons === selectBtns.technology) {
          selectBtns.technology[btn].style.color = "black";
          selectBtns.technology[btn].style.backgroundColor = "transparent";
        }
      });
      if (buttons === selectBtns.destination) {
        buttons[outerCount].style.borderBottom = "solid";
      } else if (buttons === selectBtns.crew) {
        buttons[outerCount].style.backgroundColor = "#9dcdee";
      } else if (buttons === selectBtns.technology) {
        buttons[outerCount].style.color = "white";
        buttons[outerCount].style.backgroundColor = "black";
      }
    },
  };

  for (let button in selectBtns.destination) {
    selectBtns.destination[button].onclick = () => {
      selectBtns.changeState(selectBtns.destination, button)

      destCont.heading.innerHTML = destinations[button].name;
      destCont.info.innerHTML = destinations[button].description;

      destCont.img.src = destinations[button].images.png;
      destCont.img.alt = destinations[button].name;

      destCont.distance.stat.innerHTML =
        destinations[button].distance.toUpperCase();
      destCont.travel.stat.innerHTML =
        destinations[button].travel.toUpperCase();
    };
  }

  for (let button in selectBtns.crew) {
    selectBtns.crew[button].onclick = () => {
      selectBtns.changeState(selectBtns.crew, button)

      crewCont.heading.secondary.innerHTML = crew[button].role.toUpperCase();
      crewCont.heading.primary.innerHTML = crew[button].name;
      crewCont.info.innerHTML = crew[button].bio;

      crewCont.img.src = crew[button].images.png;
      crewCont.img.alt = crew[button].name;
    };
  }

  for (let button in selectBtns.technology) {
    selectBtns.technology[button].onclick = () => {
      selectBtns.changeState(selectBtns.technology, button) 

      selectBtns.technology[button].style.color = "white";
      selectBtns.technology[button].style.backgroundColor = "black";

      techCont.heading.primary.innerHTML = technology[button].name;
      techCont.info.innerHTML = technology[button].description;

      techCont.img.landscape.src = technology[button].images.landscape;
      techCont.img.landscape.alt = technology[button].name;

      techCont.img.portrait.src = technology[button].images.portrait;
      techCont.img.portrait.alt = technology[button].name;
    };
  }
});

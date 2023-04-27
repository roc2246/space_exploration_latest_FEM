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

  if (block === "crew" || block === "technology") {
    headings = {
      secondary: document.getElementsByClassName(
        `${block}__heading--secondary`
      )[0],
      primary: document.getElementsByClassName(`${block}__heading--primary`)[0],
    };
  } else {
    headings = document.getElementsByClassName(`${block}__heading`)[0]
  }

  if(block === "technology"){
    img = {
      landscape: document.getElementsByClassName(`${block}__img-cont--landscape`)[0],
      portrait: document.getElementsByClassName(`${block}__img-cont--portrait`)[0]
    }
  } else {
    img = document.getElementsByClassName(`${block}__img-cont--img`)[0]
  }


  return {
    heading: headings,
    info: document.getElementsByClassName(`${block}__info`)[0],
    img: img,
  };
}

const techCont = getContainers("technology");
const crewCont = getContainers("crew");
const destCont = getContainers("destination");

// console.log(techCont)
// console.log(crewCont)
// console.log(destCont)


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
  };

  for(let button in selectBtns.destination) {
    selectBtns.destination[button].onclick = () =>{
      console.log(destinations[button])
    }
  }

  for(let button in selectBtns.crew) {
    selectBtns.crew[button].onclick = () =>{
      console.log(crew[button])
    }
  }

  for(let button in selectBtns.technology) {
    selectBtns.technology[button].onclick = () =>{
      console.log(technology[button])
    }
  }
});

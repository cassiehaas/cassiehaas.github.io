document.querySelectorAll('.slideshow').forEach(el => {
  new Flickity(el, {
    cellAlign: 'center',
    contain: true,
    wrapAround: true,
    autoPlay: 3000,
    prevNextButtons: true, // make sure this is set
    pageDots: false,
    imagesLoaded: true,
    freeScroll: true,
  });
});

let theater_flkty = new Flickity('.theater-slides', {
  // options
  cellAlign: 'center',
  contain: true,
  wrapAround: true,
  autoPlay: 3000,
  pageDots: false,
  imagesLoaded: true,
  freeScroll: true,
});

let portraits_flkty = new Flickity('.portraits-slides', {
  // options
  cellAlign: 'center',
  contain: true,
  wrapAround: true,
  autoPlay: 3000,
  pageDots: false,
  imagesLoaded: true,
  freeScroll: true,
});

let dance_flkty = new Flickity('#dance-slides', {
  // options
  cellAlign: 'center',
  contain: true,
  wrapAround: true,
  autoPlay: 3000,
  pageDots: false,
  imagesLoaded: true,
  freeScroll: true,
});

/* Swap theater elements if in mobile view. */
// Create a media condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia('(width < 1000px)')
// Check if the media query is true
var swapped = false;

function handleTabletChange(e) {
  if (e.matches) {
	let first = document.querySelector("#theater > .first");
	let second = document.querySelector("#theater > .second");
	first.parentNode.insertBefore(second, first);

	first.classList.remove("first");
	first.classList.add("second");

	second.classList.remove("second");
	second.classList.add("first");

	swapped = true;
  } else if (swapped) {
	let first = document.querySelector("#theater > .first");
	let second = document.querySelector("#theater > .second");
	first.parentNode.insertBefore(second, first);

	first.classList.remove("first");
	first.classList.add("second");

	second.classList.remove("second");
	second.classList.add("first");

	swapped = false;
  }

}

mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);

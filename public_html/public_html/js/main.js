
// Hamburger menu Animation

document.addEventListener("DOMContentLoaded", function () {
  const menuButtonContainer = document.getElementById("menuButtonContainer");
  const nav = document.querySelector("nav");
  const menuItems = document.querySelectorAll(".menudrop li");

  menuButtonContainer.addEventListener("click", function() {
    // Toggle the 'menu-open' class to trigger the animations
    menuButtonContainer.classList.toggle("menu-open");

    // Toggle the 'translate-y-[-100%]' class to open/close the navigation menu
    nav.classList.toggle("translate-y-[-100%]");

    // Toggle the 'toggled' class on the list items
    menuItems.forEach(item => item.classList.toggle("toggled"));
  });
   });


window.addEventListener('load', () => {
  AOS.init();
  AOS.refresh();
});

// You can also pass an optional settings object
// below listed default settings

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});;



   var bouncingButton = anime({
	targets: '.bouncingbutton',
	translateY: '0.7rem',
	duration: 400,
	loop: true,
	direction: 'alternate',
	easing: 'easeInCubic',
	scaleY: {
		value: 0.9,
		duration: 250,
		delay: 250
    },
    scaleX: {
		value: 1.03,
		duration: 250,
		delay: 250
    }
     
   });



// Splide Slider

document.addEventListener("DOMContentLoaded", function () {
  // Check if there are elements with the selector '.splide' on the page
  const splideElements = document.querySelectorAll('.splide');
  const shouldInitializeSplide = splideElements.length > 0;

  if (shouldInitializeSplide) {
    const steps = document.querySelectorAll('.color-change');
    const splide = new Splide('.splide', {
      type: 'fade',
      pagination: false,
      heightRatio: 1,
      speed: 1000,
    }).mount();

  let currentIndex = 0;
  let automaticMode = true;
  let intervalId = null;

  function changeColorAndSlide(index) {
    for (let i = 0; i < steps.length; i++) {
      if (i <= index) {
        steps[i].classList.add('active-step');
      } else {
        steps[i].classList.remove('active-step');
      }
    }

    // Move Splide to the corresponding slide with fade transition
    splide.go(index);
  }

  function startAutomaticMode() {
    automaticMode = true;

    intervalId = setInterval(() => {
      if (currentIndex < steps.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }

      changeColorAndSlide(currentIndex);
    }, 1650); // Adjust the delay between automatic mode changes
  }

  function handleKeyPress(event) {
    automaticMode = false; // Switch to manual mode
    clearInterval(intervalId); // Clear the interval

    if (event.key === 'ArrowLeft') {
      currentIndex = Math.max(0, currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      currentIndex = Math.min(steps.length - 1, currentIndex + 1);
    } else {
      return;
    }

    // Change the color and move Splide based on the current index
    changeColorAndSlide(currentIndex);

    // Restart automatic mode after manual change
    startAutomaticMode();
  }

  function handleStepClick(index) {
    automaticMode = false; // Switch to manual mode
    clearInterval(intervalId); // Clear the interval
    currentIndex = index;

    // Change the color and move Splide based on the clicked index
    changeColorAndSlide(currentIndex);

    // Restart automatic mode after manual change
    startAutomaticMode();
  }

  // Listen for slide changes and update the active step
  splide.on('moved', function (newIndex) {
    automaticMode = false; // Set automaticMode to false when the slide changes manually
    clearInterval(intervalId); // Clear the interval

    currentIndex = newIndex; // Update currentIndex based on the moved event
    changeColorAndSlide(newIndex);

    // Restart automatic mode after manual change
    startAutomaticMode();
  });

  // Manually set the initial state
  changeColorAndSlide(currentIndex);

  // Start the animation from the first step
  startAutomaticMode();

  // Listen for keyboard events
  document.addEventListener('keydown', handleKeyPress);

  // Listen for click events on each step
  const clickableDivs = document.querySelectorAll('.touch-control');
  clickableDivs.forEach((div, index) => {
    div.addEventListener('click', () => {
      handleStepClick(index);
    });
  });

  // Handle page visibility changes
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      // Page is hidden, stop automatic mode
      automaticMode = false;
      clearInterval(intervalId);
    } else {
      // Page is visible again, restart automatic mode
      startAutomaticMode();
    }
    });
  }
});


 

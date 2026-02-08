 


 var bouncingBall = anime({
	targets: '.couch',
	translateY: '0.3rem',
	duration: 400,
	loop: true,
	direction: 'alternate',
	easing: 'easeInCubic',
	scaleY: {
		value: 0.98,
		duration: 250,
		delay: 250
    },
    scaleX: {
		value: 1.01,
		duration: 250,
		delay: 250
    }
     
   });




// Clock Time Animation

var inc = 1000;

// Check if clock elements exist on the page
const hourElement = document.querySelector('.hour');
const minuteElement = document.querySelector('.minute');
const secondElement = document.querySelector('.second');

if (hourElement && minuteElement && secondElement) {
    // Clock elements found, proceed with the clock script
    clock();
    setInterval(clock, inc);
}

function clock() {
    const date = new Date();

    const hours = ((date.getHours() + 11) % 12 + 1);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hour = (hours * 30) + (minutes / 2);
    const minute = minutes * 6;
    const second = seconds * 6;

    // Update clock elements only if they exist
    if (hourElement) {
        hourElement.style.transform = `rotate(${hour}deg)`;
    }

    if (minuteElement) {
        minuteElement.style.transform = `rotate(${minute}deg)`;
    }

    if (secondElement) {
        secondElement.style.transform = `rotate(${second}deg)`;
    }
}



// Statistics counter Animation

function animatedCounter(target, time = 300, start = 0, elementId) {
    let current = start;
    const increment = (target - current) / time;
    const counterElement = document.getElementById(elementId);

    if (!counterElement) {
        // Counter element not found on the page, do nothing
        return;
    }

    function updateCounter() {
        if (current < target) {
            current += increment;
            const roundedValue = Math.round(current);
            counterElement.innerHTML = `${roundedValue}<span class="text-dark-purple font-normal animate-pulse">+</span>`;
            requestAnimationFrame(updateCounter);
        }
    }

    // Initialize the counter animation when the element is in the viewport
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            updateCounter();
            observer.unobserve(counterElement); // Stop observing once it starts
        }
    });

    // Start observing the counter element
    observer.observe(counterElement);
}

// Example usage on a page where the counter is used
animatedCounter(9, 100, 0, "counter1");
animatedCounter(12, 100, 0, "counter2");
animatedCounter(2500, 100, 0, "counter3");
animatedCounter(11500, 100, 0, "counter4");






// India Map Animation start

      const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin
    threshold: 0.5, // Trigger when 50% of the target is visible
};

// Callback function for the Intersection Observer
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            draw(); // If the target is in view, trigger the draw function
        }
    });
}

// Target the .map element
const mapElement = document.querySelector('.map');

// Check if the mapElement and its child SVG element are valid HTML elements before proceeding
if (mapElement instanceof Element && mapElement.querySelector('svg') instanceof Element) {
    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(handleIntersection, options);

    // Start observing the SVG element
    observer.observe(mapElement.querySelector('svg'));

    // We are only adding the 'active' class,
    // the entire animation is defined in the CSS code
    function draw() {
        mapElement.querySelector('svg').classList.add('active');
        // Stop observing after animation is triggered
        observer.unobserve(mapElement.querySelector('svg'));
    }
}



// Language transition 

document.addEventListener('DOMContentLoaded', function () {
  const imageSets = document.querySelectorAll('.fade-image-set');
  let currentIndex = 0;

  function fadeInNextImage() {
    imageSets.forEach((set) => {
      const images = set.children;
      const nextIndex = (currentIndex + 1) % images.length;

      images[currentIndex].classList.remove('opacity-100');
      images[currentIndex].classList.add('opacity-0');

      images[nextIndex].classList.remove('opacity-0');
      images[nextIndex].classList.add('opacity-100');
    });

    currentIndex = (currentIndex + 1) % imageSets[0].children.length;
  }

  // Start the transition after a short delay (adjust as needed)
  setTimeout(() => {
    setInterval(fadeInNextImage, 3000); // Change images every 3 seconds (adjust as needed)
  }, 500);
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
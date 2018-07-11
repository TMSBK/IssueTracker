const hamburger = document.getElementById('hamburger');
const navContainer = document.getElementById('navContainer');
let navFlag = false;

hamburger.addEventListener('click', function() {
	if (navFlag === false) {
		navContainer.classList.add('transition');
		navContainer.setAttribute('style', 'top: 0');
		navFlag = true;
	} else {
		navContainer.setAttribute('style', 'top: -225%');
		setTimeout(function() {
			navContainer.classList.remove('transition');
		}, 400);
		navFlag = false;
	}
});

// Get the link element that references the templates.html file.
var templatesImport = document.getElementById('templates');

// Retrieve the loaded templates.
var templates = templatesImport.import

// Get the template.
var template = templates.getElementById('form');

// Clone the template content.
var clone = document.importNode(template.content, true);

// Add the blog post to the page.
document.getElementById('main').appendChild(clone);

const firstNav = document.getElementById('1');
firstNav.addEventListener('click', function() {
	// Add the blog post to the page.
	document.getElementById('main').appendChild(clone);
});


/* ==================== BEJELENTŐ FORM ==================== */


/* Ez a kód kezeli az értékelő pontokat */

let radioButtonValue = '';

function ratingTracker(radioButton) {
	radioButtonValue = radioButton.value;
	const ratingSign = document.getElementById('ratingSign');
	ratingSign.textContent = radioButtonValue + ' pont';

	for (let k=1; k <= 5; k++) {
		let radioElement = document.getElementById(k + 'p');
		if (k<=radioButtonValue) {
		    radioElement.classList.add('radioInputSpanBackground');
		} else {
		    radioElement.classList.remove('radioInputSpanBackground');
		}
	}
}



/* Itt kezeljük a beállítások hamburger menüt */

const containerOn = document.getElementById('selectContainerOn');
const containerOff = document.getElementById('selectContainerOff');
const selectContainer = document.getElementById('selectContainer');

containerOn.addEventListener('click', function() {
    selectContainer.classList.add('transition');
    selectContainer.style.top = '0';
});

containerOff.addEventListener('click', function() {
    selectContainer.style.top = '-100%';
    setTimeout(function() {
        selectContainer.classList.remove('transition');
    }, 400);
});

/* Itt töltjük fel a beállítások hamburger menüt adatokkal */

function fillSelectItemShell(options) {
  let selectItemShell = document.getElementsByClassName('selectItemShell');
  for (let i = 0; i < selectItemShell.length; i++) {
      selectItemShell[i].innerHTML = options.options[i].name;
  }
}

fetch('options.json', {
    })
        .then(response => response.json())
        .then(optionsJSON => {
              let options = optionsJSON; 
              fillSelectItemShell(options); 
        })



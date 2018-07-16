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

/* =============================================== BEJELENTŐ FORM ================================================ */

// Get the template.
var formTemplate = templates.getElementById('form');

// Clone the template content.
var formTemplateClone = document.importNode(formTemplate.content, true);

// Add the blog post to the page.
document.getElementById('main').appendChild(formTemplateClone);


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
let selectShell = document.getElementsByClassName('selectShell');

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

/* Itt szedjük le az adatokat a JSON-ból */

fetch('options.json', {
    })
        .then(response => response.json())
        .then(optionsJSON => {
              let options = optionsJSON; 
              fillSelectShell(options); 
        })

/* Itt töltjük fel a beállítások hamburger menüt adatokkal */

function fillSelectShell(options) {
    for (let i = 0; i < selectShell.length; i++) {
        selectShell[i].getElementsByTagName('p')[0].innerHTML = options.options[i].name;
        let value = Object.values(options.options[i].values);
        let back = document.createElement('div');
        back.innerHTML = options.options[i].name;
        back.classList.add('optionShell');
        back.style.display = 'none';
        selectShell[i].append(back);
        back.addEventListener('click', function() {
            selectShell[i].getElementsByTagName('p')[0].innerHTML = options.options[i].name;
            selectShell[i].getElementsByTagName('option')[0].value = options.options[i].name;
        });
        for(let j = 0; j < value.length; j++) {
            let option = document.createElement('div');
            option.innerHTML = value[j];
            option.classList.add('optionShell');
            option.style.display = 'none';
            option.addEventListener('click', function() {
                selectShell[i].getElementsByTagName('p')[0].innerHTML = this.innerHTML;
                selectShell[i].getElementsByTagName('option')[0].value = this.innerHTML;
            });
            selectShell[i].append(option);
        }    
    }
}

/* Itt kezeljük a legördülőket */

let optionShell = document.getElementsByClassName('optionShell');

for(let i = 0; i < selectShell.length; i++) {
    let optionShellArray = selectShell[i].getElementsByClassName('optionShell');
    selectShell[i].addEventListener('click', function() {
        if(this.getElementsByClassName('optionShell')[0].style.display === 'none') {
            for(let j = 0; j < optionShell.length; j++) {
                optionShell[j].style.display = 'none';
            }
            for(let j = 0; j < optionShellArray.length; j++) {
                optionShellArray[j].style.display = 'block';
            }
        } else {
            for(let j = 0; j < optionShellArray.length; j++) {
                optionShellArray[j].style.display = 'none';
            }
        }
    })
}


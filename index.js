const hamburger = document.getElementById('hamburger');
const navContainer = document.getElementById('navContainer');
let navFlag = false;

hamburger.addEventListener('click', function() {
	if (navFlag === false) {
		navContainer.classList.add('transition');
		navContainer.setAttribute('style', 'top: 0');
		navFlag = true;
	} else {
		navContainer.setAttribute('style', 'top: -150%');
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

var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
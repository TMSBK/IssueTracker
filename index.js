// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
//?
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

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

for (let i=1; i <= 3; i++) {
    document.getElementById(i).addEventListener('click', function() {
        navContainer.setAttribute('style', 'top: -225%');
        setTimeout(function() {
           navContainer.classList.remove('transition');
        }, 400);
        navFlag = false;
    })
}

function contentLoader(templateName, functionName) {

    fetch('Templates/templates.html')
        .then(function(response) {
            // Lehívom a template-eket és textté konvertálom őket
            return response.text()
        })
        .then(function(html) {
    
            let parser = new DOMParser(); // Beállítom a DOM parsert
            let doc = parser.parseFromString(html, "text/html"); // Stringből HTML-lé alakítom a template-eket
            let usedTemplate = doc.getElementById(templateName); // Itt választom ki a template nevét
            document.getElementById('main').innerHTML = ''; // Itt kiürítem a felületet
            document.getElementById('main').appendChild(usedTemplate.content); // Itt betöltöm a felületet
            functionName(); // Meghívom a template-hez tartozó scriptet
        })
}

document.getElementById('1').addEventListener('click', function(){
    contentLoader('form', formHelper);
});

document.getElementById('2').addEventListener('click', function(){
    contentLoader('issues', issueHelper);
});

document.getElementById('3').addEventListener('click', function(){
    contentLoader('password', passwordHelper);
});

function passwordHelper() {
  console.log('teszt');
}


/* =============================================== BEJELENTŐ FORM ================================================ */
 
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

function formHelper() {

    /* Itt kezeljük a beállítások hamburger menüt */

    const containerOn = document.getElementById('selectContainerOn');
    const selectContainer = document.getElementById('selectContainer');

    containerOn.addEventListener('click', function() {
        selectContainer.classList.add('transition');
        selectContainer.style.top = '0';
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

    let html = '<p></p><select><option></option></select>' // Ezzel töltjük fel a selectShell-eket
    let optionShells = document.getElementsByClassName('optionShell'); // Ezek az opció maszkok

    function fillSelectShell(options) {

        for (let i = 0; i < options.options.length; i++) { // Végig iterálunk a JSON-on

            let createdSelectShell = document.createElement('div'); // Itt generálunk selectShell-eket a JSON alapján
            createdSelectShell.innerHTML = html; // Itt töltjük fel őket
            createdSelectShell.classList.add('selectShell'); // Itt adunk class-t hozzá
            selectContainer.append(createdSelectShell); // Itt adjuk hozzá a konténerhez
            let usedOptionShells = createdSelectShell.getElementsByClassName('optionShell');

            createdSelectShell.addEventListener('click', function() {
                if(this.getElementsByClassName('optionShell')[0].style.display === 'none') {
                    for(let i = 0; i < optionShells.length; i++) {
                        optionShells[i].style.display = 'none';
                    }
                    for(let i = 0; i < usedOptionShells.length; i++) {
                        usedOptionShells[i].style.display = 'block';
                    }
                } else {
                    for(let i = 0; i < usedOptionShells.length; i++) {
                        usedOptionShells[i].style.display = 'none';
                    }
                }
            });

            // Itt adjuk meg az elrejtett option/select elemek tulajdonságait

            document.getElementsByTagName('select')[i].name = options.options[i].name;
            document.getElementsByTagName('option')[i].value = options.options[i].name;
            document.getElementsByTagName('select')[i].classList.add('selectItem');
        }

        let selectShells = document.getElementsByClassName('selectShell');

        for (let i = 0; i < selectShells.length; i++) {
            selectShells[i].getElementsByTagName('p')[0].innerHTML = options.options[i].name;
            let value = Object.values(options.options[i].values);
            let back = document.createElement('div');
            back.innerHTML = options.options[i].name;
            back.classList.add('optionShell');
            back.style.display = 'none';
            selectShells[i].append(back);
            back.addEventListener('click', function() {
                selectShells[i].getElementsByTagName('p')[0].innerHTML = options.options[i].name;
                selectShells[i].getElementsByTagName('option')[0].value = options.options[i].name;
            });

            for(let j = 0; j < value.length; j++) {
                let option = document.createElement('div');
                option.innerHTML = value[j];
                option.classList.add('optionShell');
                option.style.display = 'none';
                option.addEventListener('click', function() {
                    selectShells[i].getElementsByTagName('p')[0].innerHTML = this.innerHTML;
                    selectShells[i].getElementsByTagName('option')[0].value = this.innerHTML;
                });

                selectShells[i].append(option);
            }    
        }

        let close = document.createElement('div');
        close.innerHTML = 'Vissza';
        close.setAttribute('id', 'selectContainerOff');
        close.addEventListener('click', function() {
            selectContainer.style.top = '-100%';
            setTimeout(function() {
                selectContainer.classList.remove('transition');
            }, 400);
        });

        selectContainer.append(close);
    }

}

/* =============================================== BEJELENTÉSEK ================================================ */

function issueHelper() {

    /* Itt szedjük le az adatokat a JSON-ból */

    fetch('issues.json', {
        })
            .then(response => response.json())
            .then(issuesJSON => {
                  let datas = issuesJSON; 
                  fillIssue(datas);
            })    

    let html = '<h3></h3>';
    let issueContainer = document.getElementById('issueContainer');
    const issueData = document.getElementById('issueData'); 
    const issuePanel = document.getElementById('issuePanel'); 

    function fillIssue(datas) {
        for(let i = 0; i < datas.issues.length; i++) {
            let createdIssue = document.createElement('div'); // Itt generálunk selectShell-eket a JSON alapján
            createdIssue.innerHTML = html; // Itt töltjük fel őket
            createdIssue.classList.add('issue'); // Itt adunk class-t hozzá
            let issues = document.getElementsByClassName('issue'); 
            issueContainer.append(createdIssue); // Itt adjuk hozzá a konténerhez
            issues[i].getElementsByTagName('h3')[0].innerHTML = datas.issues[i].issue.substring(0,23) + '...';

            if (datas.issues[i].Státusz === 'Bejelentve') {
                createdIssue.style.backgroundColor = '#d35400';
                createdIssue.classList.add('active');
            } 
            else if (datas.issues[i].Státusz === 'Munkafelvétel') {
                createdIssue.style.backgroundColor = '#9b59b6';
                createdIssue.classList.add('active');
            } 
            else if (datas.issues[i].Státusz === 'Jóváhagyásra') {
                createdIssue.style.backgroundColor = '#e67e22';
                createdIssue.classList.add('active');
            } 
            else if (datas.issues[i].Státusz === 'Végrehajtásra') {
                createdIssue.style.backgroundColor = '#3498db';
                createdIssue.classList.add('active');
            } 
            else if (datas.issues[i].Státusz === 'TeljesítésIgazolásra') {
                createdIssue.style.backgroundColor = '#f39c12';
                createdIssue.classList.add('finished');
            } 
            else if (datas.issues[i].Státusz === 'Ellenőrzésre') {
                createdIssue.style.backgroundColor = '#f1c40f';
                createdIssue.classList.add('finished');
            } 
            else if (datas.issues[i].Státusz === 'Lezárva') {
                createdIssue.style.backgroundColor = 'green';
                createdIssue.classList.add('finished');
            } 

            issueData.innerHTML = '<h4></h4><h3></h3><h4></h4><h3></h3><h4></h4><h3></h3><h4></h4><h3></h3><h4></h4><h3></h3><h4></h4><h3></h3><h4></h4><h3></h3><h4></h4><h3></h3><h4></h4><h3></h3><h4></h4><h3></h3><h4></h4><h3></h3><div></div>';

            issues[i].addEventListener('click', function() {
                issuePanel.classList.add('transition');
                issuePanel.setAttribute('style', 'top: 0');
                issuePanel.classList.add('bg-color');
                issueData.scrollTop = 0;
                issueData.getElementsByTagName('h4')[0].innerHTML = 'Bejelentés száma:';
                issueData.getElementsByTagName('h3')[0].innerHTML = datas.issues[i].id;
                issueData.getElementsByTagName('h4')[1].innerHTML = 'Bejelentés státusza:';
                issueData.getElementsByTagName('h3')[1].innerHTML = datas.issues[i].Státusz;
                issueData.getElementsByTagName('h4')[2].innerHTML = 'Bejelentés időpontja:';
                issueData.getElementsByTagName('h3')[2].innerHTML = datas.issues[i].Bejelentve;
                issueData.getElementsByTagName('h4')[3].innerHTML = 'Kiérkezés várható időpontja:';
                issueData.getElementsByTagName('h3')[3].innerHTML = datas.issues[i].Várható_Kezdés;
                issueData.getElementsByTagName('h4')[4].innerHTML = 'Objektum megnevezése:';
                issueData.getElementsByTagName('h3')[4].innerHTML = datas.issues[i].Objektum;
                issueData.getElementsByTagName('h4')[5].innerHTML = 'Ingatlan megnevezése:';
                issueData.getElementsByTagName('h3')[5].innerHTML = datas.issues[i].Ingatlan;
                issueData.getElementsByTagName('h4')[6].innerHTML = 'Szakterület:';
                issueData.getElementsByTagName('h3')[6].innerHTML = datas.issues[i].Szakterület;
                issueData.getElementsByTagName('h4')[7].innerHTML = 'Típus:';
                issueData.getElementsByTagName('h3')[7].innerHTML = datas.issues[i].Típus;
                issueData.getElementsByTagName('h4')[8].innerHTML = 'Besorolás:';
                issueData.getElementsByTagName('h3')[8].innerHTML = datas.issues[i].Besorolás;
                issueData.getElementsByTagName('h4')[9].innerHTML = 'Szolgáltatási szint:';
                issueData.getElementsByTagName('h3')[9].innerHTML = datas.issues[i].Sz_szint;
                issueData.getElementsByTagName('h4')[10].innerHTML = 'Bejelentés tartalma:';
                issueData.getElementsByTagName('h3')[10].innerHTML = datas.issues[i].issue;
            });
        }


        const closeIssuePanel = document.getElementById('closeIssuePanel');
        closeIssuePanel.innerHTML = 'Vissza';

        closeIssuePanel.addEventListener('click', function() {
            issuePanel.setAttribute('style', 'top: -225%');
            setTimeout(function() {
                issuePanel.classList.remove('transition');
            }, 400); 
        })
    }

    let createdIssues = document.getElementsByClassName('issue');
    const filter = document.getElementById('filter');
    let filterFlag = false;

    filter.addEventListener('click', function() {
        
        if(filterFlag === true) {
            for(let i = 0; i < createdIssues.length; i++) {
                createdIssues[i].style.display = 'block';
                filter.style.boxShadow = '0 5px #b9b9b9';
                filter.style.transform = 'translateY(0px)';
                filter.innerHTML = 'Folyamatban';
            }
            filterFlag = false;
        }
        else if (filterFlag === false) {
            for(let i = 0; i < createdIssues.length; i++) {
                if(createdIssues[i].classList.contains('finished')) {
                    createdIssues[i].style.display = 'none';
                    filter.style.boxShadow = '0 2px #666';
                    filter.style.transform = 'translateY(4px)';
                    filter.innerHTML = 'Összes';
                }
            }
            filterFlag = true;
        }
    });
}


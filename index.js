fetch('./data.json')
.then(response => {
    return response.json()})
.then(data => {liveGraph(data)})
.catch(err => {
    console.log(err)
});

let div = document.getElementById("minutesGraph")

let inSelect = false;

function liveGraph(data) {
    addBars(data);
    filters();
    barToCard(data);
    fillCircles(data);
}

function addBars(data) {
    for (let i = 0; i < 34; i++) {
        let bar = document.createElement("div")
        let barHeight = Math.trunc(data[i].minutes / 1260);
        let classe = data[i].classe;
        bar.id = i;
        bar.classList.add("minutesBar", classe, barHeight)

        if(barHeight > 0) {
        bar.style.height = barHeight + "vh"
        } else {
            bar.style.display = "none";
        }
        div.append(bar)
    }
}

function filters(data) {
    document.addEventListener('click', function handleClick(event) {
        let tag = document.getElementsByClassName('tag')
        let allTag = document.getElementById('all')

        let targetedClass = event.target.id
        let filter = document.getElementsByClassName(targetedClass)

        if(event.target.classList.contains('tag')) {
            // ----- Toggle tags -----

            if(event.target.classList.contains('activeTag')) {
                event.target.classList.remove('activeTag');
                document.getElementById('all').classList.add('activeTag');
            } else {
                for(let i=0; i < tag.length; i++) { 
                    tag[i].classList.remove('activeTag');
                }
                event.target.classList.add('activeTag');    
            }

            // ----- Toggle bars -----
            for(let i=0; i < allBars.length; i++) {
                if(targetedClass === 'all' || allTag.classList.contains('activeTag')) {
                    allBars[i].style.height = allBars[i].classList[2] + "vh";
                }else {
                    allBars[i].style.height = 0;
                    for(let j=0; j < filter.length; j++) {
                        filter[j].style.height = filter[j].classList[2] + "vh";
                    }
                }
            }
        }
    });
}

function barToCard(data){

    // ----- Elements list -----
    let allBars = document.getElementsByClassName('minutesBar');
    let card = document.getElementById('card');
    let nom = document.getElementById('nom');
    let classeElement = document.getElementById('classe');
    let minutes = document.getElementById('minutes');
    let genres = document.getElementById('genres');
    let artiste = document.getElementById('topArtiste');
    let matin = document.getElementById('matin');
    let soir = document.getElementById('soir');

    document.addEventListener('click', function handleClick(event) {
        let allBars = document.getElementsByClassName('minutesBar');
        function clearBars() {
            for(let i=0; i < allBars.length; i++) {
                allBars[i].style.backgroundColor = "#D9D9D9";
                allBars[i].style.margin = "0 .7%";
                allBars[i].style.width = "2.5%";
                allBars[i].classList.remove('selectedBar');
            }
        }

        if(event.target.classList.contains('minutesBar')) {
            let barId = event.target.id;
            let bar = document.getElementById(barId);
            inSelect = true;
            function selectedBar(classe) {
                clearBars();

                if(classe == 'Designer') {
                    bar.style.backgroundColor = "#FB7153";
                } else {
                    bar.style.backgroundColor = "#8C8AFE";
                }
            }

            selectedBar(data[barId].classe);
            event.target.classList.add('selectedBar');
            classeElement.classList.remove('Designer', 'Dev');
            classeElement.classList.add(data[barId].classe);

            // ----- Filling data -----
            card.style.right = "2vw";
            for(let i=0; i < allBars.length; i++) {
                allBars[i].style.margin = "0 .5%";
                allBars[i].style.width = "1.45%";
            }

            nom.innerHTML = data[barId].nom;
            classeElement.innerHTML = data[barId].classe;
            minutes.innerHTML = data[barId].minutes;
            genres.innerHTML = data[barId].genres;
            artiste.innerHTML = data[barId].artiste;
            matin.src = "https://open.spotify.com/embed/track/"+ data[barId].matinId +"?utm_source=generator";
            soir.src = "https://open.spotify.com/embed/track/"+ data[barId].soirId +"?utm_source=generator";
        }
        if(event.target.id === 'close') {
            card.style.right = "-40vw";
            inSelect = false;
            clearBars();
        }
    })
}
  

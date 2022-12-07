let div = document.getElementById("minutesGraph")
fetch('./data.json')
.then(response => {
    return response.json()})
.then(data => {liveGraph(data)})
.catch(err => {
    console.log(err)
});

function liveGraph(data) {
    addBars(data);
    filters();
    barToCard(data);
}

function addBars(data) {
    for (let i = 0; i < 34; i++) {
        let bar = document.createElement("div")
        let barHeight = Math.trunc(data[i].minutes / 170);
        let classe = data[i].classe;
        bar.id = i;
        bar.classList.add("minutesBar", classe, barHeight)

        // function fillingCard() {
        //     // ----- Elements -----
        //     let nom = document.getElementById('nom');
        //     let classeElement = document.getElementById('classe');
        //     let minutes = document.getElementById('minutes');
        //     let genres = document.getElementById('genres');
        //     let artiste = document.getElementById('topArtiste');
        //     let matin = document.getElementById('matin');
        //     let soir = document.getElementById('soir');
        //     // ----- Data -----
        //     nom.innerHTML = data[i].nom;
        //     classeElement.innerHTML = classe;
        //     minutes.innerHTML = data[i].minutes;
        //     genres.innerHTML = data[i].genres;
        //     artiste.innerHTML = data[i].artiste;
        //     matin.src = "https://open.spotify.com/embed/track/"+ data[i].matinId +"?utm_source=generator";
        //     soir.src = "https://open.spotify.com/embed/track/"+ data[i].soirId +"?utm_source=generator";
        // }
        // fillingCard();

        if(barHeight > 0) {
        bar.style.height = barHeight + "px"
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
        let allBars = document.getElementsByClassName('minutesBar')

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
                    allBars[i].style.height = allBars[i].classList[2] + "px";
                }else {
                    allBars[i].style.height = 0;
                    for(let j=0; j < filter.length; j++) {
                        filter[j].style.height = filter[j].classList[2] + "px";
                    }
                }
            }
        }
    });
}

function barToCard(data){
    document.addEventListener('click', function handleClick(event) {
        if(event.target.classList.contains('minutesBar')) {
            let barId = event.target.id;
            let nom = document.getElementById('nom');
            let classeElement = document.getElementById('classe');
            let minutes = document.getElementById('minutes');
            let genres = document.getElementById('genres');
            let artiste = document.getElementById('topArtiste');
            let matin = document.getElementById('matin');
            let soir = document.getElementById('soir');
            nom.innerHTML = data[barId].nom;
            classeElement.innerHTML = data[barId].classe;
            minutes.innerHTML = data[barId].minutes;
            genres.innerHTML = data[barId].genres;
            artiste.innerHTML = data[barId].artiste;
            matin.src = "https://open.spotify.com/embed/track/"+ data[barId].matinId +"?utm_source=generator";
            soir.src = "https://open.spotify.com/embed/track/"+ data[barId].soirId +"?utm_source=generator";
        }
    })
}

  
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
    countOccurences(data);
    for (let i = 0; i < 34; i++) {
        let bar = document.createElement("div")
        let barHeight = Math.trunc(data[i].minutes / 185);
        let classe = data[i].classe;
        bar.id = i;
        bar.classList.add("minutesBar", classe, barHeight)

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
            }
        }
        if(event.target.classList.contains('minutesBar')) {
            let barId = event.target.id;
            let bar = document.getElementById(barId);
            function selectedBar(classe) {
                clearBars();
                if(classe == 'Designer') {
                    bar.style.backgroundColor = "#FB7153";
                } else {
                    bar.style.backgroundColor = "#8C8AFE";
                }
            }
            selectedBar(data[barId].classe);

            // ----- Filling data -----
            card.style.right = "2vw";
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
            clearBars();
        }
    })
}

function countOccurences(data) {
    //array of genres
    let countAll = [];
    let countDesigner = [];
    let countDev = [];
    for (let i = 0; i < data.length; i++) {
        let genres = data[i].genres;
        for(let j=0; j < genres.length; j++){
            let genre = data[i].genres[j];
            countAll[genre] = countAll[genre] ? countAll[genre] + 1 : 1;
            //filter by class
            if(data[i].classe == 'Designer') {
                countDesigner[genre] = countDesigner[genre] ? countDesigner[genre] + 1 : 1;
            }
            else {
                countDev[genre] = countDev[genre] ? countDev[genre] + 1 : 1;
            }
        }
    }
    console.log(countAll);
    console.log(countDesigner);
    console.log(countDev);
}
  
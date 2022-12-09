let addionalTags = document.getElementsByClassName('addionalTag')
let minGraph = document.getElementById('minGraph');
let genreGraph = document.getElementById('circleGraphZone');
genreGraph.style.display = "none";


document.addEventListener('click', function handleClick(event) {

    if(event.target.classList.contains('addionalTag')) {
        for(let i=0; i < addionalTags.length; i++) {
        addionalTags[i].classList.toggle("activeAddTag")
        }

        if(event.target.id == "genresTag") {
            genreGraph.style.display = "flex";
            minGraph.style.display = "none";
        }
        else {
            genreGraph.style.display = "none";
            minGraph.style.display = "block";
        }
    }
});
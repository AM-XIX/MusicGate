let addionalTags = document.getElementsByClassName('addionalTag')
let genreTag = document.getElementById('genresTag');
let ecouteTag = document.getElementById('ecouteTag');

let minGraph = document.getElementById('minGraph');
let genreGraph = document.getElementById('circleGraphZone');

let allBars = document.getElementsByClassName('minutesBar');
let allCircles = document.getElementsByClassName('circle');

let ordinatesValue = document.getElementById('ordinatesValues');
let ordinatesTitle = document.getElementById('ordinatesTitle');
let graphFrame = document.getElementById("minutesGraph");
let halo = document.getElementById("halo");

genreGraph.style.display = "none";
            
for(let i=0; i < allCircles.length; i++) {
    allCircles[i].classList.add("exitCircle");
}

halo.classList.add("exitHalo");

document.addEventListener('click', function handleClick(event) {

    if(event.target.classList.contains('addionalTag')) {

        for(let i=0; i < addionalTags.length; i++) {
        addionalTags[i].classList.toggle("activeAddTag")
        }
        
        if(event.target.id == "genresTag" || genreTag.classList.contains('activeAddTag')) {
            ordinatesValue.style.opacity = 0;
            ordinatesTitle.style.opacity = 0;
            graphFrame.style.borderColor = "transparent";
            
            for(let i=0; i < allBars.length; i++) {
                allBars[i].classList.add("exitMinutesBar");
            }
            if(card.style.right = "2vw") {
                card.style.right = "-40vw";
            }
            genreGraph.style.display = "flex";
            setTimeout(function() {
                for(let i=0; i < allCircles.length; i++) {
                    allCircles[i].classList.remove("exitCircle");
                }
                halo.classList.remove("exitHalo");
                minGraph.style.display = "none";
            }, 600);
        }
        else if(event.target.id == "ecouteTag" || ecouteTag.classList.contains('activeAddTag')) {
            for(let i=0; i < allCircles.length; i++) {
                allCircles[i].classList.add("exitCircle");
            }
            halo.classList.add("exitHalo");
            minGraph.style.display = "block";
            setTimeout(function() {
                if(card.style.right = "-40vw" && nom.innerHTML != "") {
                    card.style.right = "2vw";
                }
                genreGraph.style.display = "none";                
                ordinatesValue.style.opacity = 1;
                ordinatesTitle.style.opacity = 1;
                graphFrame.style.borderColor = "var(--light)";
                for(let i=0; i < allBars.length; i++) {
                    allBars[i].classList.remove("exitMinutesBar");
                }
            }, 600);
        }
        else {
        }
    }
});
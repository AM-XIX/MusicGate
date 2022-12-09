// ===== Arrays of data =====
let countAll = [];
let countDesigner = [];
let countDev = [];
let percentAll = [];
let percentDesigner = [];
let percentDev = [];

// array of genres

let genresArray = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

/*
Latino-Reggaeton : 0
Indie : 1
Pop : 2
Rap : 3
K-Pop : 4
Electro : 5
Rock-Metal : 6
*/

function fillCircles(data) {
    genreData(data);

    //filling circles
    let allCircles = document.getElementsByClassName('circle');
    for(let i=0; i < allCircles.length; i++) {

        let circleId = allCircles[i].id
        let genreId = " " + circleId;

        let circle = document.getElementById(circleId);

        let genreCount = countAll[genreId];    
        let genreDesignerCount = countDesigner[genreId];
        let genreDevCount = countDev[genreId];

        let genrePercent = Math.trunc((genreCount / data.length) * 100);
        let genreDesignerPercent = Math.trunc((genreDesignerCount / genreCount) * 100);
        let genreDevPercent = Math.trunc((genreDevCount / genreCount) * 100);

        genresArray[i][0] = countAll[genreId];
        genresArray[i][1] = countDesigner[genreId];
        genresArray[i][2] = countDev[genreId];
        genresArray[i][3] = genrePercent;
        genresArray[i][4] = genreDesignerPercent;
        genresArray[i][5] = genreDevPercent;

        fillingCircle(circle, circleId, genrePercent)
    }
}

function genreData(data) {
    //counting genres
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
}

function fillingCircle(target, title, percent) {
    target.innerHTML = "<p><span>"+ title +"</span><br><span class='pourcentageText'>" + percent + "%</span></p>";

    let circleSize = 0;
    if(percent > 45) {
        circleSize = percent * 5;
    }
    else if(percent < 10) {
        circleSize = percent * 13;
    }
    else {
        circleSize = percent * 6;
    }
    target.style.cssText = 'width:' + circleSize + 'px; height:' + circleSize + 'px;font-size:' + circleSize/12 + 'px;';
}

function fillingFilteredCircles(target, title, count) {
    target.innerHTML = "<p><span>"+ title +"</span><br><span class='pourcentageText'>" + count + " fans</span></p>";

    let circleSize = 0;
    if(count > 10) {
        circleSize = count * 27;
    }
    else if(count < 100) {
        circleSize = count * 40;
    }
    else {
        circleSize = count * 30;
    }
    target.style.cssText = 'width:' + circleSize + 'px; height:' + circleSize + 'px;font-size:' + circleSize/12 + 'px;';
    if(!count) {
        target.style.display = 'none';
    }
}

document.addEventListener('click', function handleClick(event) {
    let tag = document.getElementsByClassName('tag')
    let allTag = document.getElementById('all')
    let targetedClass = event.target.id

    if(event.target.classList.contains('tag')) {
        let allCircles = document.getElementsByClassName('circle');
        for(let i=0; i < allCircles.length; i++) {
            let circleId = allCircles[i].id    
            let circle = document.getElementById(circleId);

            if(targetedClass == 'all') {
                fillingCircle(circle, circleId, genresArray[i][3], 20)
            }
            else if(targetedClass == 'Designer') {
                fillingFilteredCircles(circle, circleId, genresArray[i][1])   
            } else {
                fillingFilteredCircles(circle, circleId, genresArray[i][2])
            }
        }
    }
});
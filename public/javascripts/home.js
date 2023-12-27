
const API_key = "06UKvlMlo2sfXuETckngc4K64yEv6ZruSYntdEeT"
let start_dec = 2
let end_dec = 0
let imageComments = []
let intervalid = null
let num = 0
//---------------------------------------------------------------------------------------------------------------------
let my_nasa_photos = "";
let commentData = []



function status(response) {
    if (response.status >= 200 && response.status < 300) {
        console.log(response)
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function findStartDate(date , dec){
    const convertDate = new Date(Date.parse(date)) ;
    let startDate = convertDate ;
    startDate.setDate(convertDate.getDate() - dec) ;
    let start_date = startDate.toISOString().slice(0,10) ;
    return start_date;
}

function findEndDate(date , dec){
    const convertDate = new Date(Date.parse(date)) ;
    let endDate = convertDate ;
    endDate.setDate(convertDate.getDate() - dec) ;
    let end_date = endDate.toISOString().slice(0,10) ;
    return end_date;
}
//----------------------------------------------------------------------------------------------------------------------
// saerch for images task

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btnSearch").addEventListener("click", searchImages);
    document.getElementById("btnMore").addEventListener("click", moreImages);
});


function searchImages(event) {
    event.preventDefault();
    let main = document.getElementById("images_form")
    document.getElementById("nasaPhotos").innerHTML = ""
    start_dec = 2
    end_dec = 0
    getImageFromServer();

}

function moreImages(event){
    event.preventDefault();
    getImageFromServer();
}



getImageFromServer = function (dec1 , dec2) {
    let date = document.getElementById("start_date").value;
    let End_date = findEndDate(date , end_dec);
    let Start_date = findStartDate(date , start_dec);
    document.getElementById("spinners").classList.remove("d-none")
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_key}&start_date=${Start_date}&end_date=${End_date}`)
        .then(status)
        .then(res => res.json())
        .then(json => {
            json.reverse().forEach(function (photo){
                document.getElementById("nasaPhotos").innerHTML += getPhotos(photo.url ,photo.date ,photo.title ,photo.explanation ,photo.copyright ,photo.media_type);
                document.getElementById("btnMore").classList.remove("d-none")
                start_dec += 1
                end_dec += 1
            })
            //getComments()
            const postBtn = document.getElementsByClassName('btn btn-primary commentbtn');
            for(let b of postBtn ){
                b.addEventListener('click',function (event){
                    const text = event.target.previousElementSibling.value.trim()
                    const next = event.target.nextElementSibling.id
                    const place = event.target.nextElementSibling
                    console.log("next = ",next)
                    console.log("text = ",text)
                    updateComments(next , text , place)
                });
                //const next = event.target.parentNode.parentNode.parentNode.lastElementChild.lastElementChild.id
                getComments()
            }
            document.getElementById("spinners").classList.add("d-none")
        })
        .catch(function (err) {
            document.getElementById("spinners").classList.add("d-none")
            document.getElementById("nasaPhotos").innerHTML = "Sorry, the request failed...";
        }).finally(function () {
    });

    //intervalid = setInterval(getImageFromServer , 150000)
}


function  getPhotos(url ,date ,title ,explanation ,copyright ,media) {
    let html = ""
    html+= `<div class="row"><div class="col-md-12">`
    if (media === 'video'){
        html += `<div class="ratio ratio-16x9"><iframe src="${url}" style="max-width:100%;height:100%" title="video"></iframe></div>`
    }
    else{
        html += `<img class="img-thumbnail" width="400" src="${url}">`
    }
    html += `<div class="col-12">
            <ul class="list-group-item">
            <li class="list-group-item">Title:${title}</li>
            <li class="list-group-item">Date:${date}</li>
            <li class="list-group-item">Copyright:${copyright}</li>
            <div class="overflow-auto" style="width:200px ; height:200px ">Explanation:${explanation}</div>
            <div id="CommentSec" class="">
            <ul class="list-group-item">
            <textarea placeholder="Enter your comment here"></textarea>
            <button type="button" id="${url}" class="btn btn-primary commentbtn">post</button>
            <div id="commentPlace ${date}"></div>
            </ul>
            <div>
            </div>
            </div>
            </ul>
            </ul>
            <div>`

    html += `</div></div><br>`
    num +=1
    //btnlisinners.push(`${date}`)


    return html
}




function updateComments (commentsBoxId , comment, place) {
    event.preventDefault();
    let userName = document.getElementById("fullName").innerHTML
    //let userName = "Sami Maron"
    //console.log(text)
    console.log("user" ,userName)

    // userName = ""
    const data = {userName :userName , comment:comment , commentsBoxId:commentsBoxId}
    if (comment !== "") {
        fetch("http://localhost:3000/comments/updateComments", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        ).then(status)
            .then(res => res.json())
            .then(function (json) {
                console.log("fetch")
                getComments(place)
        }).catch(function (err) {
            console.log("there was a problem with posting the comment")
        }).finally(function () {
        });
    }
}

 getComments = async function (next) {
    console.log("get comments")
     try{
     const response = await fetch('http://localhost:3000/comments/fetchComments')
            if (!response.ok)
                throw new Error("error on get photo from data base")
            const data = await response.json();
            const list = data.commentsList
            console.log(list)
            console.log(data)
            postComments(list, next)
        }catch(error) {
            console.log("there was a problem in getting the comments from server")
        }
}


function postComments(arr , toHtml1) {
    let name = document.getElementById("fullName").innerHTML
    console.log("arr " , arr)
    for(let comm in arr){
        if(arr.length > 0 ) {
            let x = typeof arr[comm].commentsBoxId
            let y = arr[comm].commentsBoxId
            console.log("x", x)
            console.log("y", y)
            let toHtml = document.getElementById(`${arr[comm].commentsBoxId}`)
            console.log("creating rows before")
            toHtml.innerHTML += `<li class="list-group-item" id="${arr[comm].email}">${arr[comm].userName}: ${arr[comm].comment}:${arr[comm].commentsBoxId}`
            console.log("creating rows")
            if (name === arr[comm].userName) {
                toHtml.innerHTML += `<button type="button" class="btn btn-danger">Delete</button>`
            }
            toHtml.innerHTML += `</li>`
        }
    }
    const btnDelete = document.getElementsByClassName(`btn btn-danger`)
    for(let b of btnDelete){
        b.addEventListener('click',function (){
            let next = event.target.previousElementSibling
            next.remove()
        });
    }
}



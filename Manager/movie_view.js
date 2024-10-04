let Movies_url = "http://localhost:3000/Movies"
let Movies_UpdateUrl = "http://localhost:3000/Movies"

const Movies = [];

fetch(Movies_url)
    .then(response => response.json())
    .then(movie => {
        Movies.push(...movie)
        Movie_view_function();
    })
console.log(Movies)

console.log("work")

function Movie_view_function(){
    for (let i = 0; i < Movies.length; i++) {

        let movies = Movies[i]
        let tr = document.createElement('tr')
        tr.className = "tr"
        tr.innerHTML = `  
                    <td>${movies.Name}</td>
                    <td>${movies.Genere}</td>
                    <td>${movies.Director}</td>
                    <td>${movies.Actor}</td>
                    <td>${movies.Release}</td>
                    <td>${movies.Quantity}</td>
                    <td>${movies.Price}</td>
                    <td class="btn-flex">
                        <Button class="Edit-btn btn" onclick="Edit(event)" value="${i}">🖊️</Button><Button class="Delete-btn btn"
                            onclick="Delete(event)" value="${i}">❎  </Button>
                    </td>`
        document.getElementById('Movie-table').appendChild(tr)
    }
}


function Edit(event) {
    var btnValue = event.target.value
    var TembArray = Movies[btnValue]
    document.querySelector('.pop-cover').style.display = "block"

    document.getElementById("movieName").value = TembArray.Name
    document.getElementById("director").value = TembArray.Director
    document.getElementById("genere").value = TembArray.Genere
    document.getElementById("actor").value = TembArray.Actor
    document.getElementById("rDate").value = TembArray.Release
    document.getElementById("image").value = TembArray.Images
    document.getElementById("Price").value = TembArray.Price
    document.getElementById("Quantity").value = TembArray.Quantity

    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault()
        var movieName = document.getElementById('movieName').value
        var actor = document.getElementById('actor').value
        var director = document.getElementById('director').value
        var genere = document.getElementById('genere').value
        var rDate = document.getElementById('rDate').value
        var image = document.getElementById('image').value
        var quantity = document.getElementById("Quantity").value
        var price = document.getElementById("Price").value

        TembArray.Name = movieName
        TembArray.Director = director
        TembArray.Genere = genere
        TembArray.Actor = actor
        TembArray.Release = rDate
        TembArray.Images = image
        TembArray.Quantity = quantity
        TembArray.Price = price
      
        let movieId=TembArray.id


        fetch(`${Movies_UpdateUrl}/${movieId}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(TembArray)
        })
        alert(`${TembArray.Name} Movies Edited SuccesFully`)


        document.querySelector('.pop-cover').style.display = "none"
        window.location.reload()
    })

}

function Delete(event) {
    var btnValue = event.target.value
    let TembArray=Movies[btnValue]
    fetch(`${Movies_UpdateUrl}/${TembArray.id}`,{
        method:'DELETE',
        headers:{
            'content-type':'application/json'
        },
    })
    event.target.parentNode.parentNode.remove();
    // window.location.reload()
}

function CancelPopup() {
    document.querySelector('.pop-cover').style.display = "none"

}
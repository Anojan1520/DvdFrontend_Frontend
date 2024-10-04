const CusOrders = [];
const Movies = [];

const movie_url = "http://localhost:3000/Movies";
const confrim_url = "http://localhost:3000/ConfirmOrders";

fetch(movie_url)
    .then(response => response.json())
    .then(array => {
        Movies.push(...array)
    })
fetch(confrim_url)
    .then(response => response.json())
    .then(array => {
        CusOrders.push(...array)
        OrderItemView();
    })

ReturnNotify()
function ReturnNotify() {
    CusOrders.forEach(n => {
        const retDate = new Date(n.ReturnDate.replace(/\//g, '-'));
        const noeDate = new Date();
        if (retDate > noeDate) {
            alert(n.UserId + "This user didnot Return their dvd")
        }
    })
    setTimeout(ReturnNotify, 60000);

}


function OrderItemView() {
    for (let i = 0; i < CusOrders.length; i++) {
        const element = CusOrders[i];
        let tr = document.createElement('tr')
        tr.className = "tr"
        tr.innerHTML = ` <td>${element.UserId}</td>
                    <td>${element.id}</td>
                    <td>${element.Movie}</td>
                    <td>${element.TotalRent}</td>
                    <td>${element.RentedDate}</td>
                    <td>${element.ReturnDate}</td>
                    <td><button class="Delete-btn btn" value="${element.id}" onclick="ReturnDvd(event)">🔄</button></td>`
        document.getElementById('Movie-table').appendChild(tr)

    }
}




async function ReturnDvd(event) {
    let Id = event.target.value
    let Rmovie = CusOrders.find(mov => mov.id == Id)
    console.log(Rmovie)
    let movie = Movies.find(mov => mov.id == Rmovie.MovieId)
    console.log(movie)

    alert(movie.Name)
    movie.Quantity = parseInt(Rmovie.TotalRent) + parseInt(movie.Quantity)

    if (movie) {
        await fetch(`${movie_url}/${movie.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(movie)
        })
        await fetch(`${confrim_url}/${Id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
    }




    alert('Return Sucessfully..........')

    window.location.reload()
}
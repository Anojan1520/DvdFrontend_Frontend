const SearchParam = new URLSearchParams(window.location.search)
const UserId = SearchParam.get('loginId')

const homeLink = document.getElementById('homeLink');
if (UserId) {
    homeLink.href = `../HomePage/Home.html?loginId=${UserId}`;
}
const CategoryLink = document.getElementById("CategoryLink")
if (UserId) {
    CategoryLink.href = `../CategoryPage/Category.html?loginId=${UserId}`
}


const movies = [];
let RentedItems = []
const Orders = [];
const Notify = [];
const CusOrders = [];
const User = [];
const LoginUsers = []

let Movie_Url = "http://localhost:3000/Movies";
let Rented_Url = "http://localhost:3000/RentedItems";
let Order_Url = "http://localhost:3000/Orders";
let Notify_Url = "http://localhost:3000/Notification";
let ConfirmOrder_Url = "http://localhost:3000/ConfirmOrders";
let User_Url = "http://localhost:3000/Customers"
let LoginUser_Url = "http://localhost:3000/Login_User"

document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});

async function fetchData() {
    await fetch(Movie_Url)
        .then(response => response.json())
        .then(array => {
            movies.push(...array);
            Movie_View();
            nav_func();

        })
    await fetch(Rented_Url)
        .then(response => response.json())
        .then(array => {
            RentedItems.push(...array)
            document.getElementById("rentCount").textContent = RentedItems.length
        })
    await fetch(Order_Url)
        .then(response => response.json())
        .then(array => {
            Orders.push(...array)
        })
    await fetch(Notify_Url)
        .then(response => response.json())
        .then(array => {
            Notify.push(...array);
        })
    await fetch(ConfirmOrder_Url)
        .then(response => response.json())
        .then(array => {
            CusOrders.push(...array)
        })
    await fetch(User_Url)
        .then(response => response.json())
        .then(array => {
            User.push(...array)
        })
    await fetch(LoginUser_Url)
        .then(response => response.json())
        .then(array => {
            LoginUsers.push(...array)
        })


}

CartcountBasket()
function CartcountBasket() {
    document.getElementById("rentCount").textContent = RentedItems.length
}


async function logout() {

    let User_details = User.find(x => x.id == UserId)
    let Temb_User = LoginUsers.find(x => x.username == User_details.username)

    await fetch(`${LoginUser_Url}/${Temb_User.id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })
    const url = new URL(window.location.href);
    url.searchParams.delete('loginId');
    window.history.replaceState({}, '', url);
    window.location.reload()
}

async function nav_func() {
    if (UserId != null) {
        document.getElementById("login").style.display = "none"
        document.getElementById("signin").style.display = "none"
        document.getElementById("Profile").style.display = "block"
        document.getElementById("logout").style.display = "block"
        document.getElementById("Notification").style.display = "block"

        let rentBtn = document.querySelectorAll(".rent-btnLog")
        for (let r = 0; r < rentBtn.length; r++) {
            const element = rentBtn[r];
            element.style.display = "block"

        }
      

    }
    else {
        document.getElementById("login").style.display = "block"
        document.getElementById("signin").style.display = "block"
        document.getElementById("Profile").style.display = "none"
        document.getElementById("logout").style.display = "none"
        document.getElementById("Notification").style.display = "none"

        let rentBtn = document.querySelectorAll(".rent-btnLog")
        for (let r = 0; r < rentBtn.length; r++) {
            const element = rentBtn[r];
            element.style.display = "none"

        }
      
    }

}

async function Profile() {
    document.querySelector(".pop-cover").style.display = "block"
    let Users = User.find(user => user.id == UserId)
    var TembArray = Users
    console.log(TembArray)
    document.getElementById("firstname").value = TembArray.firstname
    document.getElementById("Nic").value = TembArray.nic
    document.getElementById("Phone").value = TembArray.phone
    document.getElementById("email").value = TembArray.email
    document.getElementById("Position").value = TembArray.position

    document.getElementById("form").addEventListener('submit', function (event) {
        event.preventDefault()
        var firstname = document.getElementById("firstname").value.trim()
        var phone = document.getElementById("Phone").value.trim()
        var email = document.getElementById("email").value.trim()

        TembArray.firstname = firstname
        TembArray.phone = phone
        TembArray.email = email
        fetch(`${User_Url}/${UserId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(TembArray)
        })
        document.querySelector(".pop-cover").style.display = "none"
        window.location.reload()

    })
}

console.log(movies)

function Movie_View() {
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].Quantity > 0) {
            var div = document.createElement('div')
            div.className = "movie-card"
            div.innerHTML = ` 
            <img src="${movies[i].Images}" alt="">
                            <figcaption>${movies[i].Name}</figcaption>
                            <h4 class="act">${movies[i].Actor}</h4>
                            <h4 class="gen">${movies[i].Genere}</h4>
                            <div>
                                 <h4 class="price">Price:</h4>
                                 <p>${movies[i].Price}Rs</p>
                            </div>
                            
                            <button value="${movies[i].id}" onclick="rentPopup(event)" class="rent-btnLog">Rent Now</button>
                           `
            let movieDiv = document.querySelector('.all-movie-card')
            movieDiv.appendChild(div)
        }


    }
    loginCheck()
    const uniqueActors = new Set();
    const uniqueMovies = new Set();

    movies.forEach(movie => {
        uniqueActors.add(movie.Actor);
    });
    movies.forEach(movie => {
        uniqueMovies.add(movie.Genere);
    });

    uniqueMovies.forEach(movie => {
        let Option = document.createElement('option')
        Option.value = movie
        Option.textContent = movie
        document.getElementById('genere-select').appendChild(Option)
    })
    uniqueActors.forEach(actor => {
        let Option = document.createElement('option')
        Option.value = actor
        Option.textContent = actor
        document.getElementById('actor-select').appendChild(Option)

    })


}

function loginCheck(){
   if (UserId==null) {
    let cards=document.querySelectorAll(".movie-card")
    cards.forEach(x=>{
        x.addEventListener('click',()=>{
            window.location.href="../Registration/Signin.html"
        })
    })
   }

}

function cancelProfile() {
    document.querySelector(".pop-cover").style.display = "none"

}

function OrderHistoryView() {
    for (let i = 0; i < Notify.length; i++) {
        const element = Notify[i];

        if (element.UserId == UserId) {
            let check = movies.find(mov => mov.id == element.movieId)
            let checkDate = "Order"
            let status = "Rejected"
            if (element.Status == true) {
                status = "Accepted"
                checkDate = "Return Date"

            } else if (element.Status == false) {
                status = "Pending"
                checkDate = "Request Date"

            }
            let tot = parseInt(element.RentQuantity) * parseInt(check.Price)
            let div = document.createElement('div')
            div.className = "rented-card"
            div.innerHTML = `
                        <div class="rented-image">
                            <img src="${check.Images}" alt="" id="image-rent">
                        </div>
                        <div class="rented-content ">
                            <div class="rent-inline">
                                <P class="key">Name:</P>
                                <P class="val">${check.Name}</P>
                            </div>
                            <div class="rent-inline">
                                <P class="key">Price:</P>
                                <P class="val">${check.Price}</P>
                                <div class="rent-inline">
                                    <P class="key">Total:</P>
                                    <P class="val">${tot}</P>
                                </div>
                            </div>
                            <div class="rent-inline">
                                <P class="key">Quantity:</P>
                                <P class="val">${element.RentQuantity}</P>
                            </div>
                            <div class="rent-inline">
                                <P class="key">Status:</P>
                                <P class="val">${status}</P>
                            </div>
                              <div class="rent-inline">
                                <P class="key">${checkDate}:</P>
                                <P class="val">${element.RequestDate}</P>
                            </div>
                            <div class="rent-btn">
                            <button value="${element.id}" onclick="NotifyDelete(event)">Clear</button>
                        </div>
                            
                        </div>`
            document.getElementById("notify-i").appendChild(div)
        }


    }
}

function Search() {

    var enterText = document.getElementById('search').value.toUpperCase()
    console.log(enterText)
    var all_movie = document.querySelector(".all-movie-card")
    var Movies = all_movie.querySelectorAll('.movie-card')

    for (let i = 0; i < Movies.length; i++) {
        var movies = Movies[i]
        console.log(movies)

        var movie_name = movies.querySelector('figcaption').textContent.toUpperCase()
        if (movie_name.indexOf(enterText) < 0) {
            movies.style.display = "none"
        }
        else {
            movies.style.display = "block"
        }

    }

}

function select() {
    let selected_data = document.getElementById("genere-select").value.toUpperCase()
    console.log(selected_data)
    var allMovie = document.querySelector(".all-movie-card")
    var Movies = allMovie.querySelectorAll(".movie-card")
    for (let i = 0; i < Movies.length; i++) {
        var data = Movies[i]
        var genere = data.querySelector('.gen').textContent.toUpperCase()
        if (selected_data == "ALLMOVIES") {
            data.style.display = "block"
        } else {
            if (selected_data != genere) {
                data.style.display = "none"
            } else {
                data.style.display = "block"
            }
        }


    }


}

// function Dselect(){
//     let director_data = document.getElementById("director-select").value.toUpperCase()
//     var allMovie = document.querySelector(".all-movie-card")
//     var Movies = allMovie.querySelectorAll(".movie-card")
//     for (let i = 0; i < Movies.length; i++) {
//         var data = Movies[i]
//         var director = data.querySelector('.dir').textContent.toUpperCase()
//         if (director_data == "AllDIRECTOR") {
//             data.style.display = "block"
//         } else {
//             if (director_data != director) {
//                 data.style.display = "none"
//             } else {
//                 data.style.display = "block"
//             }
//         }


//     }
// }

function Aselect() {
    let actor_data = document.getElementById("actor-select").value.toUpperCase().trim()
    var allMovie = document.querySelector(".all-movie-card")
    var Movies = allMovie.querySelectorAll(".movie-card")

    for (let i = 0; i < Movies.length; i++) {
        var data = Movies[i]
        var actor = data.querySelector('.act').textContent.toUpperCase().trim()
        if (actor_data == "ALLACTOR") {
            data.style.display = "block"
        } else {
            if (actor_data != actor) {
                data.style.display = "none"
            } else {
                data.style.display = "block"
            }
        }

    }

}


function rentPopup(event) {
    document.getElementById("rent-pop").style.display = "block"
    let btnVal = event.target.value
    let mov = movies.find(mov => mov.id == btnVal)
    let rentDetails = mov
    document.getElementById("no").innerHTML = `No:${btnVal}`
    document.getElementById("movie-rent").src = rentDetails.Images
    document.getElementById("movie-name").textContent = rentDetails.Name
    document.getElementById("movie-genre").textContent = rentDetails.Genere
    document.getElementById("rent-director").textContent = rentDetails.Director
    document.getElementById("Rent-actor").textContent = rentDetails.Actor
    document.getElementById("rent-relesedate").textContent = rentDetails.Release
    document.getElementById("rent-Quantity").textContent = rentDetails.Quantity
    document.getElementById("AddCart").value = btnVal


}

function CancelPop() {
    document.getElementById("rent-pop").style.display = "none"

}

async function CartRent(event) {
    event.preventDefault()
    console.log(event)
    let btnVal = event.target.value
    var data = RentedItems.findIndex(x => x.id == btnVal)
    RentedItems.splice(data, 1)
    const res = await fetch(`${Rented_Url}/${btnVal}`, {
        method: 'DELETE',
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    })
   // console.log(res);
    event.target.parentNode.parentNode.parentNode.remove()

    Calulate(event)
}


async function AddCart(event) {

    let btn = event.target.value
    let already = RentedItems.find(mov => mov.movieId == btn)
    let check = movies.find(movie => movie.id == btn)
    if (already == null) {
        let movieCheck = { movieId: check.id, UserId: UserId }
        fetch(Rented_Url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(movieCheck)
        })
        RentedItems.push(movieCheck)
        CartcountBasket()
        document.getElementById("rent-pop").style.display = "none"
        // window.location.reload()
    }
    else {
        document.getElementById("rent-pop").style.display = "none"
        alert("This item already in the cart")

    }


}
function Calulate(event) {
    let quant = event.target.value
    let parent = event.target.parentNode.parentNode
    let price = parent.querySelector(".quant").textContent
    let total = price * quant
    parent.querySelector(".tot").textContent = total + ".00"
    totalPrice()

}
function totalPrice() {
    let parent = document.getElementById("all-cards")
    let array = parent.querySelectorAll(".tot")
    let total = 0
    for (let i = 0; i < array.length; i++) {
        let element = array[i].textContent;
        let changenum = parseInt(element)
        total = total + changenum

    }

    document.getElementById("priceQuant").textContent = total
    document.getElementById("movieTot").textContent = RentedItems.length


}



async function Rmovieload() {
    RentedItems = []
    await fetch(Rented_Url)
        .then(response => response.json())
        .then(array => {
            RentedItems.push(...array)
            RentedItemLoad()

        })


}
function RentedItemLoad() {
    for (let i = 0; i < RentedItems.length; i++) {
        let Rentmovies = RentedItems[i];
        let movie = movies.find(mov => mov.id == Rentmovies.movieId)
        let movieQuant = movie.Quantity
        if (movie != null) {
            let div = document.createElement('div')
            div.className = "rented-card"
            div.innerHTML = ` <div class="rented-image">
                            <img src="${movie.Images}" alt="" id="image-rent">
                        </div>
                        <div class="rented-content ">
                            <div class="rent-inline">
                                <P class="key">Name:</P>
                                <P class="val">${movie.Name}</P>
                            </div>
                            <div class="rent-inline">
                                <P class="key">Price:</P>
                                <P class="val quant">${movie.Price}</P>
                                <div class="rent-inline">
                                <P class="key">Total:</P>
                                <P class="val tot">${movie.Price}</P>
                                 </div>
                            </div>
                          
                            <div class="rent-inline">
                                <P class="key">Quantity:</P>
                                <input type="number" min="1" max="${movieQuant}" value="1" id="${movie.id}" onclick="Calulate(event)">
                            </div>
                            <div class="rent-btn">
                                <button value="${Rentmovies.id}" onclick="CartRent(event)" type="button" >Cancel</button>
                            </div>
                        </div>`
            document.getElementById("all-cards").appendChild(div)
        }
    }
    let parent = document.getElementById("all-cards")
    let array = parent.querySelectorAll(".tot")
    let total = 0
    for (let i = 0; i < array.length; i++) {
        let element = array[i].textContent;
        let changenum = parseInt(element)
        total = total + changenum

    }

    document.getElementById("priceQuant").textContent = total
    document.getElementById("movieTot").textContent = RentedItems.length

}



function rentMoviePop() {
    document.getElementById("rentedItem-pop").style.left = "0%"
    Rmovieload()
    document.getElementById("cart-id").style.display = "none"
    totalPrice()

}
function CancelrentMoviePop() {
    document.getElementById("rentedItem-pop").style.left = "200%"
    document.getElementById("cart-id").style.display = "block"
    window.location.reload()


}

async function COrders() {
    alert("Order request Successfull")
    for (let i = 0; i <= RentedItems.length; i++) {
        const element = RentedItems[i];
        let date = new Date().getDate()
        let year = new Date().getFullYear()
        let Month = new Date().getMonth() + 1
        let fulldate = `${year}/${Month}/${date}`

        if (element) {
            let quant = document.getElementById(element.movieId).value
            let movie = movies.find(mov => mov.id == element.movieId)
            let Notification = { RentedId: element.id, RentQuantity: quant, movieId: element.movieId, UserId: UserId, RequestDate: fulldate, Status: false }

            await fetch(Notify_Url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(Notification)
            })
            let movieQuant = movie.Quantity - quant
            movie.Quantity = movieQuant
            await fetch(`${Movie_Url}/${movie.id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(movie)
            })

            let OrderReq = { RentedId: element.id, MovieId: movie.id, UserId: UserId, RentQuantity: quant, RentDate: fulldate }

            await fetch(Order_Url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(OrderReq)
            });

            await fetch(`${Rented_Url}/${element.id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
        }


    }
    window.location.reload()
}
function OrderHistory() {
    OrderHistoryView();
    document.getElementById("rentNotification").style.display = "block"
    document.getElementById("rentNotification").style.top="8%"

}


async function NotifyDelete(event) {
    let btnVal = event.target.value
    event.target.parentNode.parentNode.parentNode.remove()
    fetch(`${Notify_Url}/${btnVal}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    })
}

function CancelHistory() {
    document.getElementById("rentNotification").style.display = "none"
    window.location.reload()
}


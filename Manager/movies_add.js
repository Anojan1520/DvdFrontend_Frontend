let Movies_url="http://localhost:3000/Movies"

const Movies = [];

fetch(Movies_url)
.then(movie=>movie.json())
.then(movie=>{Movies.push(...movie)})

console.log(Movies)


document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault()
   
    let movieName = document.getElementById('movieName').value.trim()
    let genere = document.getElementById('genere').value.trim()
    let director = document.getElementById('director').value.trim()
    let actor = document.getElementById('actor').value.trim()
    let rDate = document.getElementById('rDate').value.trim()
    let image = document.getElementById('image').value
    let price = document.getElementById('Price').value.trim()
    let quantity = document.getElementById('Quantity').value.trim()
    // let id=Math.floor(Math.random()*9999)

    let movieCheck=Movies.find(m=>m.Name.toLowerCase()==movieName.toLowerCase())
    if (movieCheck == null) {
        let movieArray = { Name:movieName,Genere:genere,Director:director,Actor:actor,Release:rDate,Images:image,Quantity:quantity,Price:price }
        fetch(Movies_url,{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(movieArray)
        })     
        alert("Your movie add SuccessFully")
        window.location.reload()
    }else{
        alert("Movie already added.........")
    }
   

 
   


})



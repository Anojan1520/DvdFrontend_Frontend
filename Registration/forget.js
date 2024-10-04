console.log("work")
const Users = [];

fetch("http://localhost:3000/Customers")
.then(data => data.json())
.then(data => {
    Users.push(...data)
    console.log(Users)
})

let otp = Math.floor(Math.random() * 9999)+1000

document.getElementById("form").addEventListener('submit', function (event) {
    event.preventDefault()

    let UserName = document.getElementById("Username").value
    let UserEmail = document.getElementById("email").value
    let chengePass = { OTP: otp, User: UserName }
    sessionStorage.setItem('OTP', JSON.stringify(chengePass))


    let check = Users.find(user => user.username == UserName && user.email == UserEmail)
    if (check != null) {
        document.getElementById("message").textContent = "We will sent otp for your email"
        window.location.href = "./otp.html"
    }
    else {
        document.getElementById("message").textContent = "You details invalid"

    }

})
const Users = []
const CheckUsers = JSON.parse(sessionStorage.getItem('OTP'))

fetch("http://localhost:3000/Customers")
    .then(data => data.json())
    .then(array => {
        Users.push(...array)
        console.log(Users)

    })


document.getElementById("form").addEventListener('submit', function (event) {
    event.preventDefault();
    alert("submit")

    let pass = document.getElementById('password').value.trim()
    let repass = document.getElementById('Repassword').value.trim()

    if (pass == repass) {
        let ChangePass = Users.find(user => user.username == CheckUsers.User)
        ChangePass.password = pass
        console.log(ChangePass)
        fetch(`http://localhost:3000/Customers/${ChangePass.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ChangePass)
        })
        window.location.href = "./Signin.html"

    }
    else {
        document.getElementById('message').textContent = "Yourpassword not matched"
    }

})
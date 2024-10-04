const SearchId = new URLSearchParams(window.location.search)
const UserId = SearchId.get('loginId')
let Customer_Url = "http://localhost:3000/Customers"
let LoginUser_Url="http://localhost:3000/Login_User"
const AllUsers = [];
const Login_users=[];

const homeLink = document.getElementById('homeLink');
if (UserId) {
  homeLink.href = `../HomePage/Home.html?loginId=${UserId}`;
}
const CategoryLink=document.getElementById("CategoryLink")
if (UserId) {
    CategoryLink.href=`../CategoryPage/Category.html?loginId=${UserId}`
}



fetch(LoginUser_Url)
.then(response=>response.json())
.then(temb=>{
    Login_users.push(...temb)
})

fetch(Customer_Url)
    .then(response => response.json())
    .then(Customer => {
        AllUsers.push(...Customer)
        nav_func();
    })

 
    // let UserId=Temb_User.id
function nav_func() {
    if (UserId != null) {
        document.getElementById("login").style.display = "none"
        document.getElementById("signin").style.display = "none"
        document.getElementById("Profile").style.display = "block"
        document.getElementById("logout").style.display = "block"

        let rentBtn = document.querySelectorAll(".rent-btnLog")
        for (let r = 0; r < rentBtn.length; r++) {
            const element = rentBtn[r];
            element.style.display = "block"

        }
        let rentSign = document.querySelectorAll(".rent-btnSIg")
        for (let r = 0; r < rentSign.length; r++) {
            const element = rentSign[r];
            element.style.display = "none"

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
        let rentSign = document.querySelectorAll(".rent-btnSIg")
        for (let r = 0; r < rentSign.length; r++) {
            const element = rentSign[r];
            element.style.display = "block"

        }
    }

}

function Profile() {
    document.querySelector(".pop-cover").style.display = "block"
    let Users = AllUsers.find(user => user.id == UserId)
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
        fetch(`${Customer_Url}/${UserId}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(TembArray)
        })
        document.querySelector(".pop-cover").style.display = "none"
        window.location.reload()

    })
}

function cancelProfile(){
    document.querySelector(".pop-cover").style.display = "none"

}

function logout() {

    let User_details=AllUsers.find(x=>x.id==UserId)
    let Temb_User=Login_users.find(x=>x.username==User_details.username)

    fetch(`${LoginUser_Url}/${Temb_User.id}`,{
        method:'DELETE',
        headers:{
            'content-type':'application/json'
        }
    })
    const url = new URL(window.location.href);
    url.searchParams.delete('loginId');  
    window.history.replaceState({}, '', url);
    window.location.reload()
}
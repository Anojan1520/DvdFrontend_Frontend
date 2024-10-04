let Customers_Url = "http://localhost:3000/Customers"

const Users = [];

fetch(Customers_Url)
    .then(response => response.json())
    .then(customer => {
        Users.push(...customer);
        Customer_View_Function();
    })

console.log(Users)

function Customer_View_Function() {
    for (let index = 0; index < Users.length; index++) {
        let temb_customers = Users[index];
        if (temb_customers.position == 'user') {
            let tr = document.createElement('tr');
            tr.className = "tr"
            tr.innerHTML = `<td>${temb_customers.firstname}</td>
                        <td>${temb_customers.username}</td>
                        <td>${temb_customers.nic}</td>
                        <td>${temb_customers.phone}</td>
                        <td>${temb_customers.email}</td>
                        <td class="btn-flex">
                            <Button class="Edit-btn btn" onclick="Edit(event)" value="${index}">🖊️</Button><Button class="Delete-btn btn" onclick="Delete(event)" value="${index}">❎  </Button>
                        </td>`
            document.getElementById('customer-table').appendChild(tr)
        }

    }
}
function Edit(event) {
    document.querySelector(".pop-cover").style.display = "block"
    var btnValue = event.target.value
    var TembArray = Users[btnValue]
    console.log(TembArray)
    document.getElementById("firstname").value = TembArray.firstname
    document.getElementById("Username").value = TembArray.username
    document.getElementById("Nic").value = TembArray.nic
    document.getElementById("Phone").value = TembArray.phone
    document.getElementById("email").value = TembArray.email
    document.getElementById("Position").value = TembArray.position

    document.getElementById("form").addEventListener('submit', function (event) {
        event.preventDefault()
        var firstname = document.getElementById("firstname").value
        var Username = document.getElementById("Username").value
        var nic = document.getElementById("Nic").value
        var phone = document.getElementById("Phone").value
        var email = document.getElementById("email").value

        TembArray.firstname = firstname
        TembArray.username = Username
        TembArray.nic = nic
        TembArray.phone = phone
        TembArray.email = email
   
        fetch(`${Customers_Url}/${TembArray.id}`,{
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

function Delete(event) {
    var btnValue = event.target.value
    let TembArray=Users[btnValue]
    fetch(`${Customers_Url}/${TembArray.id}`,{
        method:'DELETE',
        headers:{
            'content-type':'application/json'
        },
    })
    alert(`${TembArray.username} Deleted Succesfully...`)
    window.location.reload()
}
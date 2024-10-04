const Orders = [];
const movies = [];
const ConfirmOrders = [];
const Notify = []
const Customer = []

// const Status=Json.Parse(localStorage.getItem("status"))||[];
order_Url = "http://localhost:3000/Orders";
movie_Url = "http://localhost:3000/Movies";
confirmOrder_Url = "http://localhost:3000/ConfirmOrders";
notification_Url = "http://localhost:3000/Notification";
User_Url = "http://localhost:3000/Customers";

Promise.all([
  fetch(order_Url)
    .then(response => response.json())
    .then(array => {
      Orders.push(...array)
    }),

  fetch(movie_Url)
    .then(response => response.json())
    .then(array => {
      movies.push(...array)
    }),
  fetch(confirmOrder_Url)
    .then(response => response.json())
    .then(array => {
      ConfirmOrders.push(...array)
    }),
  fetch(notification_Url)
    .then(response => response.json())
    .then(array => {
      Notify.push(...array)
    }),

  fetch(User_Url)
    .then(response => response.json())
    .then(array => {
      Customer.push(...array)
    })
]).then(() => {
  Order_view()
})


async function Order_view() {
  for (let i = 0; i < Orders.length; i++) {
    let Order = Orders[i]
    console.log(Order)
    let movie = movies.find(x => x.id == Order.MovieId)
    console.log(movie)

    let UserName = Customer.find(x => x.id == Order.UserId);
    console.log('UserName:', UserName);

    console.log(UserName)
    let total = 0
    if (movie) {
      total = Order.RentQuantity * movie.Price

    }
    if (UserName) {
      let tr = document.createElement('tr')
      tr.className = "tr"
      tr.innerHTML = `
                 <td>${UserName.firstname}</td>  
                    <td>${Order.id}</td>
                  <td>${movie.Name}</td>
                  <td>${Order.RentQuantity}</td>
                  <td>Rs${total}</td>
                  <td>${Order.RentDate}</td>
                  <td class="btn-flex">
                      <Button class="Edit-btn btn" onclick="Accept(event)" value="${Order.id}">✅ </Button><Button class="Delete-btn btn"
                          onclick="Decline(event)" value="${Order.id}">❎</Button>
                  </td>`
      document.getElementById('Movie-table').appendChild(tr)
    }


  }
}



async function Accept(event) {
  let Id = event.target.value
  let order = Orders.find(x => x.id == Id)
  alert(order.id)
  let movie = movies.find(x => x.id == order.MovieId)
  let RentedId = order.RentedId

  let Notification = Notify.find(x => x.RentedId === RentedId)

  let date = new Date().getDate()
  let year = new Date().getFullYear()
  let month = new Date().getMonth()+1
  let retDate=new Date().getDate()+7
  let Rdate = retDate
  let Ryear = year
  let Rmonth = month
  let fulldate = `${year}/${month}/${date}`
  let RentDate = `${Ryear}/${Rmonth}/${Rdate}`
  let array = { Movie: movie.Name, TotalRent: order.RentQuantity, UserId: order.UserId, RentedDate: fulldate, ReturnDate: RentDate, MovieId: movie.id }

  if (Notification) {
    Notification.Status = true
    Notification.RequestDate = RentDate
    await fetch(`${notification_Url}/${Notification.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(Notification)
    })

  } else {
    alert("Order member clear their history")
  }
  fetch(confirmOrder_Url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(array)
  })

  await fetch(`${order_Url}/${Id}`, {
    method: "DELETE",
    headers: {
      'content-type': 'application/json'
    }
  })


  window.location.reload()

}

async function Decline(event) {
  let Id = event.target.value

  let Order = Orders.find(ord => ord.id == Id)
  let MOVIE = movies.find(ord => ord.id == Order.MovieId)
  let Notification = Notify.find(x => x.RentedId == Order.RentedId)
  console.log(Notification)
 
  MOVIE.Quantity += parseInt(Order.RentQuantity)
  await fetch(`${movie_Url}/${MOVIE.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(MOVIE)
  })
  if (Notification) {
     Notification.Status = "Rejected"
    await fetch(`${notification_Url}/${Notification.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(Notification)
    })

  } else {
    alert("Order member clear their history")
  }
  await fetch(`${order_Url}/${Id}`, {
    method: "DELETE",
    headers: {
      'content-type': 'application.json'
    }
  })

  window.location.reload()

}

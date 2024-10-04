const CheckOtp = JSON.parse(sessionStorage.getItem('OTP'))
document.getElementById('message').textContent = `Enter Otp here ${CheckOtp.OTP}`

document.getElementById("form").addEventListener('submit', function (event) {
    event.preventDefault()

    let otp1 = document.getElementById("otp1").value
    let otp2 = document.getElementById("otp2").value
    let otp3 = document.getElementById("otp3").value
    let otp4 = document.getElementById("otp4").value
   
    let str=`${otp1}${otp2}${otp3}${otp4}`
     if(str==CheckOtp.OTP){
       document.getElementById("message").textContent="Your entered Otp Succesfull"
       window.location.href="./Changepass.html"
     }
     else{
       document.getElementById("message").textContent="Your entered Otp Invalid"
       setTimeout(timeout,1000)
        
     }
})
function timeout(){
    document.getElementById("message").textContent="Plz Enter Your Otp "+otp

}
const logout = () => {
  // localStorage.removeItem("authtoken");
  localStorage.clear();
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'info',
    title: 'Signed out successfully'
  })
  setTimeout(() => {
    window.location.reload();
  }, 2000);
  // window.location.reload();
};



const emailsuggest=`
If you do not receive the confirmation message within a few minutes,
please check your spam Mail folder.
Mark the email 'Not Spam' to receive future messages into the inbox.`

const login = (event) => {
  event.preventDefault();
  let username = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let btn = document.getElementById("login-submit");
  btn.innerHTML=`<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
 Login`
  btn.disabled = true;
  fetch(
      `https://varohgames.pythonanywhere.com/auth/is_active?username=${username}`
    )
    .then((res) => res.json())
    .then((status) => {
      if (status.is_active) {
        fetch("https://varohgames.pythonanywhere.com/api-token-auth/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          })
          .then((res) => {
            
            if (!res.ok) {
              throw new Error("Please enter valid email id and password.");
            }
            return res.json();
          })
          .then((data) => {
            btn.innerHTML='Login'
            btn.disabled = false;
            // console.log(data);
            localStorage.setItem("authtoken", data.token);
            //   create / user;
          }).then(()=>{const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })})
          .catch((err) => {
            btn.innerHTML='Login'
            btn.disabled = false;
            alert(err.message);
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
      } else {
        btn.innerHTML='Login'
        btn.disabled = false;
        Swal.fire({
          title: 'Please verify your email',
          text: `${emailsuggest}`,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        
        // alert(`verify email ${emailsuggest}`);
      }
    })
    .catch((err) => {
      btn.innerHTML='Login'
      btn.disabled = false;
      alert("Invalid email or password");
    });
};

const register = (event) => {
  event.preventDefault();
  let email = document.getElementById("email_r").value;
  let name = document.getElementById("username_r").value;
  let password = document.getElementById("password_r").value;
  let btn = document.getElementById("signup-submit");
  btn.innerHTML=`<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
 Submit`;
  btn.disabled = true;
  fetch("https://varohgames.pythonanywhere.com/auth/create/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("user already exist!!");
      }

      return res.json();
    })
    .then((data) => {
      btn.innerHTML='Submit'
      btn.disabled = false;
    //   alert(data.message);
    Swal.fire({
      title: 'email sent to your mail-id',
      text: `${emailsuggest}`,
      icon: 'success',
      confirmButtonText: 'Ok'
    })
    })
    .catch((err) => {
      btn.innerHTML='Submit'
      btn.disabled = false;
      alert(err.message);
    });
};

let auth_modal = `<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:214748364499999999 !important">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="container bcontent">
              <h4>Login / Register Form</h4>
              <hr />
              <!--Navigation Tabs-->
              <ul class="nav nav-tabs">
                  <li class="nav-item active">
                      <a class="nav-link btn btn-outline-primary border-primary mx-1 "   data-toggle="tab" href="#login">Login</a>
                  </li>
                  <li class="nav-item  ">
                      <a class="nav-link  btn btn-outline-primary border-primary mx-1"  data-toggle="tab" href="#register">Register</a>
                  </li>
              </ul>
              <!--Tabs Content-->
              <div class="tab-content">

                <!-- login content -->
                  <div class="tab-pane fade show active" id="login">
                    <form onsubmit="login(event)" class="needs-validation">
                    <div class="mb-3 has-validation form-group">
                      <label for="email" class="form-label">Email address</label>
                      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required>
                      <div class="invalid-feedback">
                        Please provide a valid email id.
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Password</label>
                      <input type="password" class="form-control" id="password" required>
                    </div>
                   
                    <div class="col-12 mt-3">
                     
                      <button type="submit" id="login-submit" class="btn btn-primary" type="button">Login</button>
                    </div>
                    <div class="mb-3 form-check">
                      <div class="mt-3"><a style="text-decoration: underline !important; " class="text-danger" href="https://varohgames.pythonanywhere.com/auth/password-reset">forgot password ?</a></div>
                    </div>
                  </form></div>

                  <!-- register content -->
                  <div class="tab-pane fade" id="register">  <form onsubmit="register(event)" class="needs-validation"method="post">
                    <div class="form-group my-3"><label for="username">Your name</label>
                      <input type="text" class="form-control" id="username_r" data-v-max-length="50" required>
                    </div>
                   
                    <div class="mb-3">
                      <div class="form-group">
                  
                            <label>Email</label>
                        
                            <input type="email" id="email_r" class="form-control"  inputmode="email" required>
          
                    </div>
                        
                      
                    </div>
                    <div class="mb-3">
                      <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" class="form-control" id="password_r" title="password" required>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="password">Confirm Password</label>
    <input name="repassword" type="password" class="form-control" data-v-equal="#password_r" required>
                    </div>
                    <div class="form-check my-2">
                      <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                      <label class="form-check-label" for="invalidCheck">
                        Agree to Varoh Games <a target="_blank" style="text-decoration: underline !important; " href="./termsofservice.html">terms and conditions</a> 
                      </label>
                      <div class="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                    <div class="form-group">
                      <button type="submit" id="signup-submit" class="btn btn-primary" type="button">Submit</button>
                    </div>
                  </form></div>
              </div>
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="cancel-btn"  class="btn-sm btn-secondary bg-danger" data-dismiss="modal">Close</button>
           
          </div>
        </div>
      </div>
    </div>`;

let login_btn = `<a class="dropdown-item"  data-toggle="modal" data-target="#myModal">Login</a>`;

let logout_btn = `<a class="dropdown-item" onclick="logout()">Logout</a>`;

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("authtoken")) {
    document.getElementById("auth_modal").innerHTML = auth_modal;
    document.getElementById("auth_header_btn1").innerHTML = login_btn;
  } else {
    document.getElementById("auth_header_btn1").innerHTML = logout_btn;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("authtoken")) {
    document.getElementById("auth_modal").innerHTML = auth_modal;
    document.getElementById("auth_header_btn2").innerHTML = login_btn;
  } else {
    document.getElementById("auth_header_btn2").innerHTML = logout_btn;
  }
});

// script for my orders click event in myaccount button
const myorders = () => {
  if (!localStorage.getItem("authtoken")) {
    alert("Please login");
  } else {
    window.location.href = "./myorders.html";
  }
};

//script for cart icon
const cartic = () => {
  if (localStorage.getItem("cart") != null) {
    let cartCount = JSON.parse(localStorage.getItem("cart")).length;
    if (cartCount != 0) {
      window.location.href = "./checkout.html";
    } else {
      alert("Cart is empty");
    }
  } else {
    alert("Cart is empty");
  }
};

// script for cart badge
const count = 0;
document.getElementById("badge1").innerHTML = count;
document.getElementById("badge2").innerHTML = count;
let cartItems = JSON.parse(localStorage.getItem("cart"));

let badge1 = document.getElementById("badge1").innerHTML;
let badge2 = document.getElementById("badge2").innerHTML;

if (cartItems != null) {
  let cartlen = cartItems.length;

  document.getElementById("badge1").innerHTML = cartlen;
  document.getElementById("badge2").innerHTML = cartlen;
} else if (cartItems == null) {
  let cartlen = 0;
  document.getElementById("badge1").innerHTML = cartlen;
  document.getElementById("badge2").innerHTML = cartlen;
}

// script to register service worker
if ("serviceWorker" in navigator) {
  // register service worker
  navigator.serviceWorker.unregister("service-worker.js");
}


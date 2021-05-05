const addAddress = (event) => {

  event.preventDefault();
  let btn = document.getElementById("address-submit-btn");
  btn.disabled = true;
 

  let username = document.getElementById("username").value;
  let mobileNumber = document.getElementById("mobileNumber").value;
  let pinCode = document.getElementById("pinCode").value;
  let flat = document.getElementById("flat").value;
  let area = document.getElementById("area").value;
  let landMark = document.getElementById("landMark").value;
  let town = document.getElementById("town").value;
  let state = document.getElementById("sts").value;

  let data = {
    username,
    mobileNumber,
    pinCode,
    flat,
    area,
    landMark,
    town,
    state,
  };

  //   console.log(data);

  fetch("https://varohgames.pythonanywhere.com/auth/create/address", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Token ${localStorage.getItem("authtoken")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      btn.disabled = false;
      window.location.href = "./checkout.html";
    });
};

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("authtoken")) {
    document.getElementById("auth_modal").innerHTML = auth_modal;
  }
});

//-=========================== login in AddAddress ==================================-

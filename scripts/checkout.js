// spinning animation and disable to place order btn
// window.location.reload();

$("#placeOrder").on("click", () => {
  $("#placeOrder")
    .html(
      `<span class="spinner-border spinner-border-sm mr-3" role="status" aria-hidden="true"></span>Place Order`
    )
    .attr("disabled", true);
});

//END spinning animation and disable to place order btn

const deleteItem = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart = cart.filter((item) => {
    return item.id !== id;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
};

const cartItem = (item) => {
  let cart1 = JSON.parse(localStorage.getItem("cart"));
  // console.log(cart1);

  // console.log(cart1.length);

  let html_text = `
  <div class="product">
  <div class="row">
      <div class="col-md-3">
          <img class="img-fluid mx-auto d-block image" src="${
            item.image
          }" style="
          height: 80px;
      ">
      </div>
      <div class="col-md-8 text-center">
          <div class="info">
              <div class="row">
                  <div class="col-md-5 product-name">
                      <div class="product-name">
                          <a href="#">${item.name}</a>
                          <div class="product-info">
                              <!--<div>Category: <span class="value">${
                                item.category
                              }</span></div>-->
                              <div>Price: <span class="value">${
                                item.price
                              }</span></div>
                          </div>
                      </div>
                  </div>
  
                  <div class="col-md-4 my-4 quantity ">
                      <label for="quantity" style="font-size: 17px;color: #038080;">Quantity:</label>
                     <div class="qty mb-5  " style="margin-top:0rem !important;display:inline !important; 
                     width: 100px;
                     overflow: hidden;
                     white-space: nowrap;">
                     <span class="minus bg-dark" onclick="dec('${
                       item.id
                     }')">-</span>
                     <input disabled min="1"  oninput="this.value = 
                     !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null" id="${
                       item.id
                     }" type="number" class="count" onkeyup="hey('${
    item.id
  }')" name="qty" value="${item.quantity}"
    type="number"
    id="quantity"
   min="1"
    >
                     <span class="plus bg-dark" onclick="inc('${
                       item.id
                     }')">+</span>
                 </div>
  
                  </div>
                  <div class="col-md-3 price">
                      <span style="    font-size: 19px;
                      font-weight: 500;
                      color: #088080;
                      /* background-color: #e2d3bf; */
                      border-radius: 5px;
                  }">Rs. ${item.quantity * item.price}</span>
                      <a href="#" style="    font-size: 18px;
                      color: red;
                      margin-right: 1px;" onclick="deleteItem('${item.id}')">
                      <button class="btn btn-danger" style="font-size:10px">Delete <i class="fa fa-trash"></i></button>
                      </a>    
                  </div>
                  </div>
          </div>
      </div>
  </div>
  </div>
  <hr></hr>
`;

  return html_text;
};

//  function for checkout button
const checkout = () => {
  if (localStorage.getItem("authtoken")) {
    let check = $('input[name="address"]').is(":checked");
    if (check) {
      $("#checkoutModal").modal("toggle");
    } else {
      alert("select address");
    }
  } else {
    alert("Please login");
    $("#myModal").modal("toggle");
    $("#cancel-btn").on("click", () => {
      $("#myModal").modal("hide");
    });
  }
};

const inc = (id) => {
  // let hello = document.getElementById(id).value;

  let cart = JSON.parse(localStorage.getItem("cart"));
  cart = cart.map((item) => {
    if (item.id === id) {
      item.quantity += 1;
    }

    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  // console.log(cart);
  window.location.reload();
};

const dec = (id) => {
  // let hello = document.getElementById(id).value;

  let cart = JSON.parse(localStorage.getItem("cart"));
  cart = cart.map((item) => {
    if (item.id === id) {
      if (item.quantity >= 2) {
        item.quantity -= 1;
      }
    }

    return item;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  // console.log(cart);
  window.location.reload();
};

const renderAddress = (address) => {
  let html_text = ` <label class="radio-inline text-wrap text-uppercase ">
  <input style="height:1.5em; width:1.5em;"  type="radio" value='${address.id}' name="address">
  ${address.full_name}, ${address.state}, ${address.town}
  ${address.area}, ${address.landmark}, ${address.house},
  zip-${address.pin_code}
</label>
<div class="clearfix">
<a href="#"  style="    font-size: 30px;
      color: red;
      margin-right: 1px;" onclick="deleteAddress('${address.id}')">
        <i class="fa fa-trash float-right" aria-hidden="true"></i>
      </a> 
<br>
<hr>
</div>`;

  return html_text;
};

const deleteAddress = (id) => {
  let flag = confirm("do you want to delete");

  if (flag) {
    let fd = new FormData();
    fd.append("pk", id);
    fetch(`https://varohgames.pythonanywhere.com/auth/delete/address`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("authtoken")}`,
      },
      body: fd,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to delete address");
        }

        return res.json();
      })
      .then((data) => {
        alert(data.message);
        window.location.reload();
      })
      .catch((err) => alert(err.message));
  }
};

const addAddress = () => {
  if (!localStorage.getItem("authtoken")) {
    alert("Please login");
    document.getElementById("auth_modal").innerHTML = auth_modal;
  } else {
    window.location.href = "./address.html";
  }
};

const razorPayment = (razor_id) => {
  var options = {
    key: "rzp_live_GmeJfcN1s6qJl4", // Enter the Key ID generated from the Dashboard
    // amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "VAROH GAMES",
    description: "Test Transaction",
    // image: "https://example.com/your_logo",
    order_id: razor_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      let payment_id = response.razorpay_payment_id;
      let order_id = response.razorpay_order_id;
      let signature = response.razorpay_signature;

      const data = {
        payment_id,
        order_id,
        signature,
      };

      // console.log(data);

      fetch("https://varohgames.pythonanywhere.com/orders/verify", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("authtoken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          $("#checkoutModal").modal("hide");
          localStorage.setItem("cart", "[]");
          Swal.fire({
            icon: 'success',
            title: 'payment successful',
            confirmButtonText: 'Ok',
            
          }).then((result) => {
            if (result.value) {
              window.location.href = `./myorders.html`
            }
          }); 
          // setTimeout(() => {
          //   alert("payment successful");
          //   localStorage.setItem("cart", "[]");
          //   window.location.href = "./myorders.html";
          // }, 300);
          // alert("payment successful");
          // // console.log(data);
          // localStorage.setItem("cart", "[]");
          // window.location.href = "./myorders.html";
        });
    },
    theme: {
      color: "#3399cc",
    },
    modal: {
      ondismiss: () => {
        // window.location.reload();
      },
    },
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
};

const makePayment = () => {
  try {
    document.querySelector('input[name="address"]:checked').value;
  } catch (e) {
    alert("select address");
  }

  const data = {
    address: parseInt(
      document.querySelector('input[name="address"]:checked').value
    ),
    copun: document.getElementById("copun").value,
    items: JSON.parse(localStorage.getItem("cart")),
    cod: document.getElementById("cod").checked,
  };

  if (!document.getElementById("cod").checked) {
    fetch("https://varohgames.pythonanywhere.com/orders/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Token ${localStorage.getItem("authtoken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        $("#placeOrder").html(`Place Order`).attr("disabled", false);
        // console.log(data);
        razorPayment(data.razor_id);
      });
  } else {
    fetch("https://varohgames.pythonanywhere.com/orders/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Token ${localStorage.getItem("authtoken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        $("#placeOrder").html(`Place Order`).attr("disabled", false);
        // console.log(data);

        $("#checkoutModal").modal("hide");
        localStorage.setItem("cart", "[]");

        Swal.fire({
          icon: 'success',
          title: 'order placed',
          confirmButtonText: 'Ok',
          
        }).then((result) => {
          if (result.value) {
            window.location.href = `./myorders.html`
          }
        }); 
        // setTimeout(() => {
          // alert("order placed");
          // localStorage.setItem("cart", "[]");
          // window.location.href = "./myorders.html";
        // }, 300);
        // alert("order placed");
        // localStorage.setItem("cart", "[]");
        // window.location.href = "./myorders.html";
        // razorPayment(data.razor_id);
      });
  }
};

const fetchApplyCopun = () => {
  // copun_input
  let code = document.getElementById("copun_input").value;
  let cart = JSON.parse(localStorage.getItem("cart"));
  

  if (code.trim() !== "") {
    fetch(`https://varohgames.pythonanywhere.com/orders/copun?code=${code}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("no copun found");
        }
        return res.json();
      })
      .then((copun) => {
        console.log(copun);

        if (copun.is_combo === false && copun.status === false) {
          document.getElementById("copun_input").value = "";
          applyCopun(copun);
          return;
        }

        if (copun.is_combo) {
          if (cart.length > 1) {
            document.getElementById("copun_input").value = "";
            applyCopun(copun);
          } else {
            throw new Error(
              "This coupon is applicable over purchase of atleast two products."
            );
          }
        } else {
          if (cart[0]["copun"] !== copun.id) {
            throw new Error("Cant apply this coupon");
          }

          document.getElementById("copun_input").value = "";
          applyCopun(copun);
        }
      })
      .catch((err) => alert(err.message));
  } else {
    alert("Enter a copun");
  }
};

const applyCopun = (copun) => {
  document.getElementById("copun_price").value = copun.percentage;
  document.getElementById("copun").value = copun.code;
//   document.getElementById("copun_input").disabled = true;
    document.getElementById("copun_input").style.display = 'none';
  let cart = JSON.parse(localStorage.getItem("cart"));
  let cart_price = 0;
  let discount_price = Number(document.getElementById("copun_price").value);
  let shipping_price = Number(
    document.getElementById("shipping_price_hidden").value
  );
  let total_price;
  cart.forEach((item) => {
    // document.getElementById("cart-items").innerHTML += cartItem(item);
    cart_price += item.price * item.quantity;
  });

  total_price =
    cart_price + shipping_price - (discount_price / 100) * cart_price;
  document.getElementById("cart_price").innerHTML = `Rs. ${cart_price}`;

  if (shipping_price === 0) {
    document.getElementById("shipping_price").innerHTML = "Free Shipping";
  } else {
    document.getElementById(
      "shipping_price"
    ).innerHTML = `Rs. ${shipping_price}`;
  }

  document.getElementById("discount_price").innerHTML = `${discount_price} %`;
  document.getElementById("total_price").innerHTML = `Rs. ${total_price}`;
  document.getElementById("total_amount_modal").innerHTML = `${total_price}`;

  document.getElementById("apply_copun_btn").hidden = true;
  document.getElementById("remove_copun_btn").hidden = false;
};

const removeCopun = () => {
  document.getElementById("copun_price").value = null;
  document.getElementById("copun").value = null;
 document.getElementById("copun_input").style.display = 'block';
  let cart = JSON.parse(localStorage.getItem("cart"));
  let cart_price = 0;
  let discount_price = 0;
  let shipping_price = Number(
    document.getElementById("shipping_price_hidden").value
  );
  let total_price;
  cart.forEach((item) => {
    // document.getElementById("cart-items").innerHTML += cartItem(item);
    cart_price += item.price * item.quantity;
  });

  total_price =
    cart_price + shipping_price - (discount_price / 100) * cart_price;
  document.getElementById("cart_price").innerHTML = `Rs. ${cart_price}`;

  if (shipping_price === 0) {
    document.getElementById("shipping_price").innerHTML = "Free Shipping";
  } else {
    document.getElementById(
      "shipping_price"
    ).innerHTML = `Rs. ${shipping_price}`;
  }

  document.getElementById("discount_price").innerHTML = `${discount_price} %`;
  document.getElementById("total_price").innerHTML = `Rs. ${total_price}`;
  document.getElementById("total_amount_modal").innerHTML = `${total_price}`;

  document.getElementById("apply_copun_btn").hidden = false;
  document.getElementById("remove_copun_btn").hidden = true;
};

// cod_extra_charges total_amount_modal
const iCod = () => {
  let cod_charge = document.getElementById("cod_extra_charges");
  let amount = document.getElementById("total_amount_modal");

  // console.log(cod_charge);
  // console.log(amount);

  amount.innerHTML = Number(amount.innerHTML) + Number(cod_charge.innerHTML);
};

const dCod = () => {
  let cod_charge = document.getElementById("cod_extra_charges");
  let amount = document.getElementById("total_amount_modal");

  // console.log(cod_charge);
  // console.log(amount);

  amount.innerHTML = Number(amount.innerHTML) - Number(cod_charge.innerHTML);
};

document.addEventListener("DOMContentLoaded", () => {
  const auth_token = localStorage.getItem("authtoken");
  fetch(`https://varohgames.pythonanywhere.com/auth/address`, {
    headers: {
      Authorization: `Token ${auth_token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((address) => {
        document.getElementById("address_div").innerHTML += renderAddress(
          address
        );
      });
    });

  // cod_extra_charges total_amount_modal
  fetch("https://varohgames.pythonanywhere.com/api/pricing?name=cod")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("cod_extra_charges").innerHTML = data.price;
    });

  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart.length === 0) {
    alert("cart is empty");
    window.location.href = "./products.html";
  }

  if (cart.length <= 1) {
    fetch(
      `https://varohgames.pythonanywhere.com/orders/copun?id=${cart[0].id}&category=${cart[0].category}`
    )
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("couponCode").value = data.code;
        document.getElementById("couponCodeP").value = data.percentage + " %";

        // document.getElementById("apply_copun_btn").onclick = () =>
        //   applyCopun(data);
      });
  } else {
    fetch("https://varohgames.pythonanywhere.com/orders/copun")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        document.getElementById("couponCode").value = data.code;
        document.getElementById("couponCodeP").value = data.percentage + " %";

        // document.getElementById("apply_copun_btn").onclick = () =>
        //   applyCopun(data);
      });
  }

  fetch("https://varohgames.pythonanywhere.com/api/pricing?name=shipping")
    .then((res) => res.json())
    .then((data) => {
      let cart_price = 0;
      let discount_price = 0;
      let shipping_price = data.price;
      let total_price;
      cart.forEach((item) => {
        document.getElementById("cart-items").innerHTML += cartItem(item);
        cart_price += item.price * item.quantity;
      });

      total_price =
        cart_price + shipping_price - (discount_price / 100) * cart_price;
      document.getElementById("cart_price").innerHTML = `Rs. ${cart_price}`;
      document.getElementById("shipping_price_hidden").value = shipping_price;
      if (shipping_price !== 0) {
        document.getElementById(
          "shipping_price"
        ).innerHTML = `Rs. ${shipping_price}`;
      } else {
        document.getElementById("shipping_price").innerHTML = `Free Shipping`;
      }

      document.getElementById(
        "discount_price"
      ).innerHTML = `${discount_price} %`;
      document.getElementById("total_price").innerHTML = `Rs. ${total_price}`;
      document.getElementById(
        "total_amount_modal"
      ).innerHTML = `${total_price}`;
    });
});

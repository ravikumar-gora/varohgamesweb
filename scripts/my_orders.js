const render_order = (item) => {
  let product_name = "";
  for (let i = 0; i < item.order_items.length; i++) {
    product_name +=
      '<p style="float: left;">Product : ${item.order_items[0].name}</p>';
  }
  // console.log(item);
  let stamp = item.timestamp;
  let stamp1 = stamp.split("T");
  let timestamp = stamp1[0];
  // console.log(item.order_items.length);
  let html = `    <div class="shadow p-3  bg-white rounded card mb-5 " >
        <div class="card-header" style="    background-color: antiquewhite;overflow: hidden;">

   
    <p style="float: right;">Price : Rs.${item.total}</p>

        </div>
        <div class="card-body" style="background-color: azure;">
          <h5 class="card-title">Mode: ${
            item.cod ? "Cash on Delivery" : "Online payment "
          }</h5>
          <p class="card-text">Ordered on : ${timestamp}</p>
          <p class="card-text">Order id: ${item.order_id}</p>
          <hr />
          <button type="button" class="btn btn-outline-success" style="cursor:default !important;">
            Order Placed
            <img
              src="https://www.errortechnologies.com/varoh/success.svg"
              style="height: 25px"
            />
          </button>
        </div>
      </div>

`;

  return html;
};

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("authtoken")) {
    alert("please login");
    window.location.href = "./index.html";
  }

  fetch(`https://varohgames.pythonanywhere.com/orders/list`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("authtoken")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        data.forEach((item) => {
          document.getElementById("myorders").innerHTML += render_order(item);
        });
      } else {
        alert("no orders made");
      }
    });
});

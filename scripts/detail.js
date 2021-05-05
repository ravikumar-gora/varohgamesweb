const detail_html = (item, category) => {
  console.log(item.short_decription);

  let category_;

  if (category == "activity_box") {
    category_ = "Knowledge Box";
  } else if (category == "games") {
    category_ = "Games";
  } else {
    category_ = "Varoh's Books";
  }

  let star = `<svg
            fill="orange"
            stroke="orange"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 text-indigo-500"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            ></path>
          </svg>`;

  let start_html = "";

  for (let i = 0; i < item.rating; i++) {
    start_html += star;
  }

  // category.toUpperCase().split("_").join(" ")

  const html_text = ` <div class="container-lg py-5 " >
  <div class="row shadow p-3 mb-5 bg-white rounded">
   <div id="carouselExampleInterval" class="carousel-fade carousel slide col-lg-6" data-bs-ride="carousel">
   <div class="carousel-inner  rounded detailCarousel ">
     <div class="carousel-item active" >
       <img src="${item.main_image}" >
     </div>
     <div class="carousel-item" >
       <img src="${item.image1}">
     </div>
     <div class="carousel-item" >
       <img src="${item.image3}">
     </div>
     <div class="carousel-item" >
       <img src="${item.image2}">
     </div>
     <div class="carousel-item" >
       <img src="${item.image4}">
     </div>
   </div>
   <a id="carouselarrowprev"  class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-bs-slide="prev">
   <span class="carousel-control-prev-icon" aria-hidden="true" style="height:40px;width:40px;"></span>
   <span class="visually-hidden">Previous</span>
 </a>
 <a id="carouselarrownext" class="carousel-control-next" href="#carouselExampleInterval" role="button" data-bs-slide="next">
   <span class="carousel-control-next-icon" aria-hidden="true"  style="height:40px;width:40px;"></span>
   <span class="visually-hidden">Next</span>
 </a>
 </div>
  

    <div class="col-lg-6" style="width:100% !important">
      <h2 class="text-sm title-font text-gray-500 tracking-widest">
        ${category_}
      </h2>
      <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
        ${item.name}
      </h1>
      <div class="flex mb-4 ">
        <span class="flex items-center">
          ${start_html}
        </span>
     
      </div>
      <p class="leading minimize" >
        ${item.description}
      </p>
      <p style="color: green;">${item.short_decription}</p>
      
      <div
        class="mb-2"
      >
        <div class="flex ml-6 items-center">
          <span class="mr-3" style="margin-bottom: 16px;">QTY</span>
          <div class="relative">
          <form>
          <div class="form-group">
            <input
              id='quantity'
              type="number"
              inputmode="tel"
              value="1"
              class="form-control rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-indigo-500 text-base pl-3 pr-10"
              min="1" oninput="this.value = 
              !!this.value && Math.abs(this.value) >= 1 ? Math.abs(this.value) : null"
              style="width:6rem;border:2px solid black !important;"
              onchange="this.value=!!this.value && Math.abs(this.value) >= 1 ? Math.abs(this.value) : 1"
              }
            />
          </div>
        </form>
          </div>
        </div>
      </div>
      <hr>
      <div class="addcart" style="display:flex;justify-content:center">
        <span class="title-font font-medium text-2xl text-gray-900 text-danger"
         style="font-size:15px" >₹ ${item.price}</span
        >
        <button
          id='add_to_cart' style="font-size:12px"
          class="align-items-sm-start flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>`;

  return html_text;
};

const addToCart = (name, category, quantity, price, id, image, copun) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const item = cart.filter((i) => i.id === id)[0];

  if (item) {
    alert("already added to cart");
    let c = confirm("Would you like to go to the cart ?");
    if (c) {
      window.location.href = "./checkout.html";
    } else {
      window.location.href = "./products.html";
    }
  } else {
    cart.push({
      name: name,
      category: category,
      quantity: Number(quantity),
      price: price,
      id: id,
      image: image,
      copun: copun,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart");
    window.location.href = "./products.html";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let detail = JSON.parse(localStorage.getItem("detail"));
  let category = detail.category;
  let id = detail.id;

  fetch(`https://varohgames.pythonanywhere.com/api/${category}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("detail").innerHTML = detail_html(data, category);
      // script for detail page carousel
      var $ = jQuery.noConflict();
      $(document).ready(function () {
        $("#carouselExampleInterval").carousel({
          interval: 2000,
          cycle: true,
        });
      });
      // END script for detail page carousel

      // script for less or more button
      var minimized_elements = $("p.minimize");

      minimized_elements.each(function () {
        var t = $(this).text();
        if (t.length < 100) return;

        $(this).html(
          t.slice(0, 100) +
            '<span>... </span><a href="#" class="more">More</a>' +
            '<span style="display:none;">' +
            t.slice(100, t.length) +
            ' <a href="#" class="less">Less</a></span>'
        );
      });

      $("a.more", minimized_elements).click(function (event) {
        event.preventDefault();
        $(this).hide().prev().hide();
        $(this).next().show();
      });

      $("a.less", minimized_elements).click(function (event) {
        event.preventDefault();
        $(this).parent().hide().prev().show().prev().show();
      });
      //END script for less or more button

      document.getElementById("add_to_cart").onclick = () => {
        addToCart(
          data.name,
          category,
          document.getElementById("quantity").value,
          data.price,
          data.id,
          data.main_image,
          data.copun
        );
      };
    });
});

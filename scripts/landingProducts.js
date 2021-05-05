const html = (item) => {
  return `<div class="card-item ">
                <!-- list group item-->
            <li class="list-group-item">
              <!-- Custom content-->
              <img src="${item.main_image}" alt="Generic placeholder image" width="200" class="ml-lg-5 order-1 order-lg-2">
              <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                <div class="media-body order-2 order-lg-1">
                  <h5 class="mt-0 font-weight-bold mb-2">${item.name}</h5>
                  <p class="font-italic text-muted mb-0 small"> ${item.description}</p>
                  <div class="d-flex align-items-center justify-content-between mt-1">
                    <h6 class="font-weight-bold my-2">&#8377;${item.price}</h6>
                    <a class="btn-sm btn-primary text-white orderBtn"  href="./products.html">order now</a>
                    <ul class="list-inline small">
                      <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                      <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                      <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                      <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                      <li class="list-inline-item m-0"><i class="fa fa-star-o text-gray"></i></li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- End -->
            </li>
            <!-- End -->
                </div>`;
};

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    fetch(`https://varohgames.pythonanywhere.com/api/games`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          document.querySelector("#cards-slider").innerHTML += html(element);
        });
      });
  }, 3000);
});

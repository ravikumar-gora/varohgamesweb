const goToDetail = (id, category) => {
  localStorage.setItem(
    "detail",
    JSON.stringify({
      category: category,
      id: id,
    })
  );
  window.location.href = "./detail.html";
};

const games = (game) => {
  
 let youtube;

  if (game.youtube_link == "") {
    youtube = "https://www.youtube.com/channel/UCfy0-7GgVMRZ-ogiixeSgmg/featured";
  } else {
    youtube = game.youtube_link;
  }

  let rating_text = "";
  for (let i = 0; i < game.rating; i++) {
    rating_text += '<span class="fa fa-star checked"></span>';
  }
  for (let i = game.rating; i < 5; i++) {
    rating_text += '<span class="fa fa-star"></span>';
  }
  let html_text = ` <div class="col-lg-6 col-md-6  " >
                            <!-- First product box start here-->
                            <div class="prod-info-main prod-wrap clearfix shadow p-3 mb-5 bg-white rounded">
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                        <div>
                                            <img src=${game.main_image} onclick="goToDetail('${game.id}', 'games')" class="img-responsive rotprod"
                                                style="cursor:pointer;vertical-align: middle; border-style: none;width: 100%;height:auto" >
                                            
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                        <div class="product-deatil">
                                            <h5 class="name" >
                                                <a href="#" onclick="goToDetail('${game.id}', 'games')">
                                                    ${game.name} <span>Games</span>
                                                </a>
                                            </h5>

                                            <div class="pricerate" style=" display: flex;justify-content: space-between;">
                                                <p class="price-container">
                                                    <span class="stars">Rs.${game.price}</span>

                                                <div class="rating" style="    font-size: 12px;
                                                margin-top: 10px;">
                                                    ${rating_text}
                                                </div>
                                                </p>
                                            </div>



                                        </div>
                                        <div class="description" >
                                            <p style="color:green;font-size:13px;">${game.short_decription} </p>
                                        </div>
                                        <div class="product-info smart-form ">
                                            <div class="row ">
                                                <div class="col-md-14 col-lg-14 col-sm-14 col-xs-14 d-flex justify-content-center">
                                                    <a href="javascript:void(0);"
                                                        onclick="goToDetail('${game.id}', 'games')"
                                                        class="btn btn-info"><span>MORE INFO</span></a>
                                                    <!-- <a href="javascript:void(0);" class="btn btn-info"><span>More info</span></a> -->

                                                </div>
                                                <div class="col-lg-12 d-flex justify-content-center ">
                                                <a rel="noreferrer noopener"  href=${youtube} target="_blank"
                                                 class=" d-flex justify-content-center align-items-center my-3  btn border border-danger btn-sm text-dark"><i
                                                class="fab fa-youtube fa-1x text-danger  mr-2"></i>Watch</a>
                                                </div>

                                            </div>
                                        </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end product -->
                        </div>`;

  return html_text;
};

const special_books = (book) => {
  
  let rating_text = "";
  for (let i = 0; i < book.rating; i++) {
    rating_text += '<span class="fa fa-star checked"></span>';
  }
  for (let i = book.rating; i < 5; i++) {
    rating_text += '<span class="fa fa-star"></span>';
  }
  let html_text = ` <div class="col-lg-6 col-md-6  " onclick="goToDetail('${book.id}', 'special_books')">
                            <!-- First product box start here-->
                            <div class="prod-info-main prod-wrap clearfix shadow p-3 mb-5 bg-white rounded">
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                        <div>
                                            <img src=${book.main_image} 
                                            class="img-responsive rotprod"
                                                style="cursor:pointer;vertical-align: middle; border-style: none;width: 100%;height:auto;">
                                          
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                        <div class="product-deatil">
                                            <h5 class="name">
                                                <a href="#">
                                                    ${book.name} <span>Varoh's Books</span>
                                                </a>
                                            </h5>

                                            <div class="pricerate" style=" display: flex;
justify-content: space-between;">
                                                <p class="price-container">
                                                    <span class="stars">Rs.${book.price}</span>

                                                <div class="rating" style="    font-size: 12px;
                                                margin-top: 10px;">
                                                    ${rating_text}
                                                </div>
                                                </p>
                                            </div>



                                        </div>
                                        <div class="description" >
                                            <p style="color:green;font-size:13px;">${book.short_decription} </p>
                                        </div>
                                        <div class="product-info smart-form">
                                            <div class="row">
                                                <div class="col-md-14 col-lg-14 col-sm-14 col-xs-14 d-flex justify-content-center ">
                                                    <a href="javascript:void(0);"
                                                        onclick="goToDetail('${book.id}', 'special_books')"
                                                        class="btn btn-info"><span>MORE INFO</span></a>
                                                    <!-- <a href="javascript:void(0);" class="btn btn-info"><span>More info</span></a> -->

                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end product -->
                        </div>`;

  return html_text;
};

const activity_box = (box) => {

  let youtube;

  if (box.youtube_link == "") {
    youtube = "https://www.youtube.com/channel/UCfy0-7GgVMRZ-ogiixeSgmg/featured";
  } else {
    youtube = box.youtube_link;
  }
 
  let rating_text = "";
  for (let i = 0; i < box.rating; i++) {
    rating_text += '<span class="fa fa-star checked"></span>';
  }
  for (let i = box.rating; i < 5; i++) {
    rating_text += '<span class="fa fa-star"></span>';
  }
  let html_text = ` <div class="col-lg-6 col-md-6  " >
                            <!-- First product box start here-->
                            <div class="prod-info-main prod-wrap clearfix shadow p-3 mb-5 bg-white rounded">
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                        <div>
                                            <img src="${box.main_image}" onclick="goToDetail('${box.id}', 'activity_box')" class="img-responsive rotprod"
                                                style="cursor:pointer;vertical-align: middle; border-style: none;width: 100%;height:auto">
                                            
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                        <div class="product-deatil">
                                            <h5 class="name">
                                                <a href="#" onclick="goToDetail('${box.id}', 'activity_box')">
                                                    ${box.name} <span>Knowledge Box</span>
                                                </a>
                                            </h5>

                                            <div class="pricerate" style=" display: flex;
justify-content: space-between;">
                                                <p class="price-container">
                                                    <span class="stars">Rs.${box.price}</span>

                                                <div class="rating" style="    font-size: 12px;
                                                margin-top: 10px;">
                                                    ${rating_text}
                                                </div>
                                                </p>
                                            </div>



                                        </div>
                                        <div class="description" >
                                            <p style="color:green;font-size:13px;">${box.short_decription} </p>
                                        </div>
                                        <div class="product-info smart-form">
                                            <div class="row">
                                                <div class="col-md-14 col-lg-14 col-sm-14 col-xs-14 d-flex justify-content-center">
                                                    <a href="javascript:void(0);"
                                                        onclick="goToDetail('${box.id}', 'activity_box')"
                                                        class="btn btn-info"><span>MORE INFO</span></a>
                                                    <!-- <a href="javascript:void(0);" class="btn btn-info"><span>More info</span></a> -->

                                                </div>
                                                <div class="col-lg-12 d-flex justify-content-center ">
                                                <a rel="noreferrer noopener" href=${youtube} target="_blank" 
                                                class=" d-flex justify-content-center align-items-center my-3  btn border border-danger btn-sm text-dark"><i
                                                class="fab fa-youtube fa-1x text-danger  mr-2"></i>Watch</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end product -->
                        </div>`;

  return html_text;
};

const getBoxes = (event) => {
  document.getElementById("activity_box_row").innerHTML = "";
  let id = event.target.value;
  fetch(`https://varohgames.pythonanywhere.com/api/activity_box?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((box) => {
        document.getElementById("activity_box_row").innerHTML += activity_box(
          box
        );
      });
    });
};

const knowledgeCapsules = (event) => {
  event.preventDefault();

  let btn = document.getElementById("kCSubmit");
  btn.disabled = true;

  let fd = new FormData();
  let name = document.getElementById("kcname");
  let email = document.getElementById("kcemail");
  let city = document.getElementById("kccity");
  let school = document.getElementById("kcschool");
  let standard = document.getElementById("kcstandard");

  fd.append("name", name.value);
  fd.append("email", email.value);
  fd.append("city", city.value);
  fd.append("school", school.value);
  fd.append("standard", standard.value);

  fetch("https://varohgames.pythonanywhere.com/api/knowledge_capsule", {
      method: "POST",
      body: fd,
    })
    .then((res) => {
      if (!res.ok) {
        btn.disabled = false;
        throw new Error("error");
      }
      btn.disabled = false;
      alert("we received your details");
      window.location.reload();
    })
    .catch((err) => {btn.disabled = false;
    window.location.reload()});
};

document.addEventListener("DOMContentLoaded", () => {
  // localStorage.setItem("cart", JSON.stringify([]));
  //   GAMES

  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", "[]");
  }

  fetch("https://varohgames.pythonanywhere.com/api/games")
    .then((res) => {
      document.getElementById("loader").hidden = true;
      document.getElementById("loader1").hidden = true;

      return res.json();
    })
    .then((data) => {
      data.forEach((game) => {
        document.getElementById("games_row").innerHTML += games(game);
        document.getElementById("allproducts").innerHTML += games(game);
      });
    });

  //  SPECIAL BOOKS
  fetch("https://varohgames.pythonanywhere.com/api/special_books")
    .then((res) => {
      document.getElementById("loader3").hidden = true;
      return res.json();
    })
    .then((data) => {
      data.forEach((book) => {
        document.getElementById("special_books_row").innerHTML += special_books(
          book
        );
        document.getElementById("allproducts").innerHTML += special_books(book);
      });
    });

  // STANDARD
  fetch("https://varohgames.pythonanywhere.com/api/standard")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("select_standard").innerHTML =
        "<option value=''>all</option>";
      data.forEach((item) => {
        document.getElementById(
          "select_standard"
        ).innerHTML += `<option value='${item.id}'>${item.name}</option>`;
      });
    });

  // ACTIVITY BOX
  fetch("https://varohgames.pythonanywhere.com/api/activity_box")
    .then((res) => {
      document.getElementById("loader2").hidden = true;
      return res.json();
    })
    .then((data) => {
      data.forEach((box) => {
        document.getElementById("activity_box_row").innerHTML += activity_box(
          box
        );
        document.getElementById("allproducts").innerHTML += activity_box(box);
      });
    });
});
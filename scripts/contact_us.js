const sendFeedBack = (event) => {
  event.preventDefault();
  const fd = new FormData();
  fd.append("name", document.getElementById("name").value);
  fd.append("subject", document.getElementById("subject").value);
  fd.append("email", document.getElementById("fb_email").value);
  fd.append("message", document.getElementById("message").value);

  document.getElementById("name").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("fb_email").value = "";
  document.getElementById("message").value = "";

  fetch("https://varohgames.pythonanywhere.com/auth/contact_us", {
    method: "POST",
    body: fd,
  })
    .then((res) => res.json())
    .then((data) => alert(data.message));
};

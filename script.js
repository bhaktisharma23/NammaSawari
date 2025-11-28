document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  if (user === "" || pass === "") {
    alert("Please enter email and password");
    return;
  }

  if (user === savedEmail && pass === savedPassword) {
    window.location.href = "home.html";
  } else {
    alert("Incorrect email or password. If you don't have an account, please sign up.");
  }
});


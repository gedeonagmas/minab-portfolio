// Sticky Navbar
let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let yourName = document.getElementById("name");
let email = document.getElementById("email");
let message = document.getElementById("message");
let response = document.getElementById("response");
const validateEmailRegex = /^\S+@\S+\.\S+$/;

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

const hello = () => {
  if (yourName.value.length <= 3) {
    response.textContent = "Your Name must be greater than 3 character";
  } else if (!validateEmailRegex.test(email.value)) {
    response.textContent = "Invalid Email";
  } else if (message.value.length <= 3) {
    response.textContent = "Message must be greater than 3 character";
  } else if (yourName.value.length > 3 && validateEmailRegex.test(email.value) && message.value.length > 3) {
    response.textContent = "Sending...";
    fetch("https://portfolio-server-rfy0.onrender.com/send", {
      method: "POST",
      body: JSON.stringify({
        name: yourName.value,
        email: email.value,
        subject: "from your portfolio tech",
        message: message.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => (response.textContent = "Thanks Email Sent"))
      .catch((err) => (response.textContent = "Connection Problem Please try again"));
    yourName.value = "";
    email.value = "";
    message.value = "";
  }
  setTimeout(() => {
    response.textContent = "";
  }, [8000]);
};

menu.onclick = () => {
  navbar.classList.toggle("active");
};
window.onscroll = () => {
  navbar.classList.remove("active");
};

// Dark Mode
let darkmode = document.querySelector("#darkmode");

darkmode.onclick = () => {
  if (darkmode.classList.contains("bx-moon")) {
    darkmode.classList.replace("bx-moon", "bx-sun");
    document.body.classList.add("active");
  } else {
    darkmode.classList.replace("bx-sun", "bx-moon");
    document.body.classList.remove("active");
  }
};

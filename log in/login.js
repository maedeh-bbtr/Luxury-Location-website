import { Authentication } from "../../utils/auth.js";

const logInForm = document.querySelector(".login");
const messagePreview = document.querySelector(".message");

logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = e.target.email;
  const passwordInput = e.target.password;
  console.log(emailInput, passwordInput);
  try {
    const user = new Authentication(
      emailInput.value.trim(),
      passwordInput.value.trim()
    );
    // console.log(user);
    const response = await user.signIn();
    console.log(response);

    if (response.statusCode === 404) {
      console.log("404 condition");
      messagePreview.textContent = "email or password incorrect";
      messagePreview.style.color = "crimson";
    }

    if (response.statusCode === 200) {
      console.log(response);
      window.location.replace("/product/product.html");
    }

    console.log(response);
  } catch (error) {
    // console.log(error);
    if (error.message === "passwordError" || error.message === "emailError") {
      messagePreview.textContent = "email or password incorrect";
      messagePreview.style.color = "crimson";
    }
  }
});

import { Authentication } from "../../utils/auth.js";

const signUpForm = document.querySelector(".signup");
const messagePreview = document.querySelector(".message");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = e.target.email;
  const passwordInput = e.target.password;
  const countryInput = e.target.country;
  console.log(emailInput, passwordInput, countryInput);
  try {
    const user = new Authentication(
      emailInput.value.trim(),
      passwordInput.value.trim(),
      countryInput.value.trim()
    );
    //   console.log(user);
    user.verifyData();
    const response = await user.signup();
    console.log(response);

    if (response.statusCode === 409) {
      messagePreview.textContent = response.message;
      messagePreview.style.color = "crimson";
    }

    if (response.statusCode === 201) {
      window.location.replace("/product/product.html");
    }
  } catch (error) {
    console.log(error.message);
    if (error.message === "passwordError") {
      messagePreview.textContent =
        "your password should be more that 5 character";
      messagePreview.style.color = "crimson";
    }
  }
});

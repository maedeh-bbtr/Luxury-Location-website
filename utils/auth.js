class Authentication {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  verifyData() {
    if (this.password.length < 5) {
      throw new Error("passwordError");
    }
  }

  async signup() {
    try {
      const getUser = await fetch(
        `https://65bba6e852189914b5bcc6b2.mockapi.io/api/user?email=${this.email}`
      );
      const user = await getUser.json();
      console.log(user);
      console.log(user.length);

      if (user !== "Not found") {
        return {
          statusCode: 409,
          message: "the email is already exists",
          data: "",
        };
      }

      const createUser = await fetch(
        "https://65bba6e852189914b5bcc6b2.mockapi.io/api/user",
        {
          method: "POST",
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            country: this.country,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await createUser.json();

      return { statusCode: 201, message: "signed up successfully", data };
    } catch (error) {
      console.log(error);
    }
  }

  async signIn() {
    const getUser = await fetch(
      `https://65bba6e852189914b5bcc6b2.mockapi.io/api/user?email=${this.email}`
    );
    const user = await getUser.json();
    console.log(user);
    if (user === "Not found") {
      console.log("email condition");
      return {
        statusCode: 404,
        message: "email or password is incorrect",
        data: "",
      };
    }

    if (user[0].password !== this.password) {
      return {
        statusCode: 404,
        message: "email or password is incorrect",
        data: "",
      };
    }

    return {
      statusCode: 200,
      message: "logged in successfully",
      data: user[0],
    };
  }
}

export { Authentication };

$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const volunteerInput = $("input#volunteer");
  const npoInput = $("input#npo");
  let role;
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    if (volunteerInput) {
      role = false;
    } else if (npoInput) {
      role = true;
    }
    console.log(role);
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      role: role
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.role);
    emailInput.val("");
    passwordInput.val("");
    role.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, role) {
    $.post("/api/signup", {
      email: email,
      password: password,
      role: role
    })
      .then(() => {
        window.location.replace("/profile");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

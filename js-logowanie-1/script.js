function loginUser() {
  document.user_form.action = "login.html";
  alert(document.user_form.action);
  return false;
}

function registerUser() {
  document.user_form.action = "register.html";
  alert(document.user_form.action);
  return false;
}

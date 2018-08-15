const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');


const nameErr = document.querySelector('#nameErr');
const emailErr = document.querySelector('#emailErr');
const passwordErr = document.querySelector('#passwordErr');
const confirmErr = document.querySelector('#confirmErr');
const adduser = document.querySelector('#adduser');



const displayErr = (errElem, errMsg) => {
    errElem.innerText = errMsg;
  }


const checkName = () => {
    if (name.value === "") {
        displayErr(nameErr, "Please enter a name");
    }
}

const checkEmail = () => {
    if (email.validity.typeMismatch) {
      displayErr(emailErr, "Please enter a valid email address");
    } else if (email.validity.valueMissing) {
      displayErr(emailErr, "Please enter an email address");
    } else {
      displayErr(emailErr, "");
      return true;
    }
  };

const checkPw = () => {
  if (password.validity.patternMismatch) {
    displayErr(
      passwordErr,
      "Password must contain at least eight characters, including one letter and one number"
    );
  } else if (password.validity.valueMissing) {
    displayErr(passwordErr, "Please enter a password");
  } else {
    displayErr(passwordErr, "");
    return true;
  }
};

const checkConfirmPw = () => {
  if (password.value != confirmPassword.value) {
    displayErr(confirmErr, "Passwords do not match");
  } else if (confirmPassword.validity.valueMissing) {
    displayErr(confirmErr, "Please confirm your password");
  } else {
    displayErr(confirmErr, "");
    return true;
  }
};

name.addEventListener('focusout', checkName);
email.addEventListener("focusout", checkEmail);
password.addEventListener("focusout", checkPw);
confirmPassword.addEventListener("focusout", checkConfirmPw);





adduser.addEventListener("click", e => {
//   if (!checkName()) {
//     e.preventDefault();
// }
// if (!checkEmail()) {
//     e.preventDefault();
//   }
//   if (!checkPw()) {
//     e.preventDefault();
//   }
//   if (!checkConfirmPw()) {
//     e.preventDefault();
//   }
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let user = {
    name: name,
    email: email,
    password: password
  };
  fetchdata("POST", "/signup", user, (err, res) => {
    console.log(res+"sssss")
    console.log('err ', err);

  if (err) {
      alert(err);
    } else {
      alert("sign up");
      window.location = '/';
    }
  });
});
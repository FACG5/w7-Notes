const email = document.querySelector('#email');
const passwor = document.querySelector('#password');
const emailErr = document.querySelector('#emailErr');




const displayErr = (errElem, errMsg) => {
    errElem.innerText = errMsg;
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



email.addEventListener("focusout", checkEmail);
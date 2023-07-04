import { toast } from "react-hot-toast";

function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}

function mobileVerify(error = {}, values) {
  if (!values.mobile) {
    error.mobile = toast.error("Mobile Number Required...!");
  } else if (values.mobile.length !== 10) {
    error.mobile = toast.error("Wrong Mobile Number ...!");
  } else if (!/^[0-9]{10}$/i.test(values.mobile)) {
    error.mobile = toast.error("Invalid Mobile Number...!");
  }

  return error;
}

function otpVerify(error = {}, values) {
  if (!values.otp) {
    error.otp = toast.error("OTP Required...!");
  } else if (values.otp.length !== 4) {
    error.otp = toast.error("Invalid OTP...!");
  } else if (!/^[0-9]{4}$/i.test(values.otp)) {
    error.otp = toast.error("Invalid Mobile Number...!");
  }

  return error;
}

function firstNameVerify(error = {}, values) {
  if (!values.firstName) {
    error.firstName = toast.error("First Name Required...!");
  } else if (!/^[A-Za-z]{1,10}$/i.test(values.firstName)) {
    error.firstName = toast.error("Invalid first name...!");
  }

  return error;
}

function lastNameVerify(error = {}, values) {
  if (!values.lastName) {
    error.lastName = toast.error("Last Name Required...!");
  } else if (!/^[A-Za-z]{1,10}$/i.test(values.lastName)) {
    error.lastName = toast.error("Invalid Last Name...!");
  }

  return error;
}

function passwordVerify(errors = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 6) {
    errors.password = toast.error(
      "Password must be more than 6 characters long"
    );
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password must have special character");
  }

  return errors;
}

function loginPasswordValidate(errors = {}, values) {
  if (!values.password) {
    errors.password = toast.error("Password Required...!");
  }
  return errors;
}

function feedabckVerify(error = {}, values) {
  if (!values.feedback) {
    error.feedback = toast.error("Feedback Required...!");
  }

  return error;
}

export async function registerValidation(values) {
  const errors = firstNameVerify({}, values);
  lastNameVerify(errors, values);
  mobileVerify(errors, values);
  emailVerify(errors, values);
  passwordVerify(errors, values);
  return errors;
}

export async function signInValidation(values) {
  const errors = emailVerify({}, values);
  loginPasswordValidate(errors, values);
  return errors;
}

export async function resetEmailValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

export async function resetOtpValidation(values) {
  const errors = otpVerify({}, values);
  return errors;
}

export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Password not match...!");
  }

  return errors;
}

export async function updateProfileValidation(values) {
  const errors = firstNameVerify({}, values);
  lastNameVerify(errors, values);
  mobileVerify(errors, values);

  return errors;
}

export async function feedbackValidation(values) {
  const errors = emailVerify({}, values);
  feedabckVerify(errors, values);
  return errors;
}

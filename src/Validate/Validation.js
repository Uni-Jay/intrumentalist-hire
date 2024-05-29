
const invalidEmail= (email) => {
  const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const weakPassword= (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/;
  return re.test(String(password));
}

export const validatePersonalDetails = (formData) => {
    let errors= {}
    if(!formData.fullname || formData.fullname.trim().length === 0){
      errors.fullname = "Fullname is required"
    } else if (!formData.fullname || formData.fullname.trim().length < 5){
      errors.fullname = "Minimum of 6 letters is required"
    }
  
    if (!formData.username || formData.username.trim().length === 0){
      errors.username = "Username is required"
    } else if (!formData.username || formData.username.trim().length < 4){
      errors.username = "Input atleast 5 letters"
    }
    return errors
}
export const validateEmailPassword = (formData) => {
  console.log("Form Step 2:", formData);
  
    let errors= {}
    if (!formData.phone_number || formData.phone_number.trim().length === 0){
      errors.phone_number = "Phonenumber is required"
    } else if (!formData.phone_number || formData.phone_number.trim().length < 9){
      errors.phone_number = "Please input correct phonenumber"
    }
    if (!formData.email || formData.email.trim().length === 0){
      errors.email = "Email is required"
    } else if (!invalidEmail(formData.email)){
      errors.email = "Invalid Email"
    }
    if (!formData.password || formData.password.trim().length === 0){
      errors.password = "Password is required"
    } else if (!weakPassword(formData.password)){
      errors.password= "Passowrd must include 1 num,capital,lowercase,special case, Min 8 character, Max 16 character"
    }
      return errors
}

export const validateLocation = (formData) => {
  console.log("Form Step 3:", formData);
  
  let errors= {}
  if (!formData.street_name || formData.street_name.trim().length === 0){
    errors.street_name = "Street Name is required"
  }
  if (!formData.street_number || formData.street_number.trim().length === 0){
    errors.street_number = "Street Number is required"
  }
  if (!formData.location || formData.location.trim().length === 0){
    errors.location = "Please input a Location"
  }
  return errors
}

export const validateUserDetails = (formData) => {
  console.log("Form Step 4:", formData);
  
  let errors= {}
  if (!formData.lga || formData.lga.trim().length === 0){
    errors.lga = "Please input a LGA"
  }
  if (!formData.state || formData.state.trim().length === 0){
    errors.state = "Please select a state"
  }
  if (!formData.city || formData.city.trim().length === 0){
    errors.city = "Please select a city"
  }
  return errors
}
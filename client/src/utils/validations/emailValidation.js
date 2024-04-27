const isEmailValid = (email) => {
    if (!email) {
        return false;
    }
    const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailLowercase = String(email.toLowerCase());

    return emailRegExp.test(emailLowercase);
}

const isPhoneNumberValid = (number) => {
    if (!number || number.length < 10) {
        return false;
    }
    let phoneNumberRegExp = /^\d{10}$/;
    return phoneNumberRegExp.test(number);
}

export {isEmailValid, isPhoneNumberValid};
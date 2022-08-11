function checkEmpty(value, selectorError, name) {
    if (value === " ") {
        document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống';
        return false;
    }
    document.querySelector(selectorError).innerHTML = " ";
    return true;
};

function checkLength(value, selectorError, name, minLength, maxLength) {
    if (value.length > maxLength || value.length < minLength) {
        document.querySelector(selectorError).innerHTML = name + " từ " + minLength + " đến " + maxLength + " ký tự !";
        return false;
    }
    document.querySelector(selectorError).innerHTML = " ";
    return true;
};

function checkLetter(value, selectorError, name) {
    var regex = /^[A-Z a-z]+$/;
    if (regex.test(value)) {
        document.querySelector(selectorError).innerHTML = " ";
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + " tất cả phải là ký tự !";
    return false;

}

function checkEmail(value, selectorError, name) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(value)) {
        document.querySelector(selectorError).innerHTML = " ";
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + " phải đúng định dạng! VD: abc@domain.com";
    return false;

}

function checkPassWord(value, selectorError, name) {
    //lower case:
    // var lowerCaseLetters = /[a-z]/g;
    // if (!lowerCaseLetters.test(value)) {
    //     document.querySelector(selectorError).innerHTML = name + "";
    //     return false;
    // }

    // var upperCaseLetters = /[A-Z]/g;
    // if (!upperCaseLetters.test(value)) {
    //     document.querySelector(selectorError).innerHTML = name + " phải có ít nhất 1 ký tự in hoa";
    //     return false;
    // }

    // var number = /[0-9]/;
    // if (!number.test(value)) {
    //     document.querySelector(selectorError).innerHTML = name + " phải có ít nhất 1 ký tự số!";
    //     return false;
    // }

    var regex = /^[a-z A-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g
    if (!regex.test(value)) {
        document.querySelector(selectorError).innerHTML = name + " phải có ít nhất 1 ký tự in hoa, 1 chữ số, 1 ký tự đặc biệt!";
        return false;
    }
    document.querySelector(selectorError).innerHTML = " ";
    return true;

}

function checkValue(value, selectorError, name, minValue, maxValue) {
    if (Number(value) < minValue || Number(value) > maxValue || value.trim() === " ") {
        document.querySelector(selectorError).innerHTML = name + ' từ ' + minLength + " đến " + maxLength + " !";
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}
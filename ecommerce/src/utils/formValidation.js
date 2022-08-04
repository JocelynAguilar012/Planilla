//validamos la longitud de los inputs-------------------------------
export function minLegthValidation(inputData, minLegth) {
    const { value } = inputData;
    removeClassErrorSuccess(inputData);
    if (value.length >= minLegth) {
        inputData.classList.add("success");
        return true;
    }
    else {
        inputData.classList.add("error");
        return false;
    }

}
//validamos la longitud de los inputs-------------------------------

//validamos correos de los inputs-------------------------------
export function emailValidation(inputData) {
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const { value } = inputData;
    removeClassErrorSuccess(inputData);
    
    const resultValidation = emailValid.test(value);
    if (resultValidation) {
        inputData.classList.add("success");
        return true;
        
    }
    else{
        inputData.classList.add("error");
        return false;
    }

}
//validamos correos de los inputs-------------------------------

//reseteamos la clase de los inputs-------------------------------
function removeClassErrorSuccess(inputData) {
    inputData.classList.remove("success");
    inputData.classList.remove("error");


}
//reseteamos la clase de los inputs-------------------------------

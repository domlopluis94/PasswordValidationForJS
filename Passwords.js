class PasswordController {

    ValidatePassword(oldpassword, newPassword) {
        (this.NotSimilar(oldpassword, newPassword) &&
            this.HasCapital(newPassword) &&
            this.HasLowerCase(newPassword) &&
            this.HasSpecialCharacter(newPassword) &&
            this.MinimunLength(newPassword)) ? true: false;
    }

    NotSimilar(oldpassword, newPassword) {
        return (newPassword != (oldpassword)) ? true : false;
    }

    HasLowerCase(newPassword) {
        return newPassword.toUpperCase() != newPassword;
    }

    HasCapital(newPassword) {
        return (/[A-Z]/.test(newPassword));
    }

    HasSpecialCharacter(newPassword) {
        return (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newPassword)) ? true : false;
    }

    HasDuplicates(newPassword) {
        return ((/([a-z])\1/i).test(newPassword)) ? true : false
    }

    CheckIfStringSequential(newPassword) {
        var numbers = "0123456789";
        //If reverse sequence is also needed to be checked
        var numbersRev = "9876543210";
        return numbers.indexOf(newPassword) === -1 && numbersRev.indexOf(newPassword) === -1;
    }

    MinimunLength(newPassword, passwordSize) {
        return (newPassword.length >= passwordSize) ? true : false;
    }

    extractContinousNumbers(text) {
        return text.match(/\d+/g);
    }

    CheckIfSequential(newPassword) {
        let numbers = this.extractContinousNumbers(newPassword);
        let result = false;
        if (numbers != null) {
            numbers.forEach(element => {
                if (!this.CheckIfStringSequential(element) && element.length > 1) {
                    result = true;
                }
            });
        }
        return result;
    }

    DynamicPasswordValidation(idOfNewPassword, idOfOldPassword) {
        let inputOfNewPassword = document.getElementById(idOfNewPassword);
        let inputOfoldPassword = document.getElementById(idOfOldPassword);
        document.getElementById(idOfNewPassword).addEventListener('input', () => {
            let result = this.DetectUnfulfilledProperties(inputOfoldPassword.value, inputOfNewPassword.value);
            console.log(result);
        });
    }

    DynamicPasswordValidationWithWarings(idOfNewPassword, idOfOldPassword, idOfwarning) {
        let inputOfNewPassword = document.getElementById(idOfNewPassword);
        let inputOfoldPassword = document.getElementById(idOfOldPassword);
        let warningElementId = document.getElementById(idOfwarning);
        document.getElementById(idOfNewPassword).addEventListener('input', () => {
            let result = this.DetectUnfulfilledProperties(inputOfoldPassword.value, inputOfNewPassword.value);
            warningElementId.innerText = this.UnfulfilledProperties(result);
        });
    }

    DynamicPasswordValidationWithWaringsAndSecondValidation(idOfNewPassword, idOfNewPasswordValidation, idOfOldPassword, idOfwarning, idOfSubmitButton) {
        let inputOfNewPassword = document.getElementById(idOfNewPassword);
        let inputOfoldPassword = document.getElementById(idOfOldPassword);
        let warningElementId = document.getElementById(idOfwarning);
        let inputOfNewPasswordValidation = document.getElementById(idOfNewPasswordValidation);
        let buttonOfSubmitButton = document.getElementById(idOfSubmitButton);
        buttonOfSubmitButton.style.display = 'none';
        inputOfNewPassword.addEventListener('input', () => {
            let result = this.DetectUnfulfilledProperties(inputOfoldPassword.value, inputOfNewPassword.value);
            warningElementId.innerText = this.UnfulfilledProperties(result);
            warningElementId.innerText += (inputOfNewPasswordValidation.value != inputOfNewPassword.value) ? "Las Contraseñas tienen que coincidir " : ""
            if (this.UnfulfilledProperties(result) == "" && inputOfNewPasswordValidation.value == inputOfNewPassword.value) {
                buttonOfSubmitButton.style.display = 'block';
            } else {
                buttonOfSubmitButton.style.display = 'none';
            }
        });
        inputOfNewPasswordValidation.addEventListener('input', () => {
            let result = this.DetectUnfulfilledProperties(inputOfoldPassword.value, inputOfNewPassword.value);
            warningElementId.innerText = this.UnfulfilledProperties(result);
            warningElementId.innerText += (inputOfNewPasswordValidation.value != inputOfNewPassword.value) ? "Las Contraseñas tienen que coincidir " : ""
            if (this.UnfulfilledProperties(result) == "" && inputOfNewPasswordValidation.value == inputOfNewPassword.value) {
                buttonOfSubmitButton.style.display = 'block';
            } else {
                buttonOfSubmitButton.style.display = 'none';
            }
        });
    }

    UnfulfilledProperties(result) {
        let isNotEqualsToOldPassword = (result.isNotEqualsToOldPassword) ? "" : "La contraseña Actual no puede ser igual a la antigua \n";
        let hasLowerCase = (result.hasLowerCase) ? "" : "Falta una minúscula \n";
        let hasCapital = (result.hasCapital) ? "" : "Falta una mayúscula \n";
        let hasSpecialCharacter = (result.hasSpecialCharacter) ? "" : "Falta un caracter especial \n";
        let hasDuplicates = (result.hasDuplicates) ? "No puede contener caracteres duplicados contiguos \n" : "";
        let checkIfSequential = (result.checkIfSequential) ? "No puede contener secuencias de números \n" : "";
        let hasMinimunLength = (result.hasMinimunLength) ? "" : "No contiene el mínimo de 8 caracteres \n";
        return `${isNotEqualsToOldPassword}${hasLowerCase}${hasCapital}${hasSpecialCharacter}${hasDuplicates}${checkIfSequential}${hasMinimunLength}`;
    }

    DetectUnfulfilledProperties(oldpassword, newPassword) {
        return {
            isNotEqualsToOldPassword: this.NotSimilar(oldpassword, newPassword),
            hasLowerCase: this.HasLowerCase(newPassword),
            hasCapital: this.HasCapital(newPassword),
            hasSpecialCharacter: this.HasSpecialCharacter(newPassword),
            hasMinimunLength: this.MinimunLength(newPassword, 8),
            hasDuplicates: this.HasDuplicates(newPassword),
            checkIfSequential: this.CheckIfSequential(newPassword)
        }
    }
}

var passwordController = new PasswordController();
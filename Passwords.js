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

    CheckIfSequential(newPassword) {
        var newNum = newPassword + ''
        newNum = newNum.split('');
        return newNum.every((newPassword, i) => i === newNum.length - 1 || newPassword < newNum[i + 1]);
    }

    MinimunLength(newPassword, passwordSize) {
        return (newPassword.length >= passwordSize) ? true : false;
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

    UnfulfilledProperties(result) {
        let isNotEqualsToOldPassword = (result.isNotEqualsToOldPassword) ? "" : "La contraseña Actual no puede ser igual a la antigua \n";
        let hasLowerCase = (result.hasLowerCase) ? "" : "Falta una minúscula \n";
        let hasCapital = (result.hasCapital) ? "" : "Falta una mayúscula \n";
        let hasSpecialCharacter = (result.hasSpecialCharacter) ? "" : "Falta un caracter especial \n";
        let hasDuplicates = (result.hasDuplicates) ? "No puede contener caracteres duplicados contiguos \n" : "";
        let checkIfSequential = (result.checkIfSequential) ? "No puede contener secuencias de números \n" : "";
        let hasMinimunLength = (result.hasMinimunLength) ? "" : "No contiene el mínimo de 8 caracteres";
        return `${isNotEqualsToOldPassword} ${hasLowerCase} ${hasCapital} ${hasSpecialCharacter} ${hasDuplicates} ${checkIfSequential} ${hasMinimunLength} `;
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
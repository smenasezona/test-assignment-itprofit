document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedback-form')
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        if (validateForm()) {
            const event = new Event('formValid')
            form.dispatchEvent(event)
        }
    })

    function validateForm() {
        let isValid = true;
        const inputs = document.querySelectorAll('.input-item, .textarea')
        inputs.forEach(input => {
            if (!input.value) {
                showError(input, 'Это поле обязательно для заполнения')
                isValid = false;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                showError(input, 'Введите корректный адрес электронной почты')
                isValid = false;
            } else {
                clearError(input)
            }
        })
        return isValid;
    }

    function showError(input, message) {
        if (input.nextSibling && input.nextSibling.className === 'error-message') {
            return
        }
        const errorElement = document.createElement('div')
        errorElement.className = 'error-message'
        errorElement.textContent = message
        input.classList.add('error')
        input.parentElement.insertBefore(errorElement, input.nextSibling)
    }

    function clearError(input) {
        input.classList.remove('error')
        if (input.nextSibling) {
            input.nextSibling.remove()
        }
    }

    function validateEmail(email) {
        if (!email) {
            return false;
        }
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }
})

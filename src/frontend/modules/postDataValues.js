document.getElementById("feedback-form").addEventListener("formValid", () => {

    const DATA = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        tel: document.getElementById("tel").value,
        message: document.getElementById("message").value,
    }

    const POST_SERVER_URL = 'http://localhost:9090/api/registration'

    async function postData() {
        try {
            const response = await fetch(POST_SERVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(DATA)
            })

            const result = await response.json()
            console.log(result)

            if (result.status === "success") {
                document.getElementById("feedback-form").reset()
                document.getElementById("feedback-form").innerHTML = `<p class="response-msg">${result.message}</p>`
            } else if (result.status === "error") {
                document.getElementById("feedback-form").innerHTML = `<p class="response-msg">${result.message}</p>`
            }

        } catch (error) {
            console.error('Ошибка: ', error)
        }
    }

    postData()
})
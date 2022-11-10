import { getLocalStorage } from "./localStorage.js"
import { createUser } from "./requests.js"


function verificRegister(){
    const localStorage = getLocalStorage()
    if (localStorage != ""){
        window.location.replace('../../index.html')
    }
}

verificRegister()

const eventRegister = async () => {
    const inputUsername = document.querySelector("#username");
    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");
    const inputAvatar = document.querySelector("#avatar");
    const registerButton = document.querySelector("#registerButton");
    const form = document.querySelector(".form-register")

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {
            name: inputUsername.value,
            email: inputEmail.value,
            password: inputPassword.value,
            avatar_url: inputAvatar.value
        }
        await createUser(body)
        form.reset()
    })
}
eventRegister();


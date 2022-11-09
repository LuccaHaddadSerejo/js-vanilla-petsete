import {login} from "./requests.js"

function eventLogin(){
const form = document.querySelector("#form")
const spreadForm = [...form]
const buutonLogin= document.querySelector('#login-button')
form.addEventListener("submit", async(event)=>{
    event.preventDefault()
    const object = getValues(spreadForm)
    login(object)
})
}
eventLogin()

function getValues(formElements) {
    const object = {}

    formElements.forEach(element => {
        if (element.name && element.value) {
            object[element.id] = element.value
            
        }
    })
    return object
}



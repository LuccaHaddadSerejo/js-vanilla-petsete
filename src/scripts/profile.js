import { getLocalStorage } from "./localStorage.js"
import { createPet, deletePetById, deleteProfile, readAllMyPets, readProfile, updatePetById, updateProfile } from "./requests.js"

const verifyPermission = () => {
    const user = getLocalStorage()
    if(user == ""){
        window.location.replace('../../index.html')
    }
}

verifyPermission()

const redirect = () => {
   const btnHome = document.querySelector('#homeBtn')

   const btnLogout = document.querySelector('#logoutBtn')

   btnHome.addEventListener('click', ()=>{
    window.location.replace('../../index.html')
   })

   btnLogout.addEventListener('click', ()=>{
    localStorage.removeItem('token-user')
    window.location.replace('../../index.html')
   })
}

redirect()

const readUserData = async () => {
    const user = await readProfile()

    const image = document.querySelector('.user-img')
    image.src = user.avatar_url

    const name = document.querySelector('#userName')
    name.innerText = `Nome: ${user.name}`
    
    const email = document.querySelector('#userEmail')
    email.innerText = `Email: ${user.email}`
}

readUserData()

const editUserData = async () => {
    const user = await readProfile()
    const main = document.querySelector('.profile-main')
    const buttonEdit = document.querySelector('#editInfoButton')
    buttonEdit.addEventListener('click', ()=>{
        const wrapper = document.createElement('div')
        wrapper.classList = 'modal-wrapper'

        const container = document.createElement('div')
        container.classList = 'modal-container'

        const backgroundColorOne = document.createElement('div')
        backgroundColorOne.classList = 'modal-background'

        const closeButton = document.createElement('button')
        closeButton.classList = 'modal-close'
        closeButton.innerText = 'X'
   
        const content = document.createElement('div')
        content.classList = 'modal-content'

        const head = document.createElement('div')
        head.classList = 'modal-header'

        const title = document.createElement('h2')
        title.classList = 'modal-title'
        title.innerText = 'Atualizar perfil'

        const form = document.createElement('form')
        form.classList = 'modal-form'

        const inputOne = document.createElement('input')
        inputOne.classList = 'modal-input'
        inputOne.value = user.name
        inputOne.id = 'name'

        const inputTwo = document.createElement('input')
        inputTwo.classList = 'modal-input'
        inputTwo.value = user.avatar_url
        inputTwo.id = 'avatar_url'
        
        const formButton = document.createElement('button')
        formButton.classList = 'pointer button-purple modal-button'
        formButton.innerText = 'Atualizar'

        const backgroundColorTwo = document.createElement('div') 
        backgroundColorTwo.classList = 'modal-background'
        backgroundColorTwo.id = 'backgroundTwo'


        closeButton.addEventListener('click', ()=>{
            wrapper.remove()
        })

        form.addEventListener('submit', async(event)=>{
            event.preventDefault()
            const elements = [...form.elements]
            const body = {}
            elements.forEach(elt =>{
                if(elt.tagName == "INPUT"){
                    body[elt.id] = elt.value
                }
            })
            await updateProfile(body)
            readUserData()
            wrapper.remove()
        })

        head.append(title)
        form.append(inputOne, inputTwo, formButton)
        content.append(head, form)
        backgroundColorOne.append(closeButton)
        container.append(backgroundColorOne, content, backgroundColorTwo)
        wrapper.append(container)
        main.append(wrapper)
    })

    const buttonDelete = document.querySelector('#deleteAccountButton')
    buttonDelete.addEventListener('click', ()=>{
        const wrapper = document.createElement('div')
        wrapper.classList = 'modal-wrapper'

        const container = document.createElement('div')
        container.classList = 'modal-container'

        const backgroundColorOne = document.createElement('div')
        backgroundColorOne.classList = 'modal-background'

        const closeButton = document.createElement('button')
        closeButton.classList = 'modal-close'
        closeButton.innerText = 'X'
   
        const content = document.createElement('div')
        content.classList = 'modal-content'

        const head = document.createElement('div')
        head.classList = 'modal-header'

        const title = document.createElement('h2')
        title.classList = 'modal-title'
        title.innerText = 'Deseja mesmo deletar sua conta?'

        const divButtons = document.createElement('div')
        divButtons.classList = 'modal-div-buttons'

        const buttonCancel = document.createElement('button')
        buttonCancel.classList = 'pointer button-purple modal-button'
        buttonCancel.innerText = 'Não desejo deletar minha conta'

        const buttonConfirm = document.createElement('button')
        buttonConfirm.classList = 'pointer button-red-delete modal-button'
        buttonConfirm.innerText = 'Quero deletar minha conta'

        const backgroundColorTwo = document.createElement('div') 
        backgroundColorTwo.classList = 'modal-background'
        backgroundColorTwo.id = 'backgroundTwo'


        closeButton.addEventListener('click', ()=>{
            wrapper.remove()
        })

        buttonCancel.addEventListener('click', ()=>{
            wrapper.remove()
        })

        buttonConfirm.addEventListener('click', async ()=>{
            await deleteProfile()
            localStorage.removeItem('token-user')
            wrapper.remove()
            window.location.replace('../../index.html')
        })

        head.append(title) 
        divButtons.append(buttonCancel, buttonConfirm)
        content.append(head, divButtons)
        backgroundColorOne.append(closeButton)
        container.append(backgroundColorOne, content, backgroundColorTwo)
        wrapper.append(container)
        main.append(wrapper)
    })
}

editUserData()

const registerPet = () => {
    const main = document.querySelector('.profile-main')
    const registerButton = document.querySelector('#newPetButton')
    const fullUl = document.querySelector('#ulFull')
    registerButton.addEventListener('click', (event)=>{
        event.preventDefault()
        const wrapper = document.createElement('div')
        wrapper.classList = 'modal-wrapper'

        const container = document.createElement('div')
        container.classList = 'modal-container'

        const backgroundColorOne = document.createElement('div')
        backgroundColorOne.classList = 'modal-background'

        const closeButton = document.createElement('button')
        closeButton.classList = 'modal-close'
        closeButton.innerText = 'X'
   

        const content = document.createElement('div')
        content.classList = 'modal-content'

        const head = document.createElement('div')
        head.classList = 'modal-header'

        const title = document.createElement('h2')
        title.classList = 'modal-title'
        title.innerText = 'Cadastrar pet'

        const form = document.createElement('form')
        form.classList = 'modal-form'

        const inputOne = document.createElement('input')
        inputOne.classList = 'modal-input'
        inputOne.placeholder = 'Nome'
        inputOne.id = 'name'

        const inputTwo = document.createElement('input')
        inputTwo.classList = 'modal-input'
        inputTwo.placeholder = 'Raça'
        inputTwo.id = 'bread'

        const inputThree = document.createElement('input')
        inputThree.classList = 'modal-input'
        inputThree.placeholder = 'Espécie'
        inputThree.id = 'species'

        const inputFour = document.createElement('input')
        inputFour.classList = 'modal-input'
        inputFour.placeholder = 'Avatar'
        inputFour.id = 'avatar_url'
        
        const formButton = document.createElement('button')
        formButton.classList = 'pointer button-purple modal-button'
        formButton.innerText = 'Cadastrar'

        const backgroundColorTwo = document.createElement('div') 
        backgroundColorTwo.classList = 'modal-background'
        backgroundColorTwo.id = 'backgroundTwo'


        closeButton.addEventListener('click', ()=>{
            wrapper.remove()
        })

        form.addEventListener('submit', async(event)=>{
            event.preventDefault()
            const elements = [...form.elements]
            const body = {}
            elements.forEach(elt =>{
                if(elt.tagName == "INPUT"){
                    body[elt.id] = elt.value
                }
            })
            fullUl.innerHTML = ''
            await createPet(body)
            await renderPetList()
            wrapper.remove()
        })

        head.append(title)
        form.append(inputOne, inputTwo, inputThree, inputFour, formButton)
        content.append(head, form)
        backgroundColorOne.append(closeButton)
        container.append(backgroundColorOne, content, backgroundColorTwo)
        wrapper.append(container)
        main.append(wrapper)
    })
}

registerPet()


const renderPetList = async () => {
    const main = document.querySelector('.profile-main')
    const petList = await readAllMyPets()
    const fullUl = document.querySelector('#ulFull')
    petList.forEach(pet => {
        const li = document.createElement('li')
        li.classList = 'card-full flex'

        const liContainerImg = document.createElement('div')
        liContainerImg.classList = 'card-img-container'
        

        const liImg = document.createElement('img')
        liImg.classList = 'pet-img'
        liImg.src = pet.avatar_url

        const liDescription= document.createElement('div')
        liDescription.classList = 'card-description flex flex-col'

        const liName = document.createElement('p')
        liName.classList = 'data-paragraph'
        liName.innerText = `Nome: ${pet.name}`

        const liBread = document.createElement('p')
        liBread.classList = 'data-paragraph'
        liBread.innerText = `Raça: ${pet.bread}`

        const liSpecies = document.createElement('p')
        liSpecies.classList = 'data-paragraph'
        liSpecies.innerText = `Espécie: ${pet.species}`

        const buttonEdit = document.createElement('button')
        buttonEdit.classList = 'button-purple adopt-button pointer'
        buttonEdit.innerText = 'Atualizar'

        const buttonAdopt = document.createElement('button')
        buttonAdopt.classList = 'button-red-delete adopt-button pointer'
        buttonAdopt.innerText = 'Deletar pet'

        const liAdoptable = document.createElement('p')
        liAdoptable.classList = 'data-paragraph'

        if(pet.available_for_adoption == true){
            liAdoptable.innerText = 'Adotável: Sim'
        }else{
            liAdoptable.innerText = 'Adotável: Não'
        }

        buttonEdit.addEventListener('click', ()=>{
            const wrapper = document.createElement('div')
            wrapper.classList = 'modal-wrapper'
    
            const container = document.createElement('div')
            container.classList = 'modal-container'
    
            const backgroundColorOne = document.createElement('div')
            backgroundColorOne.classList = 'modal-background'
    
            const closeButton = document.createElement('button')
            closeButton.classList = 'modal-close'
            closeButton.innerText = 'X'
       
            const content = document.createElement('div')
            content.classList = 'modal-content'
    
            const head = document.createElement('div')
            head.classList = 'modal-header'
    
            const title = document.createElement('h2')
            title.classList = 'modal-title'
            title.innerText = 'Atualizar pet'
    
            const form = document.createElement('form')
            form.classList = 'modal-form'
    
            const inputOne = document.createElement('input')
            inputOne.classList = 'modal-input'
            inputOne.value = pet.name
            inputOne.id = 'name'
    
            const inputTwo = document.createElement('input')
            inputTwo.classList = 'modal-input'
            inputTwo.value = pet.bread
            inputTwo.id = 'bread'
    
            const inputThree = document.createElement('input')
            inputThree.classList = 'modal-input'
            inputThree.value = pet.species
            inputThree.id = 'species'
    
            const inputFour = document.createElement('input')
            inputFour.classList = 'modal-input'
            inputFour.value = pet.avatar_url
            inputFour.id = 'avatar_url'
            
            const formButton = document.createElement('button')
            formButton.classList = 'pointer button-purple modal-button'
            formButton.innerText = 'Atualizar'
    
            const backgroundColorTwo = document.createElement('div') 
            backgroundColorTwo.classList = 'modal-background'
            backgroundColorTwo.id = 'backgroundTwo'
    
    
            closeButton.addEventListener('click', ()=>{
                wrapper.remove()
            })
    
            form.addEventListener('submit', async(event)=>{
                event.preventDefault()
                fullUl.innerHTML = ''
                const elements = [...form.elements]
                const body = {}
                elements.forEach(elt =>{
                    if(elt.tagName == "INPUT"){
                        body[elt.id] = elt.value
                    }
                })
                await updatePetById(body, pet.id)
                await renderPetList()
                wrapper.remove()
            })

            head.append(title)
            form.append(inputOne, inputTwo, inputThree, inputFour, formButton)
            content.append(head, form)
            backgroundColorOne.append(closeButton)
            container.append(backgroundColorOne, content, backgroundColorTwo)
            wrapper.append(container)
            main.append(wrapper)
        })

        buttonAdopt.addEventListener('click', ()=>{
            const wrapper = document.createElement('div')
            wrapper.classList = 'modal-wrapper'
    
            const container = document.createElement('div')
            container.classList = 'modal-container'
    
            const backgroundColorOne = document.createElement('div')
            backgroundColorOne.classList = 'modal-background'
    
            const closeButton = document.createElement('button')
            closeButton.classList = 'modal-close'
            closeButton.innerText = 'X'
       
            const content = document.createElement('div')
            content.classList = 'modal-content'
    
            const head = document.createElement('div')
            head.classList = 'modal-header'
    
            const title = document.createElement('h2')
            title.classList = 'modal-title'
            title.innerText = 'Deseja mesmo deletar sua conta?'
    
            const divButtons = document.createElement('div')
            divButtons.classList = 'modal-div-buttons'
    
            const buttonCancel = document.createElement('button')
            buttonCancel.classList = 'pointer button-purple modal-button'
            buttonCancel.innerText = 'Não desejo deletar meu pet'
    
            const buttonConfirm = document.createElement('button')
            buttonConfirm.classList = 'pointer button-red-delete modal-button'
            buttonConfirm.innerText = 'Quero deletar meu pet'
    
            const backgroundColorTwo = document.createElement('div') 
            backgroundColorTwo.classList = 'modal-background'
            backgroundColorTwo.id = 'backgroundTwo'
    
    
            closeButton.addEventListener('click', ()=>{
                wrapper.remove()
            })
    
            buttonCancel.addEventListener('click', ()=>{
                wrapper.remove()
            })
    
            buttonConfirm.addEventListener('click', async (event)=>{
                event.preventDefault()
                await deletePetById(pet.id)
                fullUl.innerHTML = ''
                renderPetList()
                wrapper.remove()
            })
    
            head.append(title) 
            divButtons.append(buttonCancel, buttonConfirm)
            content.append(head, divButtons)
            backgroundColorOne.append(closeButton)
            container.append(backgroundColorOne, content, backgroundColorTwo)
            wrapper.append(container)
            main.append(wrapper)
        })
        
        liDescription.append(liName, liBread, liSpecies, liAdoptable, buttonEdit, buttonAdopt)
        liContainerImg.append(liImg)
        li.append(liContainerImg, liDescription)
        fullUl.append(li)
    })
}

renderPetList()
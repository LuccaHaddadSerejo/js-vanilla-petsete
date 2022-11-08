import { readAllPets, readProfile } from"./requests.js"
import { getLocalStorage, clearStorage } from "./localStorage.js"

const profileAvatar = async () => {
    const token = getLocalStorage()
    const profileAvatar = document.querySelector('#profile_avatar')
    const profileAvatarBox = document.querySelector('#profile_avatar_box')
    const { avatar_url } = await readProfile()
    if (token.token) {
        profileAvatar.src = avatar_url
        profileAvatarBox.classList = 'profile-avatar'
    }
}
profileAvatar()

const changeButtonsHeader = () => {
  const token = getLocalStorage()
  const button = document.querySelector('#register')
  if (token.token) {
    button.innerText = 'Perfil'
    button.addEventListener('click', (e) => {
        e.preventDefault()
        window.location.replace('./src/pages/profile.html')
    })
  } else {
    button.innerText = 'Register'
    button.addEventListener('click', (e) => {
        e.preventDefault()
        window.location.replace('./src/pages/register.html')
    })
  }
}
changeButtonsHeader()

const buttonLogout = () => {
    const token = getLocalStorage()
  const button = document.querySelector('#login')
  if (token.token) {
    button.innerText = 'Logout'
    button.addEventListener('click', (e) => {
        clearStorage()
        window.location.replace('./src/pages/login.html')
    })
  } else {
    button.innerText = 'Login'
    button.addEventListener('click', (e) => {
        e.preventDefault()
        window.location.replace('./src/pages/login.html')
    })
  }
}
buttonLogout()

const renderCardsHome = async (species) => {
    const cardList = document.querySelector('#card_list')
    cardList.innerHTML = ''
    let list = await readAllPets()
    if (species != 'Espécies') {
        list = list.filter(element => element.species === species && element.available_for_adoption === true)
    }

    if (list.length <= 0) {
        cardList.insertAdjacentHTML('beforeend', "<p>infelizmente não temos nenhum pet desta espécie disponivel</p>")
    } else {
        list.forEach(async (element) => {
            const { available_for_adoption } = element
            if (available_for_adoption) {
            const card = await cardCreatorHome(element)
            cardList.appendChild(card)
            }
        }); 
    }
    

}

renderCardsHome('Espécies')

const cardCreatorHome = async (element) => {
    const token = getLocalStorage()
    const {id, name, species, available_for_adoption, avatar_url} = element
    
        const card = document.createElement('li')
        card.classList = 'card-home flex flex-col gap18'
        const avatar = document.createElement('img')
        avatar.src = avatar_url
        avatar.alt = name
        const petName = document.createElement('p')
        petName.innerText = name.substring(0, 10)
        const specie = document.createElement('span')
        specie.innerText = species

        if (token.token) {

            const button = document.createElement('button')
            button.classList = 'button-primary'
            button.innerText = 'Me Adota?'
            card.append(avatar, petName, specie, button)

            button.addEventListener('click', (e) => {
                e.preventDefault()
                console.log('chamar modal para adoção');
            })
        } else {
            card.append(avatar, petName, specie)
        }
        return card
    
}

const specieSelector = async () => {
    const list = await readAllPets()
    const speciesList  = [...new Set (list.map(elt => elt.species))]
    
    const select = document.querySelector('#select_home')
    const option = document.createElement('option')
    select.appendChild(option)
    option.innerText = 'Selecionar por Espécies'
    option.value = 'Espécies'
    speciesList.forEach(element => {
        const option = document.createElement('option')
        option.innerText = element
        option.value = element
        select.appendChild(option)
    });
    
    select.addEventListener('change', (e) => {
        e.preventDefault()
        renderCardsHome(select.value)
    })

}
specieSelector()
import {toast} from "./toast.js"
const baseUrl = 'https://m2-api-adot-pet.herokuapp.com'

import { getLocalStorage, setLocalStorage } from "./localStorage.js"

const login = async (body) => {
    try {
        const request = await fetch(baseUrl + '/session/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        if(res.token){
            setLocalStorage(res)
            toast("Sucesso!","Login feito com sucesso")
            setTimeout(() => {
                window.location.replace("../../index.html")
            }, 4000);

        }else{
            setLocalStorage(res)
            toast("Erro!","Senha ou email inválidos")
            
        }
        
        return res


    } catch (error) {
        console.log(error);
    }
}

const createUser = async (body) => {
    try {
        const request = await fetch(baseUrl + '/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        if (request.ok) {
                window.location.replace("../pages/login.html")
        }
        
        return res
    } catch (error) {
        console.log(error);
    }
}

const readAll = async () => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const readProfile = async () => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/users/profile', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const updateProfile = async (body) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/users/profile', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const deleteProfile = async () => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/users/profile', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },

        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const createPet = async (body) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/pets', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const readAllPets = async () => {
    try {
        const request = await fetch(baseUrl + '/pets', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const readAllMyPets = async () => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/pets/my_pets', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const updatePetById = async (body, petId) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + `/pets/${petId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const deletePetById = async (petId) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + `/pets/${petId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },

        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const createAdoption = async (body) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/adoptions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const readAllMyAdoptions = async () => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/adoptions', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const readAdoptionById = async (adoptionId) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + `/adoptions/${adoptionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const readmyAdoption = async () => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + '/adoptions/myAdoptions', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const updateAdoptionById = async (body, adoptionId) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + `/adoptions/update/${adoptionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
            body: JSON.stringify(body)
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

const deleteAdoptionById = async (adoptionId) => {
    const token = getLocalStorage()
    try {
        const request = await fetch(baseUrl + `/adoptions/delete/${adoptionId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`,
            },
        })
        const res = await request.json()
        return res
    } catch (error) {
        console.log(error);
    }
}

export {
    login,
    createUser,
    readAll,
    readProfile,
    updateProfile,
    deleteProfile,
    createPet,
    readAllPets,
    readAllMyPets,
    updatePetById,
    deletePetById,
    createAdoption,
    readAllMyAdoptions,
    readAdoptionById,
    readmyAdoption,
    updateAdoptionById,
    deleteAdoptionById
}


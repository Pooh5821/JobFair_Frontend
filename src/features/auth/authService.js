import axios from 'axios'

const API_URL='http://localhost:3000/api/v1/auth/'

const login = async (userData) => {
    try {
        const response = await axios.post(API_URL+'login',userData)
        if(response.data) {
            localStorage.setItem('token',response.data.token)
            console.log(response.data.name)
            console.log(response.data.token)
        }
        return response.data.token
    } catch(error) {
        console.log('authService: login')
        console.log(error);
    }
}
const logout = () => {
    localStorage.setItem('token',null)
}
const authService ={
    login, logout
}

export default authService;
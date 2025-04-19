import axios from 'axios'

const API_URL='http://localhost:3000/api/v1/auth/'

const login = async (userData) => {
    try {
        const response = await axios.post(API_URL+'login',userData)
        if(response.data) {
            localStorage.setItem('user',response.data.name)
        }
        return response.data.name
    } catch(error) {
        console.log('authService: login')
        console.log(error);
    }
}
const logout = () => {
    localStorage.setItem('user',null)
}
const authService ={
    login, logout
}

export default authService;
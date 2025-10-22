import apiClient from './config/apiClient'

const loginService = (data) => {
    return apiClient.post('/auth/signin', data)
}

const authServices = {
    loginService,
}

export default authServices

import axios from 'axios'
import useAuthStore from '../../store/useAuthStore'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.request.use(
    (request) => {
        const token = useAuthStore.getState().token

        if (token) {
            request.headers['Authorization'] = `Bearer ${token}`
        }

        return request
    },
    (error) => {
        return Promise.reject(error)
    },
)

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            const refreshToken = useAuthStore.getState().refreshToken

            if (refreshToken) {
                try {
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_URL}/auth/refreshToken`,
                        {
                            refreshToken,
                        },
                    )
                    const { token: newToken, refreshToken: newRefreshToken } = response.data

                    useAuthStore.getState().setTokens(newToken, newRefreshToken)

                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                    return apiClient(originalRequest)
                } catch (error) {
                    useAuthStore.getState().logout()
                    return Promise.reject(error)
                }
            }

            useAuthStore.getState().logout()
            return Promise.reject(error)
        }
    },
)

export default apiClient

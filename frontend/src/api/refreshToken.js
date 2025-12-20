import axios from 'axios'

export async function refreshToken() {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/refresh`,
        { withCredentials: true }
    )
    
    return response
}
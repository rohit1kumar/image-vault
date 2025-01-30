import axios from 'axios'

export const baseURL = import.meta.env.VITE_API_URL
const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export const uploadFile = async (file) => {
	const formData = new FormData()
	formData.append('file', file)
	const { data } = await api.post('/media/upload', formData)
	return data
}

export const getFiles = async ({ page = 1, fileType = '', pageSize = 9 }) => {
	const params = new URLSearchParams({ page, pageSize })
	if (fileType) params.append('fileType', fileType)
	const { data } = await api.get(`/media?${params}`)
	return data
}

export const getProfile = async () => {
	const { data } = await api.get('/auth/profile')
	return data
}

export const logout = () => {
	localStorage.removeItem('token')
	return Promise.resolve()
}

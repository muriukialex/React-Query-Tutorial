import { useQuery } from 'react-query'
import { client } from './main'
import { useMutation } from 'react-query'
import axios from 'axios'

export const endpoint = 'http://localhost:3000/posts'
const fetcher = async () => {
	const response = await fetch(endpoint)
	const result = await response.json()
	return result
}

export const usePosts = () => {
	const { isLoading, error, data } = useQuery(['posts'], fetcher)
	const mutation = useMutation({
		mutationFn: data => {
			return axios.post(endpoint, data)
		},
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['posts'] })
		},
	})
	return {
		isLoading,
		error,
		data,
		mutation,
	}
}

export const useDeletePost = () => {
	const mutation = useMutation({
		mutationFn: id => {
			return axios.delete(endpoint + '/' + id)
		},
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['posts'] })
		},
	})
	return {
		mutation,
	}
}

export const useUpdatePost = () => {
	const mutation = useMutation({
		mutationFn: ({ id, payload }) => {
			return axios.put(endpoint + '/' + id, payload)
		},
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['posts'] })
		},
	})
	return {
		mutation,
	}
}

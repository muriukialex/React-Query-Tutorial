import './App.css'
import { useState } from 'react'
import { usePosts, endpoint, useDeletePost, useUpdatePost } from './usePosts'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

const App = () => {
	const [hasTouched, setHasTouched] = useState(false)
	const [editValue, setEditValue] = useState({})
	const { isLoading, error, data, mutation } = usePosts()
	const { mutation: deleteMutation } = useDeletePost()
	const { mutation: updateMutation } = useUpdatePost()
	const { register, handleSubmit } = useForm()

	const notify = message => toast.success(message)

	const handleEditChange = e => {
		setEditValue(prev => ({
			...prev,
			value: e.target.value,
		}))
	}

	const handleClickEdit = id => {
		setHasTouched(true)
		data?.find(
			post =>
				post.id === id &&
				setEditValue(prev => ({
					...prev,
					id: post.id,
					value: post.title,
				})),
		)
	}

	const handleUpdatePost = (id, newPost) => {
		const payload = { title: newPost }
		setHasTouched(!hasTouched)
		updateMutation.mutate({ id, payload })
		notify('Successfully EDITED post!')
	}

	const handleDeletePost = id => {
		deleteMutation.mutate(id)
		notify('Successfully DELETED post!')
	}
	const handlePostSubmit = data => {
		mutation.mutate(data)
		notify('Successfully ADDED post!')
	}

	const Form = () => {
		return (
			<form onSubmit={handleSubmit(handlePostSubmit)}>
				<div>
					<label htmlFor='title'>Enter a post title: </label>
					<input type='text' {...register('title')} />
				</div>
				<div>
					<input type='submit' value='submit' />
				</div>
			</form>
		)
	}
	return (
		<div className='App'>
			<Toaster />
			<h1>React query tutorial</h1>
			<Form />

			{hasTouched && (
				<div className='editField'>
					<input type='text' value={editValue.value} onChange={e => handleEditChange(e)} />
					<button onClick={() => handleUpdatePost(editValue.id, editValue.value)}>Update</button>
				</div>
			)}
			{isLoading && <h2>posts are loading...</h2>}
			{error && <h2>There was an error loading posts!</h2>}
			<ul>
				{data?.map(post => (
					<li key={post.id}>
						<span>{post.title}</span>
						{}
						<br />
						<button onClick={() => handleClickEdit(post.id)}>Edit Me</button>{' '}
						<button onClick={() => handleDeletePost(post.id)}>Delete Me</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default App

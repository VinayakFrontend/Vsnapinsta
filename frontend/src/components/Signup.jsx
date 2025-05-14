import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { useSelector } from 'react-redux'

const Signup = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const signupHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(
        'http://192.168.0.104:5000/api/v1/user/register',
        input,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      if (res.data.success) {
        navigate('/login')
        toast.success(res.data.message)
        setInput({ username: '', email: '', password: '' })
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 px-4 py-6'>
      <div className='w-full max-w-sm border border-gray-200 bg-white rounded-md shadow-md p-6'>
        <form onSubmit={signupHandler} className='flex flex-col gap-4'>
          <div className='mb-4'>
            <h1 className='text-3xl font-bold text-center text-gray-800'>Vsnapinsta</h1>
            <p className='text-sm text-center text-gray-600 mt-1'>
              Sign up to see photos and videos from your friends.
            </p>
          </div>

          <Input
            type='text'
            name='username'
            placeholder='Username'
            value={input.username}
            onChange={changeEventHandler}
            className='focus-visible:ring-transparent my-1'
          />

          <Input
            type='email'
            name='email'
            placeholder='Email'
            value={input.email}
            onChange={changeEventHandler}
            className='focus-visible:ring-transparent my-1'
          />

          <div className='relative'>
            <Input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              value={input.password}
              onChange={changeEventHandler}
              className='focus-visible:ring-transparent my-1 pr-10'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none'
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {loading ? (
            <Button disabled className='w-full'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button type='submit' className='w-full'>
              Sign Up
            </Button>
          )}

          <p className='text-sm text-center mt-4'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-600 hover:underline'>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup

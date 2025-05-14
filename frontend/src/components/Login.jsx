import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(
        'https://vsnapinsta.onrender.com/api/v1/user/login',
        input,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user))
        navigate('/')
        toast.success(res.data.message)
        setInput({ email: '', password: '' })
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xs sm:max-w-sm border border-gray-200 bg-white rounded-md shadow-md p-6">
        <form onSubmit={loginHandler} className="flex flex-col gap-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Vsnapinsta</h1>
            <p className="text-sm text-gray-600">
              Log in to see photos and videos from your friends.
            </p>
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={input.email}
              onChange={changeEventHandler}
              className="focus-visible:ring-transparent my-1"
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={input.password}
              onChange={changeEventHandler}
              className="focus-visible:ring-transparent my-1 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {loading ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Log In
            </Button>
          )}

          <p className="text-center text-sm mt-2">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login

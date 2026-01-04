import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Sign in to your HR Management account</p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </button>

        <form className="space-y-5">
          <div>
            <label className="block text-sm mb-2">Email Address</label>
            <Input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-gray-50 border-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-gray-50 border-gray-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={() => navigate('/select-role')}
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="button"
            onClick={() => navigate('/select-role')}
            className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white h-11 flex items-center justify-center gap-2"
            
          >
            <ArrowRight className="size-4" />
            Sign In
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => navigate('/signup')}
            variant="outline"
            className="w-full border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 h-11"
          >
            Create New Account
          </Button>
        </form>
      </div>
    </div>
  );
}
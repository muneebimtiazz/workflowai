import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { User, Users, Shield, Crown, Eye, EyeOff, Image } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

type Role = 'employee' | 'manager' | 'hr-admin' | 'executive' | null;

export default function SignUp() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);

  const roles = [
    {
      id: 'employee' as Role,
      icon: User,
      label: 'Employee',
      description: 'General staff member'
    },
    {
      id: 'manager' as Role,
      icon: Users,
      label: 'Manager',
      description: 'Team lead or department manager'
    },
    {
      id: 'hr-admin' as Role,
      icon: Shield,
      label: 'HR/Admin',
      description: 'HR staff or administrator'
    },
    {
      id: 'executive' as Role,
      icon: Crown,
      label: 'Executive',
      description: 'C-level or senior executive'
    }
  ];

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/select-role');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1726250769745-443df1d6c6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2UlMjBibHVyfGVufDF8fHx8MTc2NTkxNDEwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)'
        }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
      </div>

      {/* Form Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl mb-2">Create Your Account</h1>
          <p className="text-sm text-gray-600">Join our AI-Powered HR Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Role Selection */}
          <div>
            <label className="block text-sm mb-4">Select Your Role</label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? 'border-gray-900 bg-gray-200' 
                        : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="size-6 mx-auto mb-2 text-gray-700" />
                    <div className="text-sm mb-1">{role.label}</div>
                    <div className="text-xs text-gray-500">{role.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Two Column Form */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Basic Information */}
            <div className="space-y-5">
              <h3 className="text-sm">Basic Information</h3>
              
              <div>
                <label className="block text-sm mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-gray-50 border-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-gray-50 border-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="w-full bg-gray-50 border-gray-200 pr-10"
                    required
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

              <div>
                <label className="block text-sm mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full bg-gray-50 border-gray-200 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Organizational Details */}
            <div className="space-y-5">
              <h3 className="text-sm">Organizational Details</h3>
              
              <div>
                <label className="block text-sm mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                >
                  <option value="">Select your department</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                  <option value="operations">Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Position/Job Title</label>
                <Input
                  type="text"
                  placeholder="Enter your job title"
                  className="w-full bg-gray-50 border-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Profile Picture (Optional)</label>
                <div className="relative">
                  <input
                    type="file"
                    id="profile-picture-upload"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="profile-picture-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors overflow-hidden"
                  >
                    {profilePicturePreview ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                          src={profilePicturePreview} 
                          alt="Profile preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <>
                        <Image className="size-6 text-gray-400 mb-2" />
                        <span className="text-xs text-gray-600">
                          Click to upload your profile picture
                        </span>
                        <span className="text-xs text-gray-400 mt-0.5">JPG, PNG or WEBP</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full bg-gray-50 border-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Button
              type="submit"
              className="w-full sm:flex-1 bg-linear-to-r from-blue-600 to-purple-600 text-white h-11"
            >
              Create Account
            </Button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-gray-700 hover:text-gray-900 underline"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
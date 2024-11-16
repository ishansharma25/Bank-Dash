import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import usersData from '@/Data/datasignup.json';
import Header from '@/Component/Header'
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    contact: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Check if email already exists
    if (usersData.users.some(user => user.email === formData.email)) {
      newErrors.email = 'Email already exists';
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Check if username already exists
    if (usersData.users.some(user => user.username === formData.username)) {
      newErrors.username = 'Username already exists';
    }

    // Contact validation
    if (!formData.contact) {
      newErrors.contact = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Contact number must be 10 digits';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }

      // Create new user object
      const newUser = {
        id: usersData.users.length + 1,
        email: formData.email,
        username: formData.username,
        contact: formData.contact,
        password: formData.password // In a real app, this should be hashed
      };

      // Add to users array
      usersData.users.push(newUser);

      // Store updated data in localStorage
      localStorage.setItem('usersData', JSON.stringify(usersData));

      // Show success message (optional)
      alert('Registration successful!');

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'An error occurred during registration'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Header></Header>
  
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section with Image and Text */}
        <div className="relative flex flex-col items-start">
          <div className="relative z-10 p-8 self-start mt-20">
            <div className="mb-2">
              <span className="text-4xl font-bold text-black">Sign Up to</span>
            </div>
            <div className="mb-2">
              <p className="text-3xl text-black-600 gap-5 font-bold mb-4">Lorem Ipsum is simply</p>
            </div>
            <div className="mt-5 gap-5">
              <p className="text-black-500 text-sm">If you already have an account</p>
              <div>
                <span>You Can</span>
                <a href='/login' className="ml-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  Login here!
                </a>
              </div>
            </div>
          </div>

          <div
            className="absolute hidden md:block"
            style={{
              top: '80%',
              left: '70%',
              transform: 'translate(-50%, -50%)',
              width: '50%',
              height: 'auto',
            }}
          >
            <img 
              src="Rectangle.png" 
              alt="Person holding package illustration"
              className="object-cover"
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '500px',
              }}
            />
          </div>
        </div>

        {/* Right Section - Sign Up Form */}
        <Card className="shadow-none border-0">
          <CardContent className="space-y-4 pt-6">
            <div className="mb-3">
              <span className="text-4xl font-bold">Sign Up</span>
            </div>

            {errors.submit && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  className={`bg-[#F0EFFF] placeholder-[#A7A3FF] ${errors.email ? 'border-red-500' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <Input
                  id="username"
                  type="text"
                  placeholder="Create Username"
                  className={`bg-[#F0EFFF] placeholder-[#A7A3FF] ${errors.username ? 'border-red-500' : ''}`}
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>

              <div>
                <Input
                  id="contact"
                  type="text"
                  placeholder="Contact Number"
                  className={`bg-[#F0EFFF] placeholder-[#A7A3FF] ${errors.contact ? 'border-red-500' : ''}`}
                  value={formData.contact}
                  onChange={handleChange}
                />
                {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
              </div>

              <div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className={`bg-[#F0EFFF] placeholder-[#A7A3FF] ${errors.password ? 'border-red-500' : ''}`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className={`bg-[#F0EFFF] placeholder-[#A7A3FF] ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <Button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or continue with</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
            <Button 
  variant="outline" 
  className="w-12 h-12 rounded-full p-0 bg-[#283544] flex items-center justify-center text-white hover:bg-[#3a4e5b] transition duration-200"
>
                <img 
                 src="git.png" 
                  alt="GitHub"
                  className="w-6 h-6"
                />
              </Button>
              <Button variant="outline" className="w-12 h-12 rounded-full p-0">
                <img 
                     src="google.png" 
                  alt="Google logo"
                  className="w-6 h-6"
                />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default Signup;
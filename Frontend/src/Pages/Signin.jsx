import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Header from '../Component/Header'

const EnhancedLogin = () => {
  const [credentials, setCredentials] = useState({
    identifier: '', // Changed from email to identifier to handle both email and username
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (login(credentials.identifier, credentials.password)) {
      navigate('/landingpage');
    } else {
      setError('Invalid email/username or password');
    }
  };

  return ( 
    <>
  <Header></Header>

    <div className="min-h-screen flex items-center justify-center bg-white p-6">
     
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section with Image and Text */}
        <div className="relative flex flex-col items-start">
          <div className="relative z-10 p-8 self-start mt-16">
            <div className="mb-2">
              <span className="text-4xl font-bold text-black">Sign in to</span>
            </div>
            <div className="mb-2">
              <p className="text-3xl text-black-600 font-bold mb-4">Lorem Ipsum is simply</p>
            </div>
            <div className="mt-5">
              <p className="text-black-500 text-sm">Don't have an account yet?</p>
              <div>
                <span className="text-sm">You Can</span>
                <a href="#/signup" className="ml-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  Register here!
                </a>
              </div>
            </div>
          </div>

          <div
            className="absolute hidden md:block"
            style={{
              top: '85%',
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

        {/* Right Section - Login Form */}
        <Card className="shadow-none border-0">
          <CardContent className="space-y-4 pt-6">
            <div className="mb-3">
              <span className="text-4xl font-bold">Sign in</span>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="identifier" className="text-sm font-medium text-gray-700">
                  Email or Username
                </label>
                <Input 
                  id="identifier"
                  name="identifier"
                  value={credentials.identifier}
                  onChange={handleChange}
                  placeholder="Enter your email or username" 
                  className="bg-[#F0EFFF] placeholder-[#A7A3FF]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input 
                  id="password" 
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password" 
                  className="bg-[#F0EFFF] placeholder-[#A7A3FF]"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4"
              >
                Sign In
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
                  alt="Google"
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

export default EnhancedLogin;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LogIn, Mail, Lock } from 'lucide-react';
import ForgotPassword from '@/components/ForgotPassword';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast.success('Login successful');
        navigate('/');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('An error occurred during login');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">TapJournal</h1>
          <p className="text-muted-foreground mt-2">Sign in to your wellness tracker</p>
        </div>
        
        <div className="bg-card border rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
              </div>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                </div>
                <ForgotPassword />
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </span>
              )}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Don't have an account? 
                <Link to="/signup" className="text-primary ml-1 hover:underline">
                  Sign up
                </Link>
              </p>
              
              <p className="text-xs text-muted-foreground mt-4">
                Demo credentials: demo@example.com / password123
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

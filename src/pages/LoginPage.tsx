import { useState } from 'react';

type LoginPageProps = {
  onLoginSuccess: () => void;
};

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email, password });
    // TODO: Integrate with actual authentication service
    onLoginSuccess(); // Call onLoginSuccess after successful login
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Signup:', { username, email, password });
    // TODO: Integrate with actual authentication service
    onLoginSuccess(); // Call onLoginSuccess after successful signup
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password for:', email);
    alert('Password reset link sent to ' + email);
    // TODO: Integrate with actual password recovery service
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {isLogin ? 'Welcome Back!' : 'Join Us!'}
        </h2>
        <p className="text-center text-gray-600">
          {isLogin
            ? 'Sign in to continue to your account.'
            : 'Create an account to get started.'}
        </p>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>
        )}

        <div className="text-center">
          {isLogin ? (
            <>
              <a
                href="#"
                onClick={handleForgotPassword}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
              <p className="mt-4 text-sm text-gray-600">
                Don't have an account?{' '}
                <a
                  href="#"
                  onClick={() => setIsLogin(false)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign Up
                </a>
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a
                href="#"
                onClick={() => setIsLogin(true)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign In
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

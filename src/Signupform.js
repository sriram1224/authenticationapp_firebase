import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import SignInForm from './signInform';
import { app } from './firebase';

export const SignupForm = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
 const [inmsg,setinmsg] = useState('');
  const handleSignup = (e) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        setinmsg('Successfully Signed Up');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          setError('Email already in use. Please sign in or use a different email.');
        } else {
          const errorMessage = error.message;
          setError(errorMessage);
        }
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up
            </h1>
            {!error ? <p className="text-green-600">{ inmsg}</p> : <p className="text-red-600">{error}</p>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  placeholder="******"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
             <button
  type="submit"
  style={{
    width: '100%',
    color: 'white',
    backgroundColor: '#2563EB', 
    '&:hover': {
      backgroundColor: '#1E40AF', 
    },
    '&:focus': {
      outline: 'none',
      ringWidth: '4px',
      ringColor: '#6D28D9', 
    },
    fontWeight: '500', 
    borderRadius: '0.375rem', 
    fontSize: '0.875rem', 
    padding: '0.625rem 1.25rem', 
    textAlign: 'center',
    dark: {
      backgroundColor: '#2563EB', 
      '&:hover': {
        backgroundColor: '#1E40AF', 
      },
      '&:focus': {
        ringColor: '#6D28D9',
      },
    },
  }}
>
  Sign Up
</button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Already have an account <a className="font-medium text-primary-600 hover:underline dark:text-primary-500"><button onClick={toggleForm}>Sign in</button></a>
                      </p>
            </form>
          </div>
        </div>
      </div>
      <SignInForm />
    </section>
  );
};

export default SignupForm;

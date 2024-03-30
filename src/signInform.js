import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const SignInForm = ({ toggleForm }) => {
  const [inemail, setinEmail] = useState('');
  const [inpassword, setinPassword] = useState('');
  const [inerror, setinError] = useState(null);
  const [msg,setmsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, inemail, inpassword)
      .then((userCredential) => {
        
        const user = userCredential.user;
        setmsg('Successfully Signed in');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
          setinError('Please enter valid credentials.');
        } else {
          const errorMessage = error.message;
          setinError(errorMessage);
        }
        
      });
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={inemail} onChange={(e) => setinEmail(e.target.value)} />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={inpassword} onChange={(e) => setinPassword(e.target.value)} />
                      </div>
                      <div className="flex items-center justify-between">
                          <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                              </div>  
                              <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                              </div>
                          </div>
                          <p className="text-sm font-medium text-white hover:underline dark:text-primary-500">Forgot password?</p>
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
  Sign in
</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500"><button onClick={toggleForm}>Sign up</button></a>
                      </p>
                     {!inerror ? (
  <p className="text-green-600" >{msg}</p>
) : (
  <p style={{ color: 'red' }}>{inerror}</p>
)}


                  </form>
              </div>
          </div>
      </div>
    </section>
  );
};

export default SignInForm;

import { useEffect, useState } from 'react'

import { AuthCredential, PhoneAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../configs/firestoreConfig'
import { useStore } from '../store/useStore'
import { AuthActionType } from '../store/action-auth'
import { useRouter } from 'next/router'

export default function SignIn() {
  const router = useRouter()
  const { dispatch } = useStore()
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [code, setCode] = useState('')
  const [isRecaptchaApproved, setRecaptchaApproved] = useState<boolean>(false)

  useEffect(() => {
    // init captcha object
    const recaptchaVerifier = new RecaptchaVerifier(
      'captchaContainer',
      {
        size: 'normal',
        callback: (response) => {
          //..
          console.log(response)
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      },
      auth
    )
    recaptchaVerifier.render()
    window.recaptchaVerifier = recaptchaVerifier
  }, [])

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Giris yap</h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="phone"
                autoComplete="phoneNumber"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Telefon"
                onChange={(event) => setPhoneNumber(event.target.value)}
                value={phoneNumber}
              />
            </div>
            <div>
              <input
                id="code"
                name="code"
                type="code"
                autoComplete="current-code"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="SMS Kodu"
                onChange={(event) => setCode(event.target.value)}
                value={code}
              />
            </div>
          </div>

          <div className="w-full" id="captchaContainer" />

          <div>
            {!isRecaptchaApproved ? (
              <button
                type="button"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  const appVerifier = window.recaptchaVerifier
                  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                    .then((confirmationResult) => {
                      // SMS sent. Prompt user to type the code from the message, then sign the
                      // user in with confirmationResult.confirm(code).
                      window.confirmationResult = confirmationResult
                      console.log(confirmationResult)
                      window.recaptchaVerifier.clear()
                      setRecaptchaApproved(true)
                      // ...
                    })
                    .catch((error) => {
                      // Error; SMS not sent
                      // ...
                    })
                }}
              >
                Send Code
              </button>
            ) : null}

            {isRecaptchaApproved ? (
              <button
                type="button"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  window.confirmationResult
                    .confirm(code)
                    .then((result) => {
                      // User signed in successfully.
                      const user = result.user
                      console.log(user)
                      dispatch({ type: AuthActionType.SIGNIN })
                      router.push('/')
                      // ...
                    })
                    .catch((error) => {
                      // User couldn't sign in (bad verification code?)
                      // ...
                    })
                }}
              >
                Sign in
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  )
}

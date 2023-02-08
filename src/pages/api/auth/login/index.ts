import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const auth = getAuth();

window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
}, auth);

async function register(req, res){
  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
  .then((confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.confirmationResult = confirmationResult;
    // ...
  }).catch((error) => {
    // Error; SMS not sent
    // ...
  });
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Content-Type', 'application/json')
  
    switch (req.method) {
      case 'POST':
        register(req, res)
        break
      default:
        res.status(405).end()
        break
    }
  }
  
  export default handler
  
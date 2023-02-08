import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from '../../../../configs/firestoreConfig'
const auth = getAuth(app);

const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible',
}, auth);

async function register(req, res){
    signInWithPhoneNumber(auth, req.body.phone_number, recaptchaVerifier)
        .then((confirmationResult) => {
            res.status(200).end("ok");
        }).catch((error) => {
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
  
import { Component } from 'react'
import { RecaptchaVerifier } from 'firebase/auth'

class MyReCAPTCHA extends Component {
  componentDidMount() {
    const reCaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: function (response) {
        console.log('It works!')
      }
    })
    reCaptchaVerifier.render()
  }

  render() {
    return (
      <form>
        <input />
        <button id="sign-in-button">Submit</button>
      </form>
    )
  }
}

export default MyReCAPTCHA

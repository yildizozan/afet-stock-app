import { StoreProvider, useStore } from '../store/useStore'

import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default App

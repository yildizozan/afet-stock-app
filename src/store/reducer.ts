import authReducer from './reducer-auth'

import { Action, GlobalState } from './useStore'

const reducer = (state: GlobalState, action: Action): GlobalState => {
  const { authenticated } = state

  const newState = {
    authenticated: authReducer(action, authenticated)
  }

  return newState
}

export default reducer

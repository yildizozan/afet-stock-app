import { AuthActionType } from './action-auth'
import { Action } from './useStore'

export default function authReducer(action: Action, state = false): boolean {
  const { type } = action

  // console.debug(state);
  switch (type) {
    case AuthActionType.SIGNIN:
      return true
    case AuthActionType.RESIGN:
      return true
    case AuthActionType.SIGNOUT:
      return false
    default:
      return state
  }
}

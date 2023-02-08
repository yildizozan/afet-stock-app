import React, { ReactNode, useContext, useReducer } from 'react'

import reducer from './reducer'

export interface GlobalState {
  authenticated: boolean
}

export interface Action {
  type: any
  payload?: any
}

const initialState: GlobalState = {
  authenticated: false
}

//export const AppContext = React.createContext<Partial<GlobalState>>({});

interface IStoreContext {
  state: GlobalState
  dispatch: React.Dispatch<any>
}
export const StoreContext = React.createContext<IStoreContext>({
  state: initialState,
  dispatch: () => null
})

interface StoreProviderProps {
  children: ReactNode
}

export const StoreProvider: React.FunctionComponent<StoreProviderProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <StoreContext.Provider value={{ state, dispatch }}>{props.children}</StoreContext.Provider>
}

export const useStore = (): IStoreContext => {
  const { state, dispatch } = useContext(StoreContext)
  return { state, dispatch }
}

import { FC, ReactNode, useReducer } from "react"
import { UIContext } from "./UIContext";
import { uiReducer } from "./UIReducer";

export interface UIState {
    isMenuOpen: boolean;
}

const INITIAL_PROPS: UIState = {
    isMenuOpen: false
}

interface Props {
    children: ReactNode;
}

export const UIProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, INITIAL_PROPS)

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] ToggleMenu' })
    }


    return (
        <UIContext.Provider value={{
            ...state,
            toggleSideMenu
        }}>
            { children }
        </UIContext.Provider>
    )

}
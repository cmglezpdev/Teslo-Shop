import { createContext } from "react";

interface ContextProps {
    isMenuOpen: boolean;
    toggleSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps)
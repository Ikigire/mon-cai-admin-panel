import { createContext, useContext } from "react";
import { AppContext } from "./models/AppContext.model";



export const appContext = createContext<AppContext>({});

export const useAppContext = () => useContext(appContext);
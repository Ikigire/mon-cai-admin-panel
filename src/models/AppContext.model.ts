import { Dispatch, SetStateAction } from "react";
import { Usuario } from "./Usuario.model";

export interface AppContext {
    usuario?: Usuario,
    setSession?: Dispatch<SetStateAction<Usuario>>,
    openMenu?: boolean,
    setOpenMenu?: Dispatch<SetStateAction<boolean>>
}
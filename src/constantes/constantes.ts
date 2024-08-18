import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const base_url = "https://mon-cai-api.up.railway.app/"

export const headers = {
    "Content-Type": "application/json"
};

const alerta = withReactContent(Swal);

export const alertar= (title: string, text: string, icon: 'warning'| 'error' | 'success' | 'info', timer = 2000, didClose = () => {}) => {
    alerta.fire({
        timer,
        toast: true,
        position: 'center',
        showConfirmButton: false,
        title,
        text,
        icon,
        didClose
    });
}
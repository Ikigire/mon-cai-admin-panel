import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const base_url = "http://3.19.28.164:3003/"

export const headers = {
    "Content-Type": "application/json"
};

const alerta = withReactContent(Swal);

export const alertar= (title: string, text: string, icon: 'warning'| 'error' | 'success', timer = 2000, didClose = () => {}) => {
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
import { useState } from "react";
import { Sensor } from "../../models/Sensor.model";


class AgregarProps {
    onSubmit: Function = () => {}
}

export const AgregarSensor = ({onSubmit}: AgregarProps) => {
    const [] = useState<Sensor>({tipo: '', umdd: ''});
    return (
        <></>
    );
}
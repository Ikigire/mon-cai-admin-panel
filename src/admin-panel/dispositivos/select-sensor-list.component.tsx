import { List, ListItem, Checkbox, ListItemButton, ListItemAvatar, Avatar, ListItemText, ListSubheader } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sensor } from '../../models/Sensor.model';
import { Sensors } from "@mui/icons-material";


interface SelectSensorListProps {
    setSelectedSesorList: Dispatch<SetStateAction<Sensor[]>>;
    sensores: Sensor[];
    selected?: number[];
}

export const SelectSensorList = ({ sensores, setSelectedSesorList }: SelectSensorListProps) => {
    const [checked, setChecked] = useState<number[]>([]);


    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    useEffect(() => {
        const sensoresSelected = checked.map((indice) => sensores[indice]);

        setSelectedSesorList(sensoresSelected);
    }, [checked])

    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={
                <ListSubheader component={'div'} id={`sensores-dispositivo`} >
                    Sensores
                </ListSubheader>
            }
        >
            {sensores.map((sensor, index) => {
                const labelId = `checkbox-list-label-${sensor.tipo}`;
                return (
                    <ListItem
                        key={sensor.tipo}
                        secondaryAction={
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(index)}
                                checked={checked.indexOf(index) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar>
                                    <Sensors />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={`Sensor de tipo: ${sensor.tipo}`} secondary={`UMDD: ${sensor.umdd}`} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
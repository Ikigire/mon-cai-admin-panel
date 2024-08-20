import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Collapse, Divider, IconButton, IconButtonProps, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, styled, Typography } from "@mui/material";
import { Dispositivo } from "../../models/Dispositivo.model";
import { MutableRefObject, useRef, useState } from "react";
import { Delete, Devices, Edit, ExpandMoreRounded, Sensors } from "@mui/icons-material";
import { QRCode } from "react-qrcode-logo";
import theme from "../../theme";



interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

class DispositivoCardProps {
    onDelete: Function = () => { };
    onEdit: Function = () => { };
    dispositivo: Dispositivo = { idDispositivo: '', modelo: '', sensores: [] };
}

export const DispositivoCard = ({ onDelete, onEdit, dispositivo }: DispositivoCardProps) => {
    const [expanded, setExpanded] = useState(false);
    const qrRef = useRef<QRCode>();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDownload = () => {
        qrRef.current?.download();
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar aria-label="Device">
                        <Devices />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" color="primary" onClick={() => onEdit()}>
                        <Edit />
                    </IconButton>
                }
                title={`ID: ${dispositivo.idDispositivo}`}
                subheader={`Modelo: ${dispositivo.modelo}`}
            />
            <CardContent component={'div'} style={{display: 'flex', justifyContent: 'center', alignContent:'center'}}>
                <List sx={{ width: '70%', maxWidth: 360, bgcolor: 'background.paper' }}
                    subheader={
                        <ListSubheader component={'div'} id={`sensores-dispositivo`} >
                            Sensores
                        </ListSubheader>
                    }
                >
                    {
                        dispositivo.sensores.map(sensor => (
                            <ListItem key={sensor.tipo}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Sensors />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={sensor.tipo} secondary={sensor.umdd} />
                            </ListItem>
                        ))
                    }
                </List>
            </CardContent>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites">
                    <Edit />
                </IconButton> */}
                <IconButton aria-label="Delete" color="error" onClick={() => onDelete()} >
                    <Delete />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreRounded />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent component={'div'}>
                    <Typography variant="body2" >
                        ° {dispositivo.alias ? `Fue nombrado como: "${dispositivo.alias}"` : 'El dispositivo aún no ha sido nombrado'}
                    </Typography>
                    <Divider />
                    <Typography variant="body2" >
                        ° {dispositivo.ubicacion ? `Lo han colocado en: "${dispositivo.ubicacion}"` : 'Aun no ha sido colocado en algún sitio'}
                    </Typography>
                    <Divider />
                    <Typography variant="body2" >
                        ° {dispositivo.icon ? `Se le asignó el ícono: "${dispositivo.icon}"` : 'Aún no se le ha asignado un ícono'}
                    </Typography>

                    <QRCode ref={qrRef as MutableRefObject<QRCode>} value={dispositivo.idDispositivo} size={200} fgColor={theme.palette.primary.main} logoImage="/logo.png" />

                    <Button variant="outlined" size="small" onClick={handleDownload}>Descargar</Button>
                </CardContent>
            </Collapse>
        </Card>
    );
}
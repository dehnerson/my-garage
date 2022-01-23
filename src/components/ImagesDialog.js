import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Container, Zoom } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    paper: {
        background: '#00000075',
    },
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    image: {
        width: '100%'
    }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});


const ImagesDialog = (props) => {
    const { open, handleClose, src, alt } = props;
    const classes = useStyles();

    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition} onClose={handleClose} onClick={handleClose} PaperProps={{ classes: { root: classes.paper } }}>
            <Container maxWidth='lg' className={classes.container}>
                <img src={src} alt={alt} onClick={e => e.stopPropagation()} className={classes.image} />
            </Container>
        </Dialog>
    )
}


export default ImagesDialog;
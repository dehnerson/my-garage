import React from 'react';
import { withTranslation } from 'react-i18next';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, InputAdornment, Box, Fade, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon, RemoveCircle } from '@material-ui/icons';
import AddCircle from '@material-ui/icons/AddCircle';
import Fields from './Fields';

const useStyles = makeStyles((theme) => ({
    form: {
        alignSelf: 'flex-end',
        marginBottom: theme.spacing(1)
    },
    text: {
        alignSelf: 'center'
    },
    removeButton: {
        marginLeft: 'auto'
    }
}));


const ProcedureMaintenanceNew = (props) => {
    const { procedures, onProceduresChanged, creationMode, t } = props;

    const [hoveredItemIndex, setHoveredItemIndex] = React.useState();
    const [newWork, setNewWork] = React.useState();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!newWork) return;

        if (Array.isArray(procedures)) {
            onProceduresChanged(procedures.concat({ fields: { work: newWork } }));
        } else {
            onProceduresChanged([{ fields: { work: newWork } }]);
        }

        setNewWork("");
    }

    const handleRemoveProcedure = (e, index) => {
        e.stopPropagation();

        if (procedures.length > 0) {
            const newTProcedures = [...procedures];
            newTProcedures.splice(index, 1);
            onProceduresChanged(newTProcedures);
        }
    }

    const onFieldsChanged = (index, newFields) => {
        const newProcedures = [...procedures];
        newProcedures[index] = { ...newProcedures[index], fields: newFields };
        onProceduresChanged(newProcedures);
    }

    const classes = useStyles();

    return (
        <Box display='flex' flexDirection='column'>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField placeholder={t('addWork')} variant="filled" size="small" hiddenLabel aria-label={t('addWork')}
                    value={newWork}
                    onChange={(event) => setNewWork(event.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    onClick={handleSubmit}
                                    edge="start"
                                >
                                    <AddCircle />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }} />
            </form>
            {Array.isArray(procedures) && procedures.map((procedure, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand" aria-controls="additional-actions1-content" id="additional-actions1-header" onMouseEnter={e => setHoveredItemIndex(index)} onMouseLeave={e => setHoveredItemIndex(null)}>
                        <Typography className={classes.text}>{procedure.fields?.work}</Typography>
                        <Fade in={index === hoveredItemIndex} className={classes.removeButton}>
                            <Tooltip title={t('remove') + " " + procedure.fields?.work}>
                                <IconButton onClick={e => handleRemoveProcedure(e, index)} onFocus={e => e.stopPropagation()}><RemoveCircle /></IconButton>
                            </Tooltip>
                        </Fade>
                    </AccordionSummary>
                    <AccordionDetails onMouseEnter={e => setHoveredItemIndex(index)} onMouseLeave={e => setHoveredItemIndex(null)}>
                        <Fields area={'procedures'} fields={procedure.fields} onChanged={newFields => onFieldsChanged(index, newFields)} creationMode={creationMode} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}

export default withTranslation()(ProcedureMaintenanceNew);

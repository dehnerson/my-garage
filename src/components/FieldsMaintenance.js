import React, { useState, useEffect } from "react";
import { withTranslation } from 'react-i18next';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import { updateFieldsAdd } from "../actions/fields";
import { useTheme } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Tabs, Tab, TextField, InputAdornment, useMediaQuery, Box } from '@material-ui/core';
import { AddCircle } from "@material-ui/icons";
import SortableList from './SortableList';
import EditSaving from "./EditSaving";


const FieldsMaintenance = (props) => {
    const { t } = props;

    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [fieldsAdd, setFieldsAdd] = useState();
    const [edited, setEdited] = useState(false);

    const uid = useSelector(state => state.firebase.auth.uid);

    useFirestoreConnect([
        {
            collection: 'fields',
            doc: uid,
            storeAs: 'fieldsAdditional'
        }
    ]);

    const fieldsAddDB = useSelector(state => state.firestore.status.requested['fieldsAdditional'] ? state.firestore.data?.fieldsAdditional?.areas : null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (fieldsAddDB === undefined) {
            dispatch(updateFieldsAdd([{ name: 'vehicle', fields: [] }, { name: 'maintenanceWork', fields: [] }, { name: 'procedures', fields: [] }]));
        }
    }, [fieldsAddDB, dispatch]);

    if (!edited && fieldsAdd !== fieldsAddDB) {
        setFieldsAdd(fieldsAddDB);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setEdited(true);

        setFieldsAdd(Array.from(fieldsAdd, (each, i) => {
            if (currentTabIndex === i) {
                return { ...each, fields: each.fields.concat({ label: event.target[0].value }) }
            } else {
                return each;
            }
        }));

        event.target[0].value = null;
    }

    const onListChange = (index, newItems) => {
        setEdited(true);

        setFieldsAdd(Array.from(fieldsAdd, (each, i) => {
            if (index === i) {
                return { ...each, fields: newItems }
            } else {
                return each;
            }
        }));
    }

    const saveChanges = () => {
        dispatch(updateFieldsAdd(fieldsAdd));
        setEdited(false);
    }

    const a11yProps = (key) => {
        return {
            id: `vertical-tab-${key}`,
            'aria-controls': `vertical-tabpanel-${key}`,
        };
    }

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Card component={"section"}>
            <CardHeader title={t('addFields')}
                action={<EditSaving enabled={edited} onSave={saveChanges} onCancel={e => setEdited(false)} />}
                subheader={
                    <Box marginTop='8px'>
                        <form onSubmit={handleSubmit}>
                            <TextField placeholder="Add field" variant="filled" size="small" hiddenLabel aria-label="Add field"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AddCircle />
                                        </InputAdornment>
                                    ),
                                }} />
                        </form>
                    </Box>
                }
                subheaderTypographyProps={{ align: "right" }}>
            </CardHeader>
            <CardContent >
                <Box display='flex' flexGrow='1' width='100%' flexDirection={isDesktop ? 'row' : 'column'}>
                    <Box borderRight={isDesktop ? `1px solid ${theme.palette.divider}` : 'none'} borderBottom={isDesktop ? 'none' : `1px solid ${theme.palette.divider}`}>
                        <Tabs orientation={isDesktop ? 'vertical' : 'horizontal'} value={currentTabIndex} onChange={(e, index) => setCurrentTabIndex(index)} aria-label="Vertical tabs example">
                            {fieldsAdd?.map((area, index) =>
                                <Tab key={area.name} value={index} label={t(area.name)} {...a11yProps(area.name)} />
                            )}
                        </Tabs>
                    </Box>
                    {fieldsAdd?.map((area, index) =>
                        <Box key={area.name} role="tabpanel" hidden={currentTabIndex !== index} id={`vertical-tabpanel-${area.name}`} aria-labelledby={`vertical-tab-${area.name}`} flexGrow='1'>
                            {currentTabIndex === index && (
                                <SortableList items={area.fields} setItems={newItems => onListChange(index, newItems)} />
                            )}
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card >
    )
}

export default withTranslation()(FieldsMaintenance);
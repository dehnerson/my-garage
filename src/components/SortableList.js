import React from "react";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import arrayMove from "array-move";
import { makeStyles } from '@material-ui/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DragHandleIcon from "@material-ui/icons/DragHandle";

const listStyles = makeStyles(theme => ({
    list: {
        width: '100%'
    }
}));


const DragHandle = SortableHandle(() => (
    <ListItemIcon>
        <DragHandleIcon />
    </ListItemIcon>
));

const SortableItem = SortableElement(({ text }) => (
    <ListItem ContainerComponent="div">
        <ListItemText primary={text} />
        <ListItemSecondaryAction>
            <DragHandle />
        </ListItemSecondaryAction>
    </ListItem>
));

const SortableListContainer = SortableContainer(({ items }) => {
    const classes = listStyles();

    return (
        <List component="div" className={classes.list}>
            {items.map((item, index) => (
                <SortableItem key={index} index={index} text={item} />
            ))}
        </List>
    )
});

const SortableList = (props) => {
    const { items, setItems } = props;

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMove(items, oldIndex, newIndex));
    };

    return (
        <SortableListContainer items={items} onSortEnd={onSortEnd} useDragHandle={true} lockAxis="y" />
    )
};

export default SortableList;

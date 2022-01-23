import React from "react";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import arrayMove from "array-move";
import { makeStyles } from '@material-ui/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { DragHandle as DragHandleIcon, RemoveCircle, } from "@material-ui/icons";
import { Fade, IconButton } from "@material-ui/core";

const listStyles = makeStyles(theme => ({
    list: {
        width: '100%'
    }
}));


const DragHandle = SortableHandle(() => (
    <IconButton>
        <DragHandleIcon />
    </IconButton>
));

const SortableItem = SortableElement(({ text, handleItemDelete }) => {
    const [isItemHovered, setIsItemHovered] = React.useState(false);

    return (
        <ListItem onMouseEnter={e => setIsItemHovered(true)} onMouseLeave={e => setIsItemHovered(false)}>
            <ListItemText primary={text} />
            <ListItemSecondaryAction onMouseEnter={e => setIsItemHovered(true)} onMouseLeave={e => setIsItemHovered(false)}>
                <Fade in={isItemHovered}>
                    <IconButton onClick={handleItemDelete}>
                        <RemoveCircle />
                    </IconButton>
                </Fade>
                <DragHandle />
            </ListItemSecondaryAction>
        </ListItem>
    )
});

const SortableListContainer = SortableContainer(({ items, handleItemDelete }) => {
    const classes = listStyles();

    return (
        <List component="div" className={classes.list}>
            {Array.isArray(items) && items.map((item, index) => (
                <SortableItem key={index} text={item.label} index={index} handleItemDelete={e => handleItemDelete(index)} />
            ))}
        </List>
    )
});

const SortableList = (props) => {
    const { items, setItems } = props;

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMove(items, oldIndex, newIndex));
    };

    const handleItemDelete = (index) => {
        const newItems = Array.from(items);
        newItems.splice(index, 1)
        setItems(newItems);
    };

    return (
        <SortableListContainer items={items} onSortEnd={onSortEnd} handleItemDelete={handleItemDelete} useDragHandle={true} lockAxis="y" />
    )
};

export default SortableList;

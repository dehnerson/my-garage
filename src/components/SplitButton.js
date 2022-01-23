import React from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Menu, Tooltip } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';


const SplitButton = (props) => {
    const { tooltipMain, onMainClick, onSplitItemClick, splitItems, t } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (index) => {
        onSplitItemClick(index);
        handleClose();
    };

    const splitItemsAvailable = Array.isArray(splitItems) && splitItems.length > 0;

    return (
        <div>
            <ButtonGroup aria-label="split button">
                <Tooltip title={tooltipMain}>
                    <Button onClick={onMainClick}>
                        <AddIcon />
                    </Button>
                </Tooltip>
                {splitItemsAvailable &&
                    <Button size="small" aria-controls={Boolean(anchorEl) ? 'split-button-menu' : undefined} aria-expanded={Boolean(anchorEl) ? 'true' : undefined} aria-label="select merge strategy" aria-haspopup="menu" onClick={handleClick}>
                        <ArrowDropDownIcon />
                    </Button>
                }
            </ButtonGroup>
            {splitItemsAvailable &&
                <Menu id="split-button-menu" anchorEl={anchorEl} getContentAnchorEl={null} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    {splitItems.map((item, index) => (
                        <MenuItem key={index} onClick={(event) => handleMenuItemClick(item)}>
                            {t(item.label)}
                        </MenuItem>
                    ))}
                </Menu>
            }
        </div>
    );
}

export default withTranslation()(SplitButton);

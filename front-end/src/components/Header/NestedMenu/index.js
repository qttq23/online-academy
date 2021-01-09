import React, {useState} from "react";
import {Menu, MenuItem} from "@material-ui/core";
import NestedMenuItem from "material-ui-nested-menu-item";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

export const NestedMenu = () => {
    const [menuPosition, setMenuPosition] = useState('');

    const handleRightClick = (event: React.MouseEvent) => {
        if (menuPosition) {
            return;
        }
        event.preventDefault();
        setMenuPosition({
            top: event.pageY,
            left: event.pageX + 20,
        });
    };


    const handleItemClick = (event: React.MouseEvent) => {
        setMenuPosition(null);
    };

    return (
        <div onContextMenu={handleRightClick} onClick={handleRightClick}>
            <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon style={{color: "#e91e63"}}
                />
            </IconButton>

            <Menu
                open={!!menuPosition}
                onClose={() => setMenuPosition(null)}
                anchorReference="anchorPosition"
                anchorPosition={menuPosition}
            >
                <MenuItem onClick={handleItemClick}>Design</MenuItem>
                <MenuItem onClick={handleItemClick}>Marketing</MenuItem>
                <NestedMenuItem
                    label="Development"
                    parentMenuOpen={!!menuPosition}
                    onClick={handleItemClick}
                >
                    <MenuItem onClick={handleItemClick}>Web Development</MenuItem>
                    <MenuItem onClick={handleItemClick}>Mobile Development</MenuItem>
                </NestedMenuItem>

            </Menu>
        </div>
    );
};

export default NestedMenu;
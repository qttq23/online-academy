import React, { useState, useEffect } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import NestedMenuItem from "material-ui-nested-menu-item";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";


import myRequest from "../../../helpers/myRequest";
import myConfig from '../../../helpers/myConfig';
import myModel from '../../../helpers/myModel';
import store from '../../../redux/store'
import {
    Redirect,
    useRouteMatch
} from 'react-router-dom';

export const NestedMenu = (props) => {
    const [menuPosition, setMenuPosition] = useState('');
    const [redirectUrl, setRedirectUrl] = useState('');

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


    const handleItemClick = (level, id, name, event: React.MouseEvent) => {

        if (level == 1) {

            console.log('nested: topic: ', id)
            setRedirectUrl(`/courseList?fields=topic&keyword=${id}&name=${name}`)
        } else if (level == 2) {

            console.log('nested: cat: ', id)
            setRedirectUrl(`/courseList?fields=categoryId&keyword=${id}&name=${name}`)
        }
        setMenuPosition(null);
    };


    let topics = []
    props.categories.forEach(function(cat) {
        if (!topics.includes(cat.topic)) {
            topics.push(cat.topic)
        }

    })
    console.log('nested menu: ', topics)

    // redirect
    // if (redirectUrl != '') {
    //     return <Redirect to={redirectUrl} />
    // }

    return (
        <div onContextMenu={handleRightClick} onClick={handleRightClick}>
            <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon style={{color: "white"}}
                />
            </IconButton>

            <Menu
                open={!!menuPosition}
                onClose={() => setMenuPosition(null)}
                anchorReference="anchorPosition"
                anchorPosition={menuPosition}
            >

                {
                    topics.map(function(topic){
                        return (
                            <NestedMenuItem
                                label={topic}
                                parentMenuOpen={!!menuPosition}
                                onClick={handleItemClick.bind(null, 1, topic, topic)}
                            >
                            {
                                props.categories.map(function(cat){
                                    if(cat.topic == topic){
                                        return (
                                        <MenuItem onClick={handleItemClick.bind(null, 2, cat.id, cat.name)}>
                                        {cat.name}
                                        </MenuItem>
                                        )
                                    }
                                    return ''
                                })
                            }
                            </NestedMenuItem>
                        )
                    })
                }

            </Menu>
            {redirectUrl != '' ? (<Redirect to={redirectUrl} />): ''}
        </div>
    );
};

export default NestedMenu;
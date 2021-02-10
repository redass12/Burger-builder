import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import CancelBtn from '../SideDrawer/CancelBtn/CancelBtn'
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <CancelBtn clicked={props.clicked}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav  className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>

);

export default toolbar;
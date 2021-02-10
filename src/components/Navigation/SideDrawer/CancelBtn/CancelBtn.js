import React from 'react';

import classes from './CancelBtn.module.css';


const CancelBtn = props => (
<div className={classes.CancelBtn} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
</div>
)

export default CancelBtn;
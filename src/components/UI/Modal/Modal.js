import React ,{Component}from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class modal extends Component {

shouldComponentUpdate(nextProps , nextState)
{
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
}

wilComponentUpdate(){
    console.log("[modal] render");
}

render() {
    
return ( <Aux>
    <Backdrop show={this.props.show} clicked={this.props.hideModal}/>
    <div 
        className={classes.Modal}
        style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)' , 
            opacity: this.props.show ? '1' : '0'
        }}
        >
        {this.props.children}
    </div>
</Aux>
 ) }
};

export default React.memo(modal);
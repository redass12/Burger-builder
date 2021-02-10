import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Auxiliary/Auxiliary';


class OrderSummary extends Component {
//     const ingredientSummary = Object.keys(props.ingredients);

//    const dd =  ingredientSummary.map((ingredient) => {
//         return <li>`${ingredient} : ${props.ingredients[ingredient]}`</li>
//     })
//This could be a functional component , doesn't have to be a class
componentWillUpdate() {
    console.log('[OrderSummary] willUpdate');
}





render(){
const ingredientSummary = Object.keys(this.props.ingredients).map((ingredient,index) => {
        return  (<li key={index}>
                    <span style={{textTransform:'capitalize'}}>{ingredient}</span> : {this.props.ingredients[ingredient]}
                </li>)
});

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price :{this.props.totalprice.toFixed(2)} </strong></p>
            <p>Continue to Checkout?</p> 
            <Button 
                btnType="Danger" 
                clicked={this.props.purchaseCanceled}>
                CANCEL
            </Button>
            <Button 
                btnType="Success" 
                clicked={this.props.purchaseContinue}>
                CONTINUE
            </Button>
        </Aux>

    );
}
}
export default OrderSummary;
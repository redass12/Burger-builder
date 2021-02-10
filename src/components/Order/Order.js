import React from 'react';

import classes from './Order.module.css';

const Order = ({price , ingredients}) => {

    console.log(ingredients);

    const ing = [];

   for(let ingredientName in ingredients) {
        ing.push(
            {
                name: ingredientName,
                amount: ingredients[ingredientName]
            }
        )
   }

   const ingredientOutput = ing.map(ingredient => {
    return <span 
                style={{textTransform:'capitalize',
                        display: 'inline-block',
                        magrin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px',
                        marginRight:'5px'
                }}
                key={ingredient.name}>
                {ingredient.name} ({ingredient.amount})
                </span>;
   })

    return (
        <div className={classes.Order}>
        <p>Ingredients : {ingredientOutput}</p>
        <p>Price <strong>{Number.parseFloat(price).toFixed(2)}</strong></p>
    </div>
    )
}
    
export default Order;
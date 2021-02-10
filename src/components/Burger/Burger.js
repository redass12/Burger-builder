import React from 'react';
//inject the router porps inside the nested child (burger) of the burgerBuilder parent trough a special higher order component provided by react-router-dom
import { withRouter } from 'react-router-dom';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.module.css';

const Burger = (props) => {
    console.log("from burger component",props);
    
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igkey => {
        console.log("started");
        return [...Array(props.ingredients[igkey])].map((_ ,i ) => {

            return <BurgerIngredient key={igkey + i} type={igkey} />;
        });

    }).reduce((acumulator , current) => {
        return acumulator.concat(current);
    },[]);

    if(transformedIngredients.length === 0)
    {
        transformedIngredients = <p>Please start adding ingredients !</p>
    }

    console.log(transformedIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );

}
export default withRouter(Burger);

//[[dd ,ddd], [ddd] , [ddd]]
import React ,{ Component } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from  '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import {connect} from 'react-redux';

import * as burgerBuilderActions from '../../store/actions/index';





class BurgerBuilder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            displaySummary:false,
        }
    }

    componentDidMount () {
            this.props.onInitIngredient();
    }

//here we did have a problem becuase we copied the ingredinent 
// and when we clic we get an oudated version of the state:
/*    const ingredients = {
            ...this.state.ingredients
        }*/
    updatePurchaseState = (updatedIngredients) => {
     
        const sum = Object.keys(updatedIngredients)
                    .map(igKey => {
                        return updatedIngredients[igKey];
                    })
                    .reduce((accumulator , el) => {
                        return el + accumulator;
                    },0)
                return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     //my trys
    //     //get the lable assoicate to the more button
    //     // change the ingredient number
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCounted = oldCount +1 ;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };

    //     updatedIngredients[type] = updatedCounted;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({ingredients: updatedIngredients , totalPrice:newPrice });
    //     this.updatePurchaseState(updatedIngredients);

    // }

    removeAllIngredientHandler = () => {
       const copyState = {
            salad:0,
            bacon:0,
            cheese : 0,
            meat:0
       }
       this.setState({ingredients:copyState , totalPrice: 4})
       this.updatePurchaseState(copyState);


    }

    // removeIngredientHandler = (type) => {
    //     //get the old value to be able to decrease it 
    //     const oldValue = this.state.ingredients[type];
    //     let updatedIngredientValue = 0;
    //     if(oldValue > 0 ){
    //         updatedIngredientValue = oldValue -1;
    //     }
    //     const copyIngredient = {
    //         ...this.state.ingredients
    //     }
    //     copyIngredient[type] = updatedIngredientValue;

    //     const priceSubstraction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceSubstraction;

    //     this.setState({ingredients:copyIngredient , totalPrice:newPrice});
    //     this.updatePurchaseState(copyIngredient);
        

    // }


    displaySummaryHandler = () =>{

        this.setState(
            { displaySummary:true }
        )
    }
    hideSummaryHandler=() => {
        this.setState({displaySummary: false});
    }

    purchaseContinueHandler = () => {

        /*
        THIS IS THE FIRST VERSION BEFORE ROUTING CAME ON : 
        alert('you continue');
        for firebase you should add the .json in the end.
        side note "in the production the price should be calculated in the backend to make shure that the user don't manipulate the price"
        this.setState({loading:true});
        const order = {
            ingredients:this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name:'Mohamed reda',
                address: {
                    street: 'tessfsf1',
                    zipCode: '234343',
                    country:'France'
                },
                email:'test@test.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders.json',order)
            .then(response => this.setState({loading:false,displaySummary:false}))
            .catch(error => this.setState({loading:false}))
       
        we could pass the queryparam in this way also in my opinion (not tested):`/checkout?salad=${this.state.ingredients.salad}`*/
        /*
        -------------------------------------------------------------------------------------------
        THIS IS THE SECONDE VERSION WITH THE ROUNTING PROPRETY : 
        const queryParams = [];

        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        console.log('queryparam', queryParams); // [slade = 1 , bacon = 1,....]
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        });

        THIS IS THE THE THIRD VERSION WITH REDUX::::
        */

       this.props.history.push('/checkout');
    }

    render() {
        console.log(this.state.purchaseable);
        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad : true , meat : false , ......}
        let orderSummary = null;

      
        let burger = this.props.error?<p>Ingredients can't be loaded!</p>:<Spinner/>;

        if(this.props.ings){
            burger = ( 
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        price = {this.props.price}
                        purchaseable = {this.updatePurchaseState(this.props.ings)}
                        displaySummary = {this.displaySummaryHandler}
                        removeAll = {this.props.onRemoveAllIngredient}
                    />
                </Aux>);

                orderSummary =  <OrderSummary 
                ingredients={this.props.ings} 
                purchaseCanceled={this.hideSummaryHandler}
                purchaseContinue={this.purchaseContinueHandler}
                totalprice={this.props.price}
                />
        }
      
       
        
        return (
            <Aux>
               
                <Modal show={this.state.displaySummary} hideModal={this.hideSummaryHandler}>
                   {orderSummary}
                </Modal>

                {burger}

            
               
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price : state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onRemoveAllIngredient : () => dispatch( burgerBuilderActions.removeAllIngredient()),
        onInitIngredient: () => dispatch(burgerBuilderActions.initIngredients())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
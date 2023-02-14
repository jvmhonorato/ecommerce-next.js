import { createContext, useReducer} from "react";

 const StoreContext = createContext<any>(null);

const initialState = {
    cart:{ cartItems: []},

}

function reducer(state:any, action:any){
    switch (action.type){ 
        case 'CART_ADD_ITEM':{
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (item:any) => item.slug === newItem.slug
            )
            const cartItems = existItem
            ? state.cart.cartItems.map((item:any)=>
            item.name === existItem.name ? newItem : item
            )
            : [...state.cart.cartItems, newItem];
            return {...state, cart: {...state.cart, cartItems }}
        }
            default: 
            return state;
     }
    }

    const StoreProvider = ({children}:any) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value =  {state, dispatch};
    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
export {StoreProvider, StoreContext}
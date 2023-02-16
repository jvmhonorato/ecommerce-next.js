import { createContext, useReducer , Dispatch} from "react";

const initialState = {
    cart:{ cartItems: []},

}

 const StoreContext = createContext<any>({
    state: initialState,
    dispatch: () =>  null,
 });



function reducer(state:any, action:any){
    switch (action.type){ 
        case 'CART_ADD_ITEM':{
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (item:any) => item.slug === newItem.slug
            )
            const cartItems = existItem? state.cart.cartItems.map((item:any)=>
            item.name === existItem.name ? newItem : item
            )
            : [...state.cart.cartItems, newItem];
            return {...state, cart: {...state.cart, cartItems }}
        }
        case 'CART_REMOVE_ITEM':{
           const cartItems = state.cart.cartItems.filter(
            (item:any) => item.slug !== action.payload.slug
           ); 
           return {...state, cart: {...state.cart, cartItems }}
        }
            default: 
            return state;
     }
    }

   function StoreProvider({children}:any){
    const [state, dispatch] = useReducer(reducer, initialState)
    const value =  {state, dispatch};
    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
export { StoreContext, StoreProvider}
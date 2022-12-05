const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product } = action.payload;

    // tackle the existing product

    let existingProduct = state.cart.find(
      (curItem) => curItem.id === id + color
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === id + color) {
          let newAmount = curElem.amount + amount;

          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          return {
            ...curElem,
            amount: newAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let cartProduct = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }
  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (currElem) => currElem.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let INCAmount = curElem.amount + 1;
        if (INCAmount >= curElem.max) {
          INCAmount = curElem.max;
        }
        return {
          ...curElem,
          amount: INCAmount,
        };
      } else {
        return curElem;
      }
    });
    return {
      ...state,
      cart: updatedProduct,
    };
  }
  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let DecAmount = curElem.amount - 1;
        if (DecAmount <= 1) {
          DecAmount = 1;
        }
        return {
          ...curElem,
          amount: DecAmount,
        };
      } else {
        return curElem;
      }
    });
    return {
      ...state,
      cart: updatedProduct,
    };
  }

  // if (action.type === "UPDATE_CART_TOTAL_ITEM") {
  //   let updatedItemValue = state.cart.reduce((initialVal, curElem) => {
  //     let { amount } = curElem;
  //     initialVal += amount;
  //     return initialVal;
  //   }, 0);
  //   return {
  //     ...state,
  //     total_item: updatedItemValue,
  //   };
  // }

  // if (action.type === "CART_TOTAL_PRICE") {
  //   // let {total_price}
  //   let total_price = state.cart.reduce((initialVal, currElem) => {
  //     let { price, amount } = currElem;
  //     initialVal = initialVal + price * amount;
  //     return initialVal
  //   }, 0);
  //   return {
  //     ...state,
  //     total_price,
  //   };
  // }

  if (action.type === "CART_ITEM_PRICE_TOTAL") {
    let { total_item, total_price } = state.cart.reduce(
      (accum, currElem) => {
        let { price, amount } = currElem;
        accum.total_item += amount;
        accum.total_price += price * amount;
        return accum;
      },
      { total_item: 0, total_price: 0 },
      0
    );

    return {
      ...state,
      total_price,
      total_item,
    };
  }

  return state;
};

export default cartReducer;

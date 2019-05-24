import * as actionTypes from "../actionTypes";

const initialState = {
    productImages: []
};

export default function productImageReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT_IMAGE: {
            if (state.productImages.length < 5) {
                let imageDetails = {
                    id: state.productImages.length,
                    image: action.val
                };
                return {
                    ...state,
                    productImages: [...state.productImages, imageDetails]
                }
            }
            else {
                return { ...state }
            }
        }

        case actionTypes.REMOVE_PRODUCT_IMAGE: {
            let newProductImages = [...state.productImages];
            newProductImages.pop();
            return {
                ...state,
                productImages: newProductImages
            }
        }

        default: {
            return state;
        }
    }
}
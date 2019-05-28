import * as actionTypes from './actionTypes';

export function getGroups(){
    return function(dispatch){
        return fetch("")
        .then(response => response.json())
        .then(json => {
            dispatch({type:actionTypes.GET_GROUP,val:json});
        });
    }
}

export function getSubGroups(){
    return function(dispatch){
        return fetch("")
        .then(response => response.json())
        .then(json => {
            dispatch({type:actionTypes.GET_SUBGROUP,val:json});
        });
    }
}

export function getChildGroups(){
    return function(dispatch){
        return fetch("")
        .then(response => response.json())
        .then(json => {
            dispatch({type:actionTypes.GET_CHILDGROUP,val:json});
        });
    }
}

export function getProducts(){
    return function(dispatch){
        return fetch("")
        .then(response => response.json())
        .then(json => {
            dispatch({type:actionTypes.GET_PRODUCT,val:json});
        });
    }
}

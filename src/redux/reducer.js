

const initialState = {
  username: '',
  flavorsIds: [],
  orderId: -1,
  total: 0,

}

const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';
const ADD_NEW_FLAVORS = 'ADD_NEW_FLAVORS';
const UPDATE_ORDER_ID = 'UPDATE_ORDER_ID'
const SET_FLAVOR_ID = 'SET_FLAVOR_ID'
const CLEAR_FLAVOR_ID = 'CLEAR_FLAVOR_ID'
const ADD_TO_TOTAL = 'ADD_TO_TOTAL'
const SUB_FROM_TOTAL = 'SUB_FROM_TOTAL'

export function addToTotal(price) {
  return {
    type: ADD_TO_TOTAL,
    payload: price
  }
}

export function subFromTotal(price) {
  return {
    type: SUB_FROM_TOTAL,
    payload: price
  }
}

export function clearFlavorId() {
  return {
    type: CLEAR_FLAVOR_ID,
    payload: []
  }

}

export function updateOrderId(id) {
  return {
    type: UPDATE_ORDER_ID,
    payload: id
  }

}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  }
}

export function setFlavorId(flavor) {
  return {
    type: SET_FLAVOR_ID,
    payload: flavor
  }
}


export function addNewFlavor(flavor) {
  return {
    type: ADD_NEW_FLAVORS,
    payload: flavor
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

export default function (state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case ADD_TO_TOTAL:
      return { ...state, total: state.total + payload }
    case SUB_FROM_TOTAL:
      return { ...state, total: state.total - payload }
    case UPDATE_USER:
      return { ...state, username: payload };
    case LOGOUT:
      return state;
    case UPDATE_ORDER_ID:
      return { ...state, orderId: payload }
    case ADD_NEW_FLAVORS:
      return { ...state, flavorsIds: [...state.flavorsIds, payload] };
    case CLEAR_FLAVOR_ID:
      return { ...state, flavorsIds: payload }
    case SET_FLAVOR_ID:
      return { ...state, flavorsIds: payload }
    default:
      return state;
  }
}


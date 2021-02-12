const orderState = {
    orderId: -1,
}

const UPDATE_ORDER_ID = 'UPDATE_ORDER_ID'

export function updateOrderId(id) {
    return {
        type: UPDATE_ORDER_ID,
        payload: id
    }

}


export default function reducer(state = orderState, action) {
    let { type, payload } = action; {
        switch (type) {
            case UPDATE_ORDER_ID:
                return { ...state, orderId: payload }
        }
    }
}

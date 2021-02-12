import { createStore } from 'redux';

import reducer from './reducer';
import orderReducer from './orderReducer';

export default createStore(reducer);
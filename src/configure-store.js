
import {createStore} from 'redux';
import reducer from './reducers';

export default function configure_store () {
  return createStore(reducer);
}

import { all } from 'redux-saga/effects';
import userSaga from './usersagas';
import productSaga from './productSagas';
import categorySaga from './categorySagas';
import allocationSaga from './allocationSagas';
import comboSaga from './ComboSagas';

export default function* rootSaga() {
   yield all([
    userSaga(),
    productSaga(),
    categorySaga(),
    allocationSaga(),
    comboSaga(),
   ]);
}
import { queryPurchasePrice , queryPurchasePublish , queryPurchaseDelete , queryWaitCollect , priceDetail , priceDetailPage}  from '../services/api';

export default {
  namespace:'purOrder',
  state: {
    purchasePrice:[],
    purchasePublish:false,
    purchaseDelete:false,
    WaitCollect:[],
    PriceDetail:[],
    PriceDetailPage:[],
  },
  effects: {     
    *queryPurchasePrice({ payload },{ call, put}) {
      const data = yield call(queryPurchasePrice,payload)
      // console.log(data)
      yield put({
        type:'savePurchasePrice',
        payload: data || {},
      })
    },
    *queryPurchasePublish({ payload },{ call, put}) {
      const data = yield call(queryPurchasePublish,payload)
      yield put({
        type:'savePurchasePublish',
        payload: data || {},
      })
    },
    *queryPurchaseDelete({ payload },{ call, put}) {
      const data = yield call(queryPurchaseDelete,payload)
      yield put({
        type:'savePurchaseDelete',
        payload: data || {},
      })
    },
    *queryWaitCollect(_,{ call, put}) {
      const data = yield call(queryWaitCollect)
      yield put({
        type:'saveWaitCollect',
        payload: data || {},
      })
    },
    *queryPriceDetail({ payload },{ call,put }) {
      const data = yield call(priceDetail,payload)
      yield put({
        type:'savePriceDetail',
        payload:data || {}
      })
    },
    *queryPriceDetailPage({ payload },{ call,put }) {
      const data = yield call(priceDetailPage,payload)
      yield put({
        type:'savepriceDetailPage',
        payload:data || {}
      })
    }
  },
  reducers:{
    'savePurchasePrice'(state,{payload}) {
      return {
        ...state,
        purchasePrice:payload,
      }
    },
    'savePurchasePublish'(state,{payload}) {
      return {
        ...state,
        purchasePublish:payload,
      }
    },
    'savePurchaseDelete'(state,{payload}) {
      return {
        ...state,
        purchaseDelete:payload,
      }
    },
    'saveWaitCollect'(state,{payload}) {
      return {
        ...state,
        WaitCollect:payload,
      }
    },
    'savePriceDetail'(state,{payload}) {
      return {
        ...state,
        PriceDetail:payload
      }
    },
    'savepriceDetailPage'(state,{payload}) {
      return {
        ...state,
        PriceDetailPage:payload
      }
    },
    'editPriceDetailPage'(state,{payload}) {
      console.log(payload)
      return {
        ...state,
        ...payload
      }
    } 
  }
}
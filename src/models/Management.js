import { manageMy } from '../services/api'

export default {
  namespace:'management',
  state: {
    my:[],
  },
  effects: {
    *queryMy(_, { call,put }) {
      const data = yield call(manageMy)
      console.log(data)
      yield put({
        type:'saveManagement',
        payload: data || {},
      })
    }
  },
  reducers:{
    'saveManagement'(state,{payload}) {
      return {
        ...state,
        my:payload
      }
    }
  }
}
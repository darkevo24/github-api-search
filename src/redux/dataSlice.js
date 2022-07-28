import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data : []
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    saveData : function(state,actions){
        state.data.push(actions.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const {saveData} = dataSlice.actions

export default dataSlice.reducer
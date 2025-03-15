import {createSlice} from '@reduxjs/toolkit';

const privateKeySlice = createSlice({
  name: 'privateKey',
  initialState: {
    privateKey: null,
  },
    reducers: {
        setPrivateKey(state, action) {
        state.privateKey = action.payload;
        },
    },  
});
export const { setPrivateKey } = privateKeySlice.actions;
export default privateKeySlice.reducer;
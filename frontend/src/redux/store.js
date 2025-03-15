import { configureStore } from "@reduxjs/toolkit";
import preferenceReducer from "./preferencesSlice";
import userReducer from "./userSlice";
import privateKeyReducer from "./privatekey";

const store = configureStore({
    reducer: {
        preference: preferenceReducer,
        user: userReducer,
        privateKey: privateKeyReducer,
    },
});

export default store;

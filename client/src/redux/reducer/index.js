import { combineReducers } from "redux";
import { signInReducer } from "./signInReducer";
import { getItemsReducer } from "./getItemsReducer";
import { searchReducer } from "./searchReducer";
import { registerReducer } from "./registerReducer";
import { itemById } from "./getItemsByIdReducer";
import { kodeProdukReducer } from "./handleKodeReducer";
import { kodeSatuanReducer } from "./handleKodeReducer";

const allReducers = combineReducers({
    signInReducer,
    getItemsReducer,
    searchReducer,
    registerReducer,
    itemById,
    kodeProdukReducer,
    kodeSatuanReducer
})

export default allReducers
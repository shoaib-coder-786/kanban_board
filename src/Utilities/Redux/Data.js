import { createSlice } from "@reduxjs/toolkit";

const assignmentDataSlice = createSlice({
    name: "assignmentData",
    initialState: {
        loading: false,
        data: {
            dataType:"byStatus",
            byStatus: [],
            byUser: [],
            byPriority: [],
            byTitle: [],
        },
        error: null,
    },
    reducers: {
        startLoading: (state) => {
            state.loading = true;
            state.error = null; // Reset error when loading starts
        },
        onSuccess: (state, action) => {
            state.loading = false;
            const { type, data } = action.payload;
            state.data.dataType=type;
            state.data[type] = data;
            state.error = null; // Reset error on success
        },
        onFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        cancelLoading:state=>{
            state.loading=false;
        }
    },
});

export const {
    startLoading,
    onSuccess,
    onFailure,
    clearError,
    cancelLoading
} = assignmentDataSlice.actions;

export default assignmentDataSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/"; // Make sure this path is correct

// Async thunk to fetch applied jobs
export const fetchAppliedJobs = createAsyncThunk(
    'jobs/fetchAppliedJobs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${JOB_API_END_POINT}/applied`, { withCredentials: true });
            return response.data.applications;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch applied jobs');
        }
    }
);

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        loading: false,
        error: null,
    },
    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppliedJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
                state.allAppliedJobs = action.payload;
                state.loading = false;
            })
            .addCase(fetchAppliedJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery
} = jobSlice.actions;

export default jobSlice.reducer;

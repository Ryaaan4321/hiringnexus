import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { jobinterface } from "@/interfaces/jobinterface";
import { getFilteredJobs } from "@/app/actions/jobsserveraction";
import { jobFilters } from "@/interfaces/jobinterface";

interface jobFiltersReduxState {
    jobs: any[]
    filters: jobFilters;
    loading: boolean;
    error: string | null;
}
const initialState: jobFiltersReduxState = {
    jobs: [],
    filters: {},
    loading: false,
    error: null,
};
export const fetchFilteredJobs = createAsyncThunk<
    any[],
    jobFilters,
    { rejectValue: string }
>(
    "filteredJobs/fetch",
    async (filters, thunkAPI) => {
        try {
            const jobs = await getFilteredJobs(filters);
            const safeJobs = jobs.map(job => ({
                ...job,
                createdAt: job.createdAt instanceof Date
                    ? new Date(job.createdAt).toISOString()
                    : job.createdAt,
                timestamps: job.timestamps instanceof Date
                    ? new Date(job.timestamps).toISOString()
                    : job.timestamps
            }));
            return safeJobs;
        } catch (e) {
            return thunkAPI.rejectWithValue("Failed to fetch filtered jobs");
        }
    }
);
const filterdJobsSlice = createSlice({
    name: "filteredJobs",
    initialState,
    reducers: {
        setfilters(state, action: PayloadAction<jobFilters>) {
            state.filters = action.payload
        },
        clearfilteredJobs(state) {
            state.jobs = [],
                state.filters = {};
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilteredJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilteredJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload
            })
            .addCase(fetchFilteredJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string ?? "unknow error"
            }
        )
    }
})
export const { setfilters, clearfilteredJobs } = filterdJobsSlice.actions;
export default filterdJobsSlice.reducer

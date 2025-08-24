import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { getalljobs } from "@/app/actions/jobsserveraction";
import { jobinterface } from "@/interfaces/jobinterface";
export const fetchJobs = createAsyncThunk<jobinterface[]>(
    "jobs/fetchjobs",
    async (_, thunkAPI) => {
        try {
            const jobs = await getalljobs();
            return jobs;
        } catch (err: any) {
            return thunkAPI.rejectWithValue("failed to fetch jobs");
        }
    }
)
interface JobsReduxState {
    jobs: jobinterface[] | [],
    loading: boolean,
    err: string | null
}
const initialState: JobsReduxState = {
    jobs: [],
    loading: false,
    err: null,
};
const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        clearJobs: (state) => {
            state.jobs = [];
            state.err = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true,
                    state.err = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<jobinterface[]>) => {
                state.loading = false;
                state.jobs = action.payload
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload as string
            }
        )
    }
})

export const {clearJobs}=jobsSlice.actions;
export default jobsSlice.reducer
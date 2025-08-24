import { userDetail } from "@/interfaces/userinterface";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { getidOfUser } from "@/app/actions/userserveraction";
import { getDetailsofUser } from "@/app/actions/userserveraction";
import App from "next/app";
interface UserReduxState {
    user: userDetail | null;
    userId: string | null;
    loading: boolean;
    err: string | null;
}
const initialState: UserReduxState = {
    user: null,
    userId: null,
    loading: false,
    err: null
}
export const fetchUser = createAsyncThunk(
    "user/fetchuser",
    async (_, thunkAPI) => {
        try {
            const id = await getidOfUser();
            if (!id) throw new Error("no userr id found");
            const details = await getDetailsofUser(id);
            if (!details) {
                throw new Error("user details not found");
            }
            const safeDetails = {
                ...details,
                alreadyapplied: details.alreadyapplied.map((app: any) => ({
                    ...app,
                    timestamps: app.timestamps instanceof Date
                        ? app.timestamps.toISOString()
                        : app.timestamps,
                }))
            }
            return { id, details:safeDetails };
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || "sorry we are not able to fetch user");
        }
    }
);
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = null;
            state.userId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.err = null;
            })
            .addCase(
                fetchUser.fulfilled,
                (state, action: PayloadAction<{ id: string; details: userDetail | null }>) => {
                    state.userId = action.payload.id;
                    state.user = action.payload.details;
                    state.loading = false;
                }
            )
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.err = action.payload as string;
            }
        )

    }
});
export const { clearUser } = userSlice.actions
export default userSlice.reducer

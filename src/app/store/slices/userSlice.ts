import { getUsers } from "@/src/lib/api/users"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
    params: {
        page: 1,
        per_page: 10,
        total: 0,
        total_pages: 0,
    },
    loading: false,
    message: '',
    processMessage: '',
    success: false,
}

export const fetchUsers = createAsyncThunk<any, FetchPayload, { rejectValue: string }>(
    'users/fetchUsers',
    async ({ params }, { rejectWithValue }) => {
        try {
            const response = await getUsers(params || initialState.params);
            return response;
        } catch (error: any) {
            console.error('Error fetching users:', error);
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsersLoading(state, action) {
            state.loading = action.payload;
        },
        setSuccessUsers(state, action) {
            state.success = action.payload;
        },
        clearMessageUsers(state) {
            state.message = '';
        },
        clearProcessMessageUsers(state) {
            state.processMessage = '';
        }
    },
    extraReducers: (builder) => {
        // Fetch Users
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.message = '';
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.data;
            state.params = {
                page: action.payload.page,
                per_page: action.payload.per_page,
                total: action.payload.total,
                total_pages: action.payload.total_pages,
            }
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.message = action.payload || 'Error al cargar los usuarios';
        });
    }
})

export const { setUsersLoading, setSuccessUsers, clearMessageUsers, clearProcessMessageUsers } = userSlice.actions

export const selectLoadingUsers = (state: any) => state.user.loading
export const selectUsersSuccess = (state: any) => state.user.success
export const selectUsersMessage = (state: any) => state.user.message
export const selectUsersProcessMessage = (state: any) => state.user.processMessage
export const selectUsers = (state: any) => state.user.users

export default userSlice.reducer
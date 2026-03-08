import { getPosts } from "@/src/lib/api/post"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
    loading: false,
    message: '',
    processMessage: '',
    success: false,
}

export const fetchPosts = createAsyncThunk<any, FetchPayload, { rejectValue: string }>(
    'posts/fetchPosts',
    async ({ token }, { rejectWithValue }) => {
        try {

            const response = await getPosts(token);
            return response;

        } catch (error: any) {
            console.error('Error fetching posts:', error);
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setSuccessPost(state, action) {
            state.success = action.payload;
        },
        clearMessagePosts(state) {
            state.message = '';
        },
        clearProcessMessagePosts(state) {
            state.processMessage = '';
        }
    },
    extraReducers: (builder) => {
        // Fetch Posts
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.message = '';
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.message = action.payload || 'Error al cargar los posts';
        });

    }
})

export const { setLoading, setSuccessPost, clearMessagePosts, clearProcessMessagePosts } = postSlice.actions;

export const selectLoadingPosts = (state: any) => state.post.loading;
export const selectSuccessPost = (state: any) => state.post.success;
export const selectMessagePosts = (state: any) => state.post.message;
export const selectProcessMessagePosts = (state: any) => state.post.processMessage;

export default postSlice.reducer;
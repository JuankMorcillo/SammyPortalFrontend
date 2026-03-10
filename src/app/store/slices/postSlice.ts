import { createPost, getMyPosts, getPosts, updatePost } from "@/src/lib/api/post"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PostParams, PostProps } from "../../types/post";

const initialState = {
    posts: [],
    params: {
        userName: '',
        title: '',
        order: 'DESC' as 'ASC' | 'DESC',
    },
    loading: false,
    message: '',
    processMessage: '',
    success: false,
}

export const fetchPosts = createAsyncThunk<any, FetchPayload, { rejectValue: string }>(
    'posts/fetchPosts',
    async ({ token, params }, { rejectWithValue }) => {
        try {

            const response = await getPosts(token || '', params as PostParams);
            return response;

        } catch (error: any) {
            console.error('Error fetching posts:', error);
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }
    }
)

export const fetchMyPosts = createAsyncThunk<any, any, { rejectValue: string }>(
    'posts/fetchMyPosts',
    async ({ id, token, params }, { rejectWithValue }) => {
        try {
            const response = await getMyPosts(id, token, params as PostParams);
            return response;
        } catch (error: any) {
            console.error('Error fetching my posts:', error);
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }
    }
)

export const createPostSlice = createAsyncThunk<any, { post: PostProps, token: string }, { rejectValue: string }>(
    'posts/createPost',
    async ({ post, token }, { rejectWithValue }) => {
        try {
            const response = await createPost(token, post as PostProps);
            return response;
        } catch (error: any) {
            console.error('Error creating post:', error);
            const errorMessage = error || 'Error desconocido';
            return rejectWithValue(errorMessage);
        }
    }
)

export const updatePostSlice = createAsyncThunk<any, { post: PostProps, token: string }, { rejectValue: string }>(
    'posts/updatePost',
    async ({ post, token }, { rejectWithValue }) => {
        try {
            const response = await updatePost(token, post as PostProps);
            return response;
        } catch (error: any) {
            console.error('Error updating post:', error);
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
        setPostParams(state, action) {
            state.params = { ...action.payload };
        },
        setSuccessPost(state, action) {
            state.success = action.payload;
        },
        clearMessagePosts(state) {
            state.message = '';
        },
        clearProcessMessagePosts(state) {
            state.processMessage = '';
        },
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
            state.message = action.payload || 'Error fetching posts';
        });

        // Fetch My Posts
        builder.addCase(fetchMyPosts.pending, (state) => {
            state.loading = true;
            state.message = '';
        });
        builder.addCase(fetchMyPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        });
        builder.addCase(fetchMyPosts.rejected, (state, action) => {
            state.loading = false;
            state.message = action.payload || 'Error fetching my posts';
        });

        // Create Post
        builder.addCase(createPostSlice.pending, (state) => {
            state.loading = true;
            state.processMessage = '';
        });
        builder.addCase(createPostSlice.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.processMessage = 'Post successfully created';
        })
        builder.addCase(createPostSlice.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.processMessage = action.payload || 'Error creating the post';
        });

        // Update Post
        builder.addCase(updatePostSlice.pending, (state) => {
            state.loading = true;
            state.processMessage = '';
        });
        builder.addCase(updatePostSlice.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.processMessage = 'Post successfully updated';
        })
        builder.addCase(updatePostSlice.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.processMessage = action.payload || 'Error updating the post';
        });

    }
})

export const { setLoading, setPostParams, setSuccessPost, clearMessagePosts, clearProcessMessagePosts } = postSlice.actions;

export const selectLoadingPosts = (state: any) => state.post.loading;
export const selectSuccessPost = (state: any) => state.post.success;
export const selectMessagePosts = (state: any) => state.post.message;
export const selectProcessMessagePosts = (state: any) => state.post.processMessage;
export const selectPostParams = (state: any) => state.post.params;
export const selectPosts = (state: any) => state.post.posts;

export default postSlice.reducer;
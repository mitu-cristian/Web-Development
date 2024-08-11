#Improvements

- refactor the slice file from this:
```javascript
const postsSlice = createSlice({
 name: "posts",
 reducers: {
	postAdded(state, action) {
		state.push(action.payload);
}}})
```
to this:
```javascript
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(title, content) {
                return {
                    payload: {
                        title, 
                        content
                    }}}}})
```
Now, the `postAdded` reducer can be called as a function, without passing the object.
- variables can be initialised inside the prepare
```javascript
prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title, 
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0}
                    }
                }
            }
```
- exporting the state inside the slice file
`export const selectAllPosts = (state) => state.posts;`
and import it like this
`import { selectAllPosts } from "./postsSlice";`

# Redux Toolkit with a backend 
## Setup
- `npm install axios`
- `import {createAsyncThunk} from "@reduxjs/toolkit"`
- example for a get request
```javascript
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async() => {
    try {
        const response = await axios.get(POSTS_URL);
        return response.data;
    }
    catch(error) {
        return error.message;
    }
})
```
- add extraReducers in the slice file
```javascript
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {...}.
	extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading";
            }) } } )
```
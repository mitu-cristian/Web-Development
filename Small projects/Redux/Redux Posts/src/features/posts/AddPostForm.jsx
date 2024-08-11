import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {addNewPost} from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);

    const usersOptions = users.map((user) => (
        <option value={user.id} key={user.id}>
            {user.name}
        </option>
    ));

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle";

    const onSavePostClicked = () => {
        if(canSave) {
            try {
                setAddRequestStatus("pending");
                // Due to unwrap, it can throw an error if it is rejected
                dispatch(addNewPost({title, body: content, userId})).unwrap();
                setTitle("");
                setContent("");
                setUserId("");
            }
            catch(error) {
                console.error("Failed to save the post", error);
            }
            finally {
                setAddRequestStatus("idle");
            }
        }
        
    }

  return (
    <section>
        <h2>Add a new post</h2>
        <form>
            <label htmlFor="postTitle">Post title:</label>
            <input type="text" id="postTitle" name="postTitle" value={title}
            onChange = {(event) => setTitle(event.target.value)}/>

            <label htmlFor="postContent">Content:</label>
            <textarea name="postContent" id="postContent" value = {content}
            onChange={(event) => setContent(event.target.value)}></textarea>

            <label htmlFor="postAuthor">Author:</label>
            <select id="postAuthor" value={userId} onChange={(event) => setUserId(event.target.value)}>
                <option value=""></option>
                {usersOptions}
            </select>

            <button type="button" onClick = {onSavePostClicked} disabled = {!canSave} >Save post</button>
        </form>
    </section>

  )
}

export default AddPostForm
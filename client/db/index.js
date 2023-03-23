import { getDatabase, ref, set, push } from "firebase/database";

export const writeUserData = (uid, email) => {
  const db = getDatabase()
  set(ref(db, 'users/' + uid), {
    email: email
  })
}

export const addTodoToDB = (userId, body) => {
  const db = getDatabase();
  const postListRef = ref(db, `tasks/${userId}`);
  const newPostRef = push(postListRef);
  const id = newPostRef._path.pieces_[newPostRef._path.pieces_.length - 1]
  body.id = id
  set(newPostRef, body);
}
import { getDatabase, ref, set, push, remove } from "firebase/database";
const db = getDatabase()

export const writeUserData = (uid, email) => {
  set(ref(db, 'users/' + uid), {
    email: email
  })
}

export const addTodoToDB = (userId, body) => {
  const postListRef = ref(db, `tasks/${userId}`);
  const newPostRef = push(postListRef);
  const id = newPostRef._path.pieces_[newPostRef._path.pieces_.length - 1]
  body.id = id
  set(newPostRef, body);
}

export const addProjectToDB = (userId, body) => {
  const postListRef = ref(db, `projects/${userId}`);
  const newPostRef = push(postListRef);
  const id = newPostRef._path.pieces_[newPostRef._path.pieces_.length - 1]
  body.id = id
  set(newPostRef, body);
}

export const deleteProjectFromDB = (userId, projectId) => {
  remove(ref(db, `projects/${userId}/${projectId}`))
}

export const deleteTaskFromDB = (userId, taskId) => {
  remove(ref(db, `tasks/${userId}/${taskId}`))
}
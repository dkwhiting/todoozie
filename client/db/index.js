import { getDatabase, ref, set, push, remove } from "firebase/database";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/firebase";
const db = getDatabase()


export const registerUser = async ({ email, password }) => {
  const data = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('this is user', user)
      console.log('this is data', data)
      return user
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error)
    });
}

export const loginUser = async ({ email, password }) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password)
    console.log(data)
    return data.user
  } catch (error) {
    console.error(error)
  }


  // await signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //     console.log('this is data', user)
  //     return user
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.error(error)
  //   });
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

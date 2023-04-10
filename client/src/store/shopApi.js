import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getDatabase, ref, set, get, child, push } from "firebase/database";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Users', 'Projects', 'Tasks'],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      async queryFn(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            return { data: user }
          })
          .catch((error) => {
            return {data: error}
          });
      },
      invalidatesTags: (result, error, { uid }) => ['Users'],
    }),
    loginUser: builder.mutation({
      async queryFn({ email, password }) {
        try {
          const response = await signInWithEmailAndPassword(auth, email, password)
          return { data: response.user }
        } catch (err) {
          return { error: err }
        }
      },
      invalidatesTags: (result, error, { uid }) => ['Users', 'Projects', 'Tasks'],
    }),
    logoutUser: builder.mutation({
      async queryFn(){
        signOut(auth).then(() => {
          return {data: 'You are signed out'}
        }).catch((error) => {
          return {data: error}
        });
      },
      invalidatesTags: ['Users', 'Projects', 'Tasks']
    }),
    getProjects: builder.query({
      // since we are using fakeBaseQuery we use queryFn
      async queryFn(userId) {
        try {
          // posts is the collection name
          const dbRef = ref(getDatabase());
          console.log('this is userId',userId)
          let posts = [];
          await get(child(dbRef, `projects/${userId}`)).then((snapshot) => {
            Object.values(snapshot.val()).forEach(project =>{
              posts.push(project);
          })
          });
          return { data: posts };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Projects"],
    }),
    addProject: builder.mutation({
      queryFn(body) {
        try {
          const {userId} = body
          delete body.userId
          const db = getDatabase()
          console.log(userId, body)
          const postListRef = ref(db, `projects/${userId}`);
          const newPostRef = push(postListRef);
          const id = newPostRef._path.pieces_[newPostRef._path.pieces_.length - 1]
          body.id = id
          set(newPostRef, body);
          return {data: newPostRef}
        } catch (error) {
          console.log(error)
          return {data: error}
        }
      },
      invalidatesTags: ['Projects'],
    }),
    getTasks: builder.query({
      // since we are using fakeBaseQuery we use queryFn
      async queryFn(userId) {
        try {
          // posts is the collection name
          const dbRef = ref(getDatabase());
          console.log('this is userId',userId)
          let posts = [];
          await get(child(dbRef, `tasks/${userId}`)).then((snapshot) => {
            Object.values(snapshot.val()).forEach(project =>{
              posts.push(project);
          })
          });
          return { data: posts };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Tasks"],
    }),
    addTask: builder.mutation({
      queryFn(body) {
        try {
          const {userId} = body
          delete body.userId
          const db = getDatabase()
          console.log(userId, body)
          const postListRef = ref(db, `tasks/${userId}`);
          const newPostRef = push(postListRef);
          const id = newPostRef._path.pieces_[newPostRef._path.pieces_.length - 1]
          body.id = id
          set(newPostRef, body);
          return {data: newPostRef}
        } catch (error) {
          console.log(error)
          return {data: error}
        }
      },
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProjectsQuery,
  useAddProjectMutation,
  useGetTasksQuery,
  useAddTaskMutation,
  useLogoutUserMutation
} = shopApi

import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getDatabase, ref, set, get, child, query } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
const userId = auth.currentUser?.uid

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Users', 'Projects'],
  endpoints: (builder) => ({
    getUser: builder.query({
      async queryFn(uid) {
        try {
          const data = await new Promise((resolve, reject) =>
            onValue(
              ref(db, `users/user${uid}`),
              (snapshot) => resolve(snapshot.toJSON()),
              reject
            )
          );
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
    }),
    registerUser: builder.mutation({
      async queryFn(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            return { data: user }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      },
      invalidatesTags: (result, error, { uid }) => ['Users'],
    }),
    loginUser: builder.mutation({

      async queryFn({ email, password }) {
        try {
          console.log('we ARE HERE')
          console.log(email, password, auth)
          const response = await signInWithEmailAndPassword(auth, email, password)
          return { data: response.user }
        } catch (err) {
          return { error: err }
        }

      },
    }),
    getProjects: builder.query({
      async queryFn() {
        try {
          const db = getDatabase();

          const userId = auth
          console.log(userId)
          get(child(db, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
            } else {
              console.log("No data available");
            }
          })
        } catch (error) {
          console.error(error);
        }
      },
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
          [
            ...result.map(({ id }) => ({ type: 'Projects', id })),
            { type: 'Projects', id: 'LIST' },
          ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Projects', id: 'LIST' }` is invalidated
          [{ type: 'Projects', id: 'LIST' }],
    }),
    addProject: builder.mutation({
      query(body) {
        return {
          url: `project`,
          method: 'POST',
          body,
        }
      },
      // Invalidates all Project-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created project could show up in any lists.
      invalidatesTags: [{ type: 'Projects', id: 'LIST' }],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProjectsQuery,
  useAddProjectMutation
} = shopApi

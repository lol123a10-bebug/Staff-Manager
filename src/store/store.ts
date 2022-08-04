import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import staffReducer from "./slices/staff";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    staff: staffReducer,
  },

  middleware: [saga],
});

saga.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

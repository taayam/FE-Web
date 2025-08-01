import { ThunkAction } from "redux-thunk";
import { RootState } from "slices";
import { Action, Dispatch } from "redux";
import { ref, set } from "firebase/database";
import { registerFailed, registerSuccess, resetRegister } from "./reducer";
import { database } from "config/config";

interface User {
  username: string;
  password: string;
}

export const registerUser = (
  user: User
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
  try {
    // Simpan data ke path Akun/{username} dengan key Password
    await set(ref(database, `Akun/${user.username}`), {
      Password: user.password,
    });

    dispatch(registerSuccess(user.username));
  } catch (error: any) {
    dispatch(registerFailed(error.message || "Gagal register"));
  }
};

export const resetRegisterFlag = () => {
  try {
    const response = resetRegister(false);
    return response;
  } catch (error) {
    return error;
  }
};

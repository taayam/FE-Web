import { postFakeLogin } from "helpers/fakebackend_helper";
import { loginError, loginSuccess, logoutSuccess } from "./reducer";
import { ThunkAction } from "redux-thunk";
import { Action, Dispatch } from "redux";
import { RootState } from "slices";
import { getFirebaseBackend } from "helpers/firebase_helper";
import { ref, get } from "firebase/database";
import { database } from "config/config";

interface User {
  email: string;
  password: string;
}

export const loginUser = (
  user: User,
  history: any
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch: Dispatch) => {
  try {
    const userRef = ref(database, `Akun/${user.email}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      throw new Error("User not found");
    }

    const userData = snapshot.val();
    if (userData.Password !== user.password) {
      throw new Error("Incorrect password");
    }

    const response = {
      email: user.email,
      role: "admin",
    };

    localStorage.setItem("authUser", JSON.stringify(response));
    dispatch(loginSuccess(response)); // Pastikan loginSuccess menerima objek
    history("/dashboard");

  } catch (error: any) {
    dispatch(loginError(error.message || "Login failed"));
  }
};


export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    localStorage.removeItem("authUser");

    let fireBaseBackend = await getFirebaseBackend();

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(logoutSuccess(response));
    } else {
      dispatch(logoutSuccess(true));
    }
  } catch (error: any) {
    dispatch(loginError(error.message || "Logout failed"));
  }
};


export const socialLogin = (type: any, history: any) => async (dispatch: any) => {
  try {
    let response: any;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      response = fireBaseBackend.socialLoginUser(type);
    }

    const socialData = await response;

    if (socialData) {
      sessionStorage.setItem("authUser", JSON.stringify(socialData));
      dispatch(loginSuccess(socialData));
      history("/dashboard");
    }

  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Social login failed";
    dispatch(loginError(errorMessage));
  }
};
import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "slices/thunk";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

const useIdleLogout = (timeout: number = 5 * 60 * 1000) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      dispatch(logoutUser());
    }, timeout);
  }, [dispatch, timeout]);

  useEffect(() => {
    const activityEvents = ["mousemove", "keydown", "mousedown", "touchstart"];
    activityEvents.forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      if (timer.current) clearTimeout(timer.current);
      activityEvents.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [resetTimer]); // ✅ sekarang aman, ESLint senang
};

export default useIdleLogout;

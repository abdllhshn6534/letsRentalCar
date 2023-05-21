import React, { useEffect, useState } from "react";
import CustomRoutes from "./router/custom-routes";
import { getUser } from "./api/user-service";
import { useAppDispatch } from "./store/hooks";
import { loginFailed, loginSuccess } from "./store/slices/auth-slice";
import LoadingPage from "./pages/common/loading-page";
import { encryptedLocalStorage } from "./helpers/functions/encrypt-storage";
import { settings } from "./helpers/settings";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const loadData = async () => {
    try {
      const token = encryptedLocalStorage.getItem("token");
      if (token) {
        const resp = await getUser();
        dispatch(loginSuccess(resp.data));
      }
    } catch (err) {
      console.log(err);
      dispatch(loginFailed());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${settings.siteName} | Premium Car Rental`;
    loadData();
  }, []);

  return <div>{loading ? <LoadingPage /> : <CustomRoutes />}</div>;
};

export default App;

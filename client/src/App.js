import HeaderAndContent from "./components/HeaderAndContent";

import { useEffect } from "react";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { loggedInUser } from "./reducers/userSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch(
          loggedInUser({ email: user.email, token: idTokenResult.token })
        );
      }
    });

    return () => unsubscribe();
  }, []);

  return <HeaderAndContent />;
};

export default App;

import HeaderAndContent from "./components/HeaderAndContent";

import { useEffect } from "react";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { loggedInUser } from "./reducers/userSlice";
import { createOrGetUser } from "./functions/auth";

const App = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const idTokenResult = await user.getIdTokenResult();

          const dbRes = await createOrGetUser(idTokenResult.token);
          console.log("create or get user res: ", dbRes);

          dispatch(
            loggedInUser({
              id: dbRes.data.id,
              email: dbRes.data.email,
              role: dbRes.data.role,
              token: idTokenResult.token,
            })
          );
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  });

  return <HeaderAndContent />;
};

export default App;

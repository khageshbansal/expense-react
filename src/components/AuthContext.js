import React, { useState } from 'react';

const MyContext = React.createContext();

function AuthProvider(props) {
  let [token, setToken] = useState(null);

  var obj = {
    token: token,
    isLogged: token ? true : false,
    Login: (tokenReceived) => {
      setToken(tokenReceived);
    },
    Logout: () => {
      setToken(null);
    },
  };

  return (
    <>
      <MyContext.Provider value={obj}>{props.children}</MyContext.Provider>
    </>
  );
}

export { AuthProvider, MyContext };

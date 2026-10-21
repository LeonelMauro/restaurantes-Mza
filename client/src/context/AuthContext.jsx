import { createContext, useContext, useEffect, useState } from "react";

// 1. Creamos el Context
const AuthContext = createContext();

//2. Provider : es el compinente que va a compartir
// la infotmacion de autenticación con to la aplicación.

export const AuthProvider = ({children}) =>{

  //Usuario actualmente autenticado
  const [user,setUser] = useState(null);

  //Token JWT
  const [token,setToken] = useState(null);

  //Indica si todavía estamos comprobando
  //si existe una sesión guardada.
  const [loading, setLoading] = useState(true);

  //3. Cuando React carga el AuthProvider,
  //buscamos una sesión que haya quedado guardada.
  useEffect(() =>{
    
    const storedToken = localStorage.getItem('token');

    const storeUser = localStorage.getItem('user');

    if(storedToken && storeUser){
      setToken(storedToken);
      setUser(JSON.parse(storeUser));
    }
    
    setLoading(false);
  },[]);

  //4. Función para iniciar sesión 
  const login = (userData, accessToken) =>{
    
    setUser(userData);
    setToken(accessToken);

    //Guardamos la sesión para que sobreviva
    //aunque el usuario recargue la páguina.
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
    localStorage.setItem(
      "token",
      accessToken,
    )
  }
  
  // 5. Funcion para cerrar sesión
  const logout = () =>{
    
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  // 6. Información que vamos a compartir 
  //con todos los componentes

  return(
    <AuthContext.Provider
    value={{
      user,
      token,
      loading,
      login,
      logout
    }} >
      {children}
    </AuthContext.Provider>
  )
}

//7. Hook personalizado para utilizar
// nuestro Context facilmente.
export const useAuth = ()=>{
  return useContext(AuthContext);
}
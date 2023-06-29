import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { useContext, useEffect } from "react";
import { GlobalProvider } from "./Context/GlobalContext";
import { GlobalContext } from "./Context/GlobalContext";

function App() {

  const {theme, toggleTheme} = useContext(GlobalContext)

  useEffect(() => {
    localStorage.setItem("theme", theme);
  },[])

  useEffect(() => {
    localStorage.setItem("theme", theme);
  },[theme])

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
      // está em dark mode e deverá utilizar a classe dark ou light */}
      <div className={`app light}`}>
        <GlobalProvider>
          <Navbar />
          <main>
            {/* Envolve o Outlet com o AuthProvider */}
              <Outlet />
          </main>
        </GlobalProvider>
        <Footer />
      </div>
    </>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./Context/ThemeContext";

function App() {

  const {theme, toggleTheme} = useContext(ThemeContext)

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
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

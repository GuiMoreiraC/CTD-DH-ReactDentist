import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { useContext } from "react";
import { GlobalContext } from "./Context/GlobalContext";

function App() {

  const {theme} = useContext(GlobalContext)

  return (
        /* Na linha seguinte deverá ser feito um teste se a aplicação
        está em dark mode e deverá utilizar a classe dark ou light */
          <div className={`app ${theme === 'light' ? 'light' : 'dark'}`}>
            <Navbar />
              <main>
                {/* Envolve o Outlet com o AuthProvider */}
                <Outlet />
              </main>
            <Footer />
          </div>
  );
}

export default App;

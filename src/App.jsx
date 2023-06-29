import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { ApiDataProvider } from "./Context/ApiDataContext";
import { AuthProvider } from "./Context/AuthContext"; // Importe o AuthProvider

function App() {
  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a classe dark ou light */}
      <div className={`app light}`}>
        <AuthProvider>
          <Navbar />
          <main>
            {/* Envolve o Outlet com o AuthProvider */}
            <ApiDataProvider>
              <Outlet />
            </ApiDataProvider>
          </main>
        </AuthProvider>
        <Footer />
      </div>
    </>
  );
}

export default App;

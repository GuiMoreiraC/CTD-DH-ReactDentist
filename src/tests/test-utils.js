import { render } from "@testing-library/react"
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom"
import { GlobalProvider } from "../Context/GlobalContext"
import Home from "../Routes/Home"
import Detail from "../Routes/Detail"
import Login from "../Routes/Login"
import App from "../App"


const renderWithContext = (ui)=>{
    return render(
        <BrowserRouter>
            <GlobalProvider>   
                {ui}
            </GlobalProvider>
        </BrowserRouter>
    )
}

//Only for testing individual routes as /dentist/:id
export const renderWithRouter = (ui, {route = '/', path='/'}) => {
    window.history.pushState({}, 'Test page', route)

    return render(
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route index path={path} element={ui}/>
            </Routes>
        </MemoryRouter>
    )
}

export * from "@testing-library/react"
export {renderWithContext as render}  
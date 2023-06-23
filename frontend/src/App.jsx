import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { routes } from './pather'
const router = createBrowserRouter(routes)
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import PropertyList from './pages/PropertyList'
import Header from './components/Header'

export default function App() {
  return <BrowserRouter>
  < Header />
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="/property-list" element={<PropertyList />} />
    </Routes>
  </BrowserRouter>
}

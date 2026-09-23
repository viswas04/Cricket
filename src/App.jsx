import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Categories from './pages/Categories'
import Grades from './pages/Grades'
import Facilities from './pages/Facilities'
import Prizes from './pages/Prizes'
import Venue from './pages/Venue'
import Register from './pages/Register'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App

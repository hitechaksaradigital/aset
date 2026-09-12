import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import DashboardPage from './pages/DashboardPage'
import KatalogAsetPage from './pages/KatalogAsetPage'
import PlaceholderPage from './pages/PlaceholderPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
        <Sidebar />
        <div className="pl-64">
          <Header />
          <main className="relative pt-16 bg-surface min-h-[calc(100vh-3.5rem)] w-full px-space-lg py-space-md">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/katalog-aset" element={<KatalogAsetPage />} />
              <Route path="*" element={<PlaceholderPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}
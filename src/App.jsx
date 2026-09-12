import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="relative pt-16 bg-surface min-h-[calc(100vh-3.5rem)] w-full px-space-lg py-space-md">
          <DashboardPage />
        </main>
        <Footer />
      </div>
    </div>
  )
}
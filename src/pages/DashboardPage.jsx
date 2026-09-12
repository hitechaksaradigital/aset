import PageHeader from '../components/dashboard/PageHeader'
import KpiCards from '../components/dashboard/KpiCards'
import DepreciationChart from '../components/dashboard/DepreciationChart'
import AllocationDonut from '../components/dashboard/AllocationDonut'
import AlertsTable from '../components/dashboard/AlertsTable'
import QuickActions from '../components/dashboard/QuickActions'

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full gap-space-lg">
      <PageHeader />
      <KpiCards />
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-space-md">
        <DepreciationChart />
        <AllocationDonut />
      </section>
      <AlertsTable />
      <QuickActions />
    </div>
  )
}
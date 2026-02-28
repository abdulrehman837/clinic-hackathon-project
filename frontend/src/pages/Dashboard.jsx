import { useSelector } from 'react-redux'
import AdminDashboard from './AdminDashboard'
import DoctorDashboard from './DoctorDashboard'
import ReceptionistDashboard from './ReceptionistDashboard'
import PatientDashboard from './PatientDashboard'

const dashboards = { admin: AdminDashboard, doctor: DoctorDashboard, receptionist: ReceptionistDashboard, patient: PatientDashboard }

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const Comp = dashboards[user?.role] || PatientDashboard
  return <Comp />
}

export default Dashboard

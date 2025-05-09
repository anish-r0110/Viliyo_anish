
import { AppPage } from '@/layouts/types'
import DashboardPage from './dashboard'


const HomePage:AppPage = () => {
  return (
   <DashboardPage />
  )
}

export default HomePage;

HomePage.Layout = 'Admin';



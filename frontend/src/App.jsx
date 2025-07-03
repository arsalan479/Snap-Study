// import { Routes, Route } from 'react-router-dom';
// import Checkauthgooglegithub from './UserScreensPage/Checkauthgooglegithub';
// import Googleinput from './UserScreensPage/Googleinput';
// import { GoogleOTP } from './UserScreensPage/GoogleOTP';
// import Dashboard from './UserScreensPage/Dashboard';
// import ProtectedRoute from "./ProtectAndPublicRoutes/ProtectedRoute";
// import PublicRoute from './ProtectAndPublicRoutes/PubliRoute';
// import AdminDashboard from './AdminScreenPages/AdminDashboard';
// import GoogleLogin from './UserScreensPage/GoogleLogin';
// import ResetPassword from './UserScreensPage/ResetPassword';
// import MainQuizCardFile from './UserScreensPage/QuizCardSystem/MainQuizCardFile';
// import MainFlashCardSystem from './UserScreensPage/FlashCardSystem/MainFlashCardSystem';
// import FetchQuizCard from './UserScreensPage/QuizCardSystem/FetchQuizCard';
// import DashboardLayoutBasic from './Components/UserDashboard/UserDashboardCards';
import UserRoute from './Routes/UserRoute';
import { Toaster } from 'react-hot-toast';


function App() {
 
  return (
    <>

    <Toaster position='top-center' reverseOrder={false} />

    {/* <Routes>

<Route path='/quizcard' element={<MainQuizCardFile/>} />
<Route path='/flashcard' element={<MainFlashCardSystem/>} />              
<Route path='/quizcardhistory' element={<FetchQuizCard/>} />              
<Route path='/userdashboard' element={<DashboardLayoutBasic/>}/>
      <Route path="/" element={
        <PublicRoute>
          <Checkauthgooglegithub/>
        </PublicRoute>
      }/>
      <Route path="/googleregister" element={
        <PublicRoute>
          <Googleinput/>
        </PublicRoute>
      }/>
      <Route path="/googleOTP" element={
        <PublicRoute>
          <GoogleOTP/>
        </PublicRoute>
      }/>
      <Route path="/dashboard" element={
          <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>}/>

        
      <Route path='/AdminDashboard' element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />

        <Route path='/googlelogin' element={
          <PublicRoute>
            <GoogleLogin/>
          </PublicRoute>
          
          }  />

          <Route path='/resetpassword/:token' element={
            <PublicRoute>
              <ResetPassword/>

            </PublicRoute>
              } />


              


    </Routes> */}


<UserRoute/>
    
    </>
    
  );
}

export default App;

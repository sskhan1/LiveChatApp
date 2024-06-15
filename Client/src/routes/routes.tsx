import { Route, Routes } from 'react-router-dom';
import SignUp from '../pages/Signup';


function AppRoutes() {
    return (
        <div className="App">
    
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      );
}

export default AppRoutes
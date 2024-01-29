import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LogIn/LoginPage"
import SignUpPage from "./Components/SignUp/SignUpPage"
import TaskPlannerPage from './Components/Task/TaskPlannerPage';


function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/SignUpPage" element={<SignUpPage/>}/>
        <Route path="/AddTask/:UserId" element={<TaskPlannerPage />} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;

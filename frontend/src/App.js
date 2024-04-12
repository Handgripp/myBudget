import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import CreateUser from './components/CreateUser/CreateUser';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Login from './components/LoginForm/LoginForm';

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:budgetId" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const { isUserAuthenticated } = useAuth()
  return (
    <div className="App">
      <BrowserRouter>
        {isUserAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </BrowserRouter>
    </div>
  )
}

export default App;

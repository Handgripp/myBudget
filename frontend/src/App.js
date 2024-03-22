import { useAuth } from './AuthProvider';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home'
import CreateUser from './components/CreateUser/CreateUser'
import Login from './components/LoginForm/LoginForm'
import Dashboard from './components/Dashboard/Dashboard'

const ProtectedRoute = ({ isLoggedIn, redirectPath = "/", children }) => {
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

function App() {
  const { isLoggedIn } = useAuth()

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

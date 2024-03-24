import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import CreateUser from './components/CreateUser/CreateUser';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Login from './components/LoginForm/LoginForm';


const AuthenticatedApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

const UnauthenticatedApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  const { isUserAuthenticated } = useAuth()
  console.log(isUserAuthenticated)
  return (
    <div className="App">
      {isUserAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App

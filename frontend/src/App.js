import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtocolDetail from './pages/ProtocolDetail';
import ArticleDetail from './pages/ArticleDetail';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header/>
          <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path = "/login" element={<Login/>}></Route>
            <Route path = "/register" element={<Register/>}></Route>
            <Route path = "/protocol/:protocolId" element = {<ProtocolDetail/>}></Route>
            <Route path = "/article/:articleId" element = {<ArticleDetail/>}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import SessionProvider from './Context/SessionContext';

function App() {
  return (
    <div className='container'>
      <SessionProvider>
        <RouterProvider router={router} />
      </SessionProvider>
    </div>
  )
}

export default App
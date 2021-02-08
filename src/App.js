import Login from './Components/Login';
import Dash from './Components/Dash';
import Customize from './Components/Customize';
import Nav from './Components/Nav';
import './App.css';
import routes from './routes';

function App() {
  return (
    <div className="App">
      <Nav />
      {routes}
    </div>
  );
}

export default App;

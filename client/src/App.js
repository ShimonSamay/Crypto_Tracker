import ReducersProvider from "./Contexts/Context";
import Home from "./Components/Pages/Home";
import Info from "./Components/Pages/Info";
import './App.css';


function App() {
  return (
    <div className="App">
      <ReducersProvider>
       <Info/>
      </ReducersProvider>
    </div>
  );
}

export default App;

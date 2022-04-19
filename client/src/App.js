import ReducersProvider from "./Contexts/Context";
import HomePage from "./Components/Pages/HomePage";
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

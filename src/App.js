import Users from "./components/Users";
import './css/App.css'

function App() {
  const clickhandler = name => console.log("delete", name);
  return (
    <div className="App">
      <Users click = {clickhandler}/>
    </div>
  );
}

export default App;

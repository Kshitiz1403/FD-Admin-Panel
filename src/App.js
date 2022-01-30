import Button from "./components/shared/Button";
import Users from "./components/Users";
import './css/App.css'

function App() {
  const clickhandler = name => console.log("delete", name);
  return (
    <div className="App">
      <Users click = {clickhandler}/>
      {/* <Button text="Update" containerStyles={{}} textStyles={{}} empty onClick={()=>{}}/> */}
    </div>
  );
}

export default App;

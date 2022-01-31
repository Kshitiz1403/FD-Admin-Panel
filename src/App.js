import Button from "./components/shared/Button";
import Users from "./components/Users";
import colors from "./constants/colors";
import './css/App.css'

function App() {
  const clickhandler = name => console.log("delete", name);
  return (
    <div className="App" style={{backgroundColor:colors.background}}>
      <Users click = {clickhandler}/>
      {/* <Button text="Update" containerStyles={{}} textStyles={{}} empty onClick={()=>{}}/> */}
    </div>
  );
}

export default App;

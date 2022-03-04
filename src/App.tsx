import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContexts";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" exact component={NewRoom} />
      </AuthContextProvider>
    </Router>
  );
}

export default App;

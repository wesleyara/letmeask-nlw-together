import {
  BrowserRouter as Router,
  Switch as Routes,
  Route,
} from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContexts";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;

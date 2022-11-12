import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Screens/Home";
import NotFound from "./Components/NotFound";
import RequireAuth from "./RequireAuth";
import LoginScreen from "./Screens/LoginScreen";
import ChatScreen from "./Screens/ChatScreen";
import NavBarComponent from "./Components/NavBarComponent";
import Landing from "./Screens/Landing";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBarComponent />
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<ChatScreen />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

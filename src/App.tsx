import { BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Users from "./pages/Users";
import Posts from "./pages/Posts";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
       
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

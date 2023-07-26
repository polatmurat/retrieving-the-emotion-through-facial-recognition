import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FaceDetectionComponent from "./pages/FaceDetectionComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangeMood from "./pages/ChangeMood";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<FaceDetectionComponent />} />
            <Route path="/mood" element={<ChangeMood />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

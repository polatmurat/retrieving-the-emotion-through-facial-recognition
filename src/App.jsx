import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FaceDetectionComponent from "./components/FaceDetectionComponent";
import { ToastContainer } from "react-toastify";
import ChangeMood from "./components/ChangeMood";

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

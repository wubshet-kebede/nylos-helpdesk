import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";

function HomePage() {
  return <div className="min-h-screen">{/* Landing page will go here */}</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public application layout */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

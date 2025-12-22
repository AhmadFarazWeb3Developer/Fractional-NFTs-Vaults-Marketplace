import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-full bg-[#0B0E14] sm:px-12  ">
      <Outlet />
    </div>
  );
}

export default App;

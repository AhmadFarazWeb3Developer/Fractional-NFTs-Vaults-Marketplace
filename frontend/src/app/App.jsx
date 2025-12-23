import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-full bg-black sm:px-12  ">
      <Outlet />
    </div>
  );
}

export default App;

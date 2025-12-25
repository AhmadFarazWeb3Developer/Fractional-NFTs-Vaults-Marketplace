import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <div className="w-full bg-black font-bakbak  sm:px-12  ">
        <Outlet />
      </div>
      <Toaster position="top-center" richColors={false} />
    </>
  );
}

export default App;

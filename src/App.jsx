import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import { RecoilRoot } from "recoil";
import AppLayout from "./Layouts/AppLayout";
import PinRequests from "./pages/PinRequests";
import PendingRequests from "./pages/PendingRequests";
import CreatePlan from "./pages/CreatePlan";
import GeneratePins from "./pages/GeneratePins";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard/pin-requests" element={<PinRequests />} />
          <Route
            path="/dashboard/pending-requests"
            element={<PendingRequests />}
          />
          <Route path="/dashboard/create-plan" element={<CreatePlan />} />
          <Route path="/dashboard/generate-pins" element={<GeneratePins />} />
        </Route>
      </>
    )
  );

  return (
    <div className="max-w-screen">
      <RecoilRoot>
        <RouterProvider router={router} />
        <Toaster />
      </RecoilRoot>
    </div>
  );
}

export default App;

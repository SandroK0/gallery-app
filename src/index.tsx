import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Main from "./Pages/Main";
import History from "./Pages/History";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Main></Main>}></Route>
      <Route path="history" element={<History></History>}></Route>
    </Route>
  )
);
export const queryClient = new QueryClient();



root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>;
  </QueryClientProvider>
);

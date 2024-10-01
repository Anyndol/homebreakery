import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./shared/AuthProvider";
import Layout from "./components/Layout";
import MyStuff from "./components/MyStuff";
import AdversaryList from "./components/adversaries/AdversaryList";
import AdversaryDetail from "./components/adversaries/AdversaryDetail";
import SpeciesList from "./components/species/SpeciesList";
import SpeciesDetail from "./components/species/SpeciesDetail";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { useColorScheme } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider />,
    children: [
      {
        path: "/",
        element:<Layout />,
        children: [
          {
            path:"adversaries",
            element:<AdversaryList />
          },
          {
            path:"adversaries/:id",
            element:<AdversaryDetail />
          },
          {
            path:"species",
            element:<SpeciesList />
          },
          {
            path:"species/:id",
            element:<SpeciesDetail />
          },
          /*{
            path:"callings",
            element:<div>This is the callings page</div>
          },*/
          {
            path:"mystuff",
            element:<MyStuff />
          }
        ]
      }
    ]
  },
]);

function App() {
  const {setMode} = useColorScheme();
  setMode('light');
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App

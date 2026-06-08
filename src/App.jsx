import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchResults from "./Pages/SearchResults";
import AppLayout from "./Layout/AppLayout";
import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Favorites from "./Pages/Favorites";
import ErrorPage from "./Pages/ErrorPage";
import Hollywood from "./Pages/Hollywood";
import Bollywood from "./Pages/Bollywood";
import Korean from "./Pages/Korean";
import Japanese from "./Pages/Japanese";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "movie/:id",
        element: <MovieDetails />,
      },

      {
        path: "favorites",
        element: <Favorites />,
      },
      {
  path: "search/:query",
  element: <SearchResults />,
},

      {
        path: "hollywood",
        element: <Hollywood />,
      },

      {
        path: "bollywood",
        element: <Bollywood />,
      },

      {
        path: "korean",
        element: <Korean />,
      },

      {
        path: "japanese",
        element: <Japanese />,
      },
      {
  path: "*",
  element: <ErrorPage />,
}
    ],
  },
]);

function App() {
  const [loading, setLoading] =
  useState(true);

useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 2500);
}, []);

if (loading) {
  return <SplashScreen />;
}
  return <RouterProvider router={router} />;
}

export default App;
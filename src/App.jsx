import { useState, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";

// if something tries to render details, panic and load details.
// Vite smart enough to know it doesnt need it on initial page load so wont load it right away
const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

// Infinity meaning once you fetch something, do not refetch it for the whole "session"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className="loading-pane">
              <h2 className="loader">🦔</h2>
            </div>
          }
        >
          <AdoptedPetContext.Provider value={adoptedPet}>
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

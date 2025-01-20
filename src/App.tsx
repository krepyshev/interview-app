import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";
import ProtectedRoute from "./components/ProtectedRoute";
import { Suspense, useEffect } from "react";
import Header from "./components/Header";
import { useAuthStore } from "./store/auth";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map(
            ({ path, component: Component, private: isPrivate, role }) => {
              if (isPrivate) {
                return (
                  <Route key={path} element={<ProtectedRoute role={role} />}>
                    <Route path={path} element={<Component />} />
                  </Route>
                );
              }
              return <Route key={path} path={path} element={<Component />} />;
            }
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

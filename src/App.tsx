import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";
import ProtectedRoute from "./components/ProtectedRoute";
import { Suspense, useEffect } from "react";
import { useAuthStore } from "./store/auth";
import PageLayout from "./layouts/PageLayout/PageLayout";
import { useThemeStore } from "./store/theme";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isLoading = useAuthStore((state) => state.isLoading);
  const setInitialTheme = useThemeStore((state) => state.setInitialTheme);

  useEffect(() => {
    setInitialTheme();
  }, [setInitialTheme]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <PageLayout>
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
        </PageLayout>
      </Suspense>
    </Router>
  );
}

export default App;

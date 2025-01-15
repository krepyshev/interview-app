import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";
import PrivateRoute from "./components/PrivateRoute";
import { Suspense } from "react";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map(
            ({ path, component: Component, private: isPrivate, role }, idx) => {
              if (isPrivate) {
                return (
                  <Route key={idx} element={<PrivateRoute role={role} />}>
                    <Route path={path} element={<Component />} />
                  </Route>
                );
              }
              return <Route key={idx} path={path} element={<Component />} />;
            }
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

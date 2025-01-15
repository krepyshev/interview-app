import { lazy } from "react";

const Categories = lazy(() => import("../pages/Categories"));
const Questions = lazy(() => import("../pages/Questions"));
const Login = lazy(() => import("../pages/Login/Login"));

type Route = {
  path: string;
  component: React.ComponentType;
  private?: boolean;
  role?: "user" | "admin";
};

export const routes: Route[] = [
  { path: "/", component: Categories },
  {
    path: "/questions/:category",
    component: Questions,
    private: true,
  },
  { path: "/login", component: Login },
  {
    path: "/admin",
    component: lazy(() => import("../pages/Admin")),
    private: true,
    role: "admin",
  },
];

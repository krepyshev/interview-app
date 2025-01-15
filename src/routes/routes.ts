import { lazy } from "react";

const Categories = lazy(() => import("../pages/Categories"));
const Questions = lazy(() => import("../pages/Questions"));
const Login = lazy(() => import("../pages/Login"));

export const routes = [
  { path: "/", component: Categories },
  { path: "/questions/:category", component: Questions },
  { path: "/login", component: Login },
];

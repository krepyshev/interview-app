import { lazy } from "react";

const Categories = lazy(() => import("../pages/Categories/Categories"));
const Questions = lazy(() => import("../pages/Questions/Questions"));
const QuestionPage = lazy(() => import("../pages/QuestionPage/QuestionPage"));
const Login = lazy(() => import("../pages/Login/Login"));
const Admin = lazy(() => import("../pages/Admin/Admin"));
const Register = lazy(() => import("../pages/Register/Register"));

export type Route = {
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
  {
    path: "/question/:id",
    component: QuestionPage,
    private: true,
  },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/admin",
    component: Admin,
    private: true,
    role: "admin",
  },
];

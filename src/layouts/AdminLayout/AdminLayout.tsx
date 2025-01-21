import { ReactNode } from "react";
import styles from "./AdminLayout.module.scss";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <div className={styles.layout}>{children}</div>;
};

export default AdminLayout;

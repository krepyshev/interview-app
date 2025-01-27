import { ReactNode } from "react";
import styles from "./PageLayout.module.scss";
import Header from "../../components/Header/Header";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={styles.pageLayout}>
      <Header />
      <Breadcrumbs />
      {children}
      <footer className={styles.pageLayout__footer}>
        © 2025 InterviewApp
      </footer>
    </div>
  );
};

export default PageLayout;

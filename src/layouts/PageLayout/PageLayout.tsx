import { ReactNode } from "react";
import styles from "./PageLayout.module.scss";
import Header from "../../components/Header/Header";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={styles.pageLayout}>
      <Header />
      {children}
      <footer className={styles.pageLayout__footer}>
        © 2025 InterviewApp
      </footer>
    </div>
  );
};

export default PageLayout;

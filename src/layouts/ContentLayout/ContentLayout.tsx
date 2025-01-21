import { ReactNode } from "react";
import styles from "./ContentLayout.module.scss";

interface ContentLayoutProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return <div className={styles.contentLayout}>{children}</div>;
};

export default ContentLayout;

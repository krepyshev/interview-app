import { FC } from "react";
import styles from "./QuestionCard.module.scss";
import { FaExternalLinkAlt } from "react-icons/fa";

interface QuestionCardProps {
  title: string;
  timeToLearn: number;
  difficulty: string;
  onOpen: () => void;
}

const QuestionCard: FC<QuestionCardProps> = ({
  title,
  timeToLearn,
  difficulty,
  onOpen,
}) => {
  return (
    <div className={styles.card} onClick={onOpen}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.time}>
        Время: <strong>{timeToLearn} мин</strong>
      </p>
      <div className={styles.footer}>
        <span className={`${styles.difficulty} ${styles[difficulty]}`}>
          {difficulty}
        </span>
        <FaExternalLinkAlt className={styles.icon} />
      </div>
    </div>
  );
};

export default QuestionCard;

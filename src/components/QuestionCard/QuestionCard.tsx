import { FC } from "react";
import styles from "./QuestionCard.module.scss";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface QuestionCardProps {
  _id: string;
  title: string;
  timeToLearn: number;
  difficulty: string;
  onOpen: () => void;
}

const QuestionCard: FC<QuestionCardProps> = ({
  _id: id,
  title,
  timeToLearn,
  difficulty,
  onOpen,
}) => {
  const navigate = useNavigate();
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
        <FaExternalLinkAlt
          className={styles.icon}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/question/${id}`);
          }}
        />
      </div>
    </div>
  );
};

export default QuestionCard;

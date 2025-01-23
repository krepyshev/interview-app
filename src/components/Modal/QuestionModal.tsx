import { FC } from "react";
import Modal from "./Modal";
import styles from "./QuestionModal.module.scss";

interface QuestionModalProps {
  title: string;
  text: string;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuestionModal: FC<QuestionModalProps> = ({
  title,
  text,
  onClose,
  onNext,
  onPrevious,
}) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <div className={styles.actions}>
          <button onClick={onPrevious}>Предыдущий</button>
          <button onClick={onNext}>Следующий</button>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;

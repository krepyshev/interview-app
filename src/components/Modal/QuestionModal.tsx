import { FC } from "react";
import Markdown from "markdown-to-jsx";
import CodeBlock from "../../components/CodeBlock/CodeBlock"; // Подключаем наш компонент подсветки кода
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
        <Markdown
          options={{
            overrides: {
              code: {
                component: CodeBlock, // Передаём компонент для подсветки
              },
            },
          }}
          className={styles.text}
        >
          {text}
        </Markdown>
        <div className={styles.actions}>
          <button onClick={onPrevious}>Предыдущий</button>
          <button onClick={onNext}>Следующий</button>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;

import { FC, useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import CodeBlock from "../../components/CodeBlock/CodeBlock";
import Modal from "./Modal";
import styles from "./QuestionModal.module.scss";

interface Question {
  _id: string;
  title: string;
  text: string;
  category: string;
  difficulty: string;
  timeToLearn: number;
}

interface QuestionModalProps {
  question: Question;
  isAdmin: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSave: (updatedQuestion: Question) => Promise<void>;
}

const QuestionModal: FC<QuestionModalProps> = ({
  question,
  isAdmin,
  onClose,
  onNext,
  onPrevious,
  onSave,
}) => {
  const [title, setTitle] = useState(question.title);
  const [text, setText] = useState(question.text);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    setTitle(question.title);
    setText(question.text);
  }, [question]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrevious]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    await onSave({
      ...question,
      title,
      text,
      timeToLearn: Math.ceil(text.trim().split(/\s+/).length / 200),
    });

    setIsSaving(false);
    setSaveMessage("Сохранено ✅");

    setTimeout(() => {
      setSaveMessage(null);
      setIsEditing(false);
    }, 1500);
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={styles.modal}>
        {isAdmin && !isEditing && (
          <button className={styles.editButton} onClick={handleEditClick}>
            ✏️ Редактировать
          </button>
        )}

        {isAdmin && isEditing ? (
          <form onSubmit={handleSubmit}>
            <label>Заголовок:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Текст:</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit" disabled={isSaving}>
              {isSaving ? "Сохранение..." : "Сохранить"}
            </button>
            {saveMessage && <p className={styles.saveMessage}>{saveMessage}</p>}
          </form>
        ) : (
          <>
            <h2 className={styles.title}>{question.title}</h2>
            <Markdown
              options={{ overrides: { code: { component: CodeBlock } } }}
              className={styles.text}
            >
              {question.text}
            </Markdown>
          </>
        )}

        <div className={styles.actions}>
          <button onClick={onPrevious}>← Предыдущий</button>
          <button onClick={onNext}>Следующий →</button>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;

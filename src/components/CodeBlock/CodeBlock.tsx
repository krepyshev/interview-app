import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Тема подсветки

interface CodeBlockProps {
  className?: string; // Для указания языка (например, lang-js)
  children: string; // Код внутри блока
}

const CodeBlock = ({ className, children }: CodeBlockProps) => {
  const language = className?.replace("lang-", "") || "plaintext"; // Определяем язык из класса
  const highlightedCode = hljs.highlight(language, children).value; // Подсвечиваем код

  return (
    <pre>
      <code
        className={`hljs language-${language}`}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </pre>
  );
};

export default CodeBlock;

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

interface CodeBlockProps {
  className?: string;
  children: string;
}

const CodeBlock = ({ className, children }: CodeBlockProps) => {
  const language = className?.replace("lang-", "") || "plaintext";
  const highlightedCode = hljs.highlight(language, children).value;

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

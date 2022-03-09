import { QuestionProps } from "../../@types";
import { SQuestion, SUserInfo } from "../../styles/SQuestion";

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  return (
    <SQuestion
      className={`${isAnswered == true ? "answered" : ""} ${
        isHighlighted == true && isAnswered == false ? "highlighted" : ""
      }`}
    >
      <p>{content}</p>
      <footer>
        <SUserInfo>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </SUserInfo>
        <div>{children}</div>
      </footer>
    </SQuestion>
  );
}

import { QuestionProps } from "../../@types";
import { SQuestion } from "../../styles/SQuestion";
import { SUserInfo } from "../../styles/SQuestion";

export function Question({ content, author }: QuestionProps) {
  return (
    <SQuestion>
      <p>{content}</p>
      <footer>
        <SUserInfo>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </SUserInfo>
        <div></div>
      </footer>
    </SQuestion>
  );
}

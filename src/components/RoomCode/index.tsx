import { SCodeButton } from "../../styles/SCodeButton";
import copyImg from "../../assets/images/copy.svg";
import { RoomCodeProps } from "../../@types";

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToCLipBoard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <SCodeButton onClick={copyRoomCodeToCLipBoard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </SCodeButton>
  );
}

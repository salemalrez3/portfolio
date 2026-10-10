import Cabinet from "../components/Cabinet";
import Board from "../components/Board";
import Clue from "../components/Clue";
import Vault from "../components/Vault";
import Television from "../components/Television";
import BoxStack from "../components/BoxStack";
import RoomClock from "../components/RoomClock";
import Desk from "../components/Desk";

export default function HomePage({ onOpenMap }: { onOpenMap: () => void }) {
  return (
    <div >
      <div className="wall" />
      <Board onOpenMap={onOpenMap} />
      <div className="ground" />
      <BoxStack />
      <Vault />
      <Clue />
      <div className="cabinet-holder"><Cabinet /></div>
      <Television />
       <Desk />         
      <RoomClock />
      <div className="junction-shadow" />
      <div className="baseboard" />
      <div className="lamp" />
    </div>
  );
}

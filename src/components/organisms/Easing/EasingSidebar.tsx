import { easingFunctionKeys } from "@/lib/utils/easing/easingFunctions";
import { animationTypes } from "@/lib/utils/easing/easingFrame";
import { EasingFunction } from "@/class/EasingControl";
import Dropdown, { type DropdownProps } from "@/components/atoms/Dropdown";
import DefaultButton from "@/components/atoms/buttons/DefaultButton";
import Graph from "@/components/atoms/Graph";

export type EasingSidebarProps = {
  selectEasingFunction: DropdownProps["onClick"];
  easingFunction: EasingFunction | undefined;
  isPlaying: boolean;
  play: () => void;
  selectType: (idx: number) => void;
};
export default function EasingSidebar({
  isPlaying,
  selectEasingFunction,
  easingFunction,
  play,
  selectType,
}: EasingSidebarProps) {
  return (
    <div className="p-4 border-slight border-primary flex flex-1 flex-col bg-background-alpha">
      <div className="flex flex-col">
        <Dropdown
          className="z-10"
          placeholder="Select Easing"
          items={easingFunctionKeys.map((title) => ({ title }))}
          onClick={selectEasingFunction}
          defaultIdx={0}
        />
        <Dropdown
          className="mt-4 z-0"
          placeholder="Select Type"
          items={animationTypes.map((title) => ({ title }))}
          onClick={selectType}
          defaultIdx={0}
        />
        <DefaultButton
          className="w-full my-8"
          disabled={isPlaying || easingFunction === undefined}
          onClick={play}
        >
          Play
        </DefaultButton>
      </div>
      <div className="flex flex-col w-full max-w-60 p-4 border-2 border-primary rounded-lg self-center">
        <Graph f={easingFunction} />
      </div>
    </div>
  );
}

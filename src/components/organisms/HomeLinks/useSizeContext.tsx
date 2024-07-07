import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type Size = Record<"width" | "height", number>;
export type SizeContext = {
  size: Size;
  setSize: Dispatch<SetStateAction<Size>>;
};
const defaultSize = { width: 320, height: 180 };
const SizeContext = createContext<SizeContext>(null!);

export const SizeContextProvider = ({ children }: PropsWithChildren) => {
  const [size, setSize] = useState(defaultSize);
  const context = { size, setSize };
  return (
    <SizeContext.Provider value={context}>{children}</SizeContext.Provider>
  );
};

export const useSizeContext = () => {
  const { size, setSize } = useContext(SizeContext);

  return {
    size,
    setSize,
  };
};

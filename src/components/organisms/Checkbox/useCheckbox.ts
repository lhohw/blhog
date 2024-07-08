import { useCallback, useMemo, useState } from "react";

export default function useCheckbox(onChange?: (isChecked: boolean) => void) {
  const [isChecked, setIsChecked] = useState(false);
  const value = useMemo(() => (isChecked ? "on" : "off"), [isChecked]);

  const _onChange = useCallback(() => {
    const nextIsChecked = !isChecked;
    setIsChecked(() => nextIsChecked);
    onChange?.(nextIsChecked);
  }, [isChecked, onChange]);

  return {
    _onChange,
    value,
    isChecked,
  };
}

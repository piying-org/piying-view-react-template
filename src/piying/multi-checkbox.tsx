import type { ControlValueAccessor } from '@piying/view-core';
import { CVA, useControlValueAccessor } from '@piying/view-react';
import { useCallback, useImperativeHandle, useState } from 'react';

interface PiInputOptions {
  [CVA]: React.RefObject<ControlValueAccessor>;
  options: { label: string; value: string }[];
}
export function MultiCheckbox(props: PiInputOptions) {
  const { cva, cvaa } = useControlValueAccessor();
  useImperativeHandle(props[CVA], () => cva, [cva]);
  const [selectedList, setSelectedList] = useState(
    props.options.map((option) => {
      return cvaa.value?.includes(option.value);
    })
  );
  const valueChange2 = useCallback(
    (checked: boolean, index: number) => {
      selectedList[index] = checked;
      setSelectedList(() => {
        return selectedList.slice();
      });
      cvaa.valueChange(selectedList.map((bool, index) => (bool ? props.options[index].value : undefined)).filter(Boolean));
    },
    [selectedList, props.options, cvaa.valueChange]
  );
  return (
    <>
      {props.options.map((option, index) => {
        return (
          <div key={index}>
            <input
              className="checkbox"
              type="checkbox"
              checked={selectedList[index] ?? false}
              onChange={(event) => {
                valueChange2(event.target.checked, index);
              }}
              onBlur={cvaa.touchedChange}
              disabled={cvaa.disabled}
            />
            <span>{option.label}</span>
          </div>
        );
      })}
    </>
  );
}

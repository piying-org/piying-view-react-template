import type { ControlValueAccessor } from '@piying/view-core';
import { CVA, useControlValueAccessor, useInputTextModel } from '@piying/view-react';
import { useImperativeHandle } from 'react';

interface PiInputOptions {
  [CVA]: React.RefObject<ControlValueAccessor>;
}
export function InputText(props: PiInputOptions) {
  const { cva, cvaa } = useControlValueAccessor();
  useImperativeHandle(props[CVA], () => cva, [cva]);
  const textModel = useInputTextModel(cvaa, false);
  return (
    <>
      <input type="text" className="input" {...textModel} />
    </>
  );
}

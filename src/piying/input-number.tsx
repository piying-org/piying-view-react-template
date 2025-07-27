import type { ControlValueAccessor } from '@piying/view-core';
import { CVA, useControlValueAccessor, useInputNumberModel } from '@piying/view-react';
import { useImperativeHandle } from 'react';

interface PiInputOptions {
  [CVA]: React.RefObject<ControlValueAccessor>;
}
export function InputNumber(props: PiInputOptions) {
  const { cva, cvaa } = useControlValueAccessor();
  useImperativeHandle(props[CVA], () => cva, [cva]);
  const inputModel = useInputNumberModel(cvaa);

  return (
    <>
      <input className="input" type="number" {...inputModel} />
    </>
  );
}

import type { ControlValueAccessor } from '@piying/view-core';
import { CVA, useControlValueAccessor, useInputRadioModel } from '@piying/view-react';
import { useImperativeHandle, useMemo } from 'react';
import { DefaultOptionConvert, getRadioIndex, transformOptions, type OptionConvert } from './util/options';

interface PiInputOptions {
  [CVA]: React.RefObject<ControlValueAccessor>;
  options?: any[];
  optionConvert?: OptionConvert;
}
export function InputRadio(props: PiInputOptions) {
  const { cva, cvaa } = useControlValueAccessor();
  useImperativeHandle(props[CVA], () => cva, [cva]);
  const name = useMemo(() => {
    return `radio-${getRadioIndex()}`;
  }, []);
  const resolvedOptions = useMemo(() => {
    return transformOptions(props.options ?? [], { ...DefaultOptionConvert, ...props.optionConvert });
  }, [props.optionConvert, props.options]);
  return (
    <>
      {resolvedOptions.map((field, index) => {
        return (
          <div key={index}>
            <input className="radio" type="radio" name={name} {...useInputRadioModel(cvaa, field.value)} />
            <div className="label">{field.label}</div>
          </div>
        );
      })}
    </>
  );
}

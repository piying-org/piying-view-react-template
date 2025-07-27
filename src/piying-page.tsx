import * as v from 'valibot';
import { patchWrappers, setComponent, patchInputs } from '@piying/view-core';
import { fieldConfig } from './piying/define';
import { CustomNgBuilder } from './piying/custom.builder';
import { PiyingView } from '@piying/view-react';
const schema = v.pipe(
  v.object({
    text1: v.pipe(v.optional(v.string()), v.title('text1-label')),
    number1: v.pipe(v.number(), v.title('number1'), patchWrappers(['label', 'validator'])),
    radio1: v.pipe(
      v.optional(v.picklist(['v1', 'v2'])),
      setComponent('radio'),
      patchInputs({
        options: [
          { label: 'label-v1', value: 'v1' },
          { label: 'label-v2', value: 'v2' },
        ],
      }),
      v.title('radio1-title')
    ),
    checkbox1: v.optional(v.boolean()),
  }),
  v.title('form'),
  setComponent('fieldset')
);
const options = {
  fieldGlobalConfig: fieldConfig,
  builder: CustomNgBuilder,
};
export function PiyingPage() {
  function modelChange(event: any) {
    console.log(event);
  }
  return (
    <>
      <PiyingView schema={schema} options={options} modelChange={modelChange}></PiyingView>
    </>
  );
}

import * as v from 'valibot';
import { setComponent, typedFieldPipe } from '@piying/view-core';
import { Field, InjectorToken, PiyingFieldTemplate, convertToField, typedFieldComponentPipe } from '@piying/view-react';
import { fieldConfig } from './piying/define';
import { CustomNgBuilder } from './piying/custom.builder';

const Schema = v.object({
  text1: v.pipe(v.optional(v.string()), v.title('text1-label')),
  number1: v.pipe(v.number(), v.title('number1')),
  radio1: v.pipe(v.optional(v.picklist(['v1', 'v2'])), setComponent('radio'), v.title('radio1-title')),
  checkbox1: v.optional(v.boolean()),
});

const TypedSchema = typedFieldComponentPipe(Schema, fieldConfig, (d) => [
  d(['radio1'], 'radio', [
    d.inputs.patch({
      options: [
        { label: 'label-v1', value: 'v1' },
        { label: 'label-v2', value: 'v2' },
      ],
    }),
  ]),
]);

// 监听 radio1 的 indexChange, 把 text1 改成 "set <选中索引>"
const TypedSchema2 = typedFieldPipe(TypedSchema, (d) => [
  d(
    ['text1'],
    [
      d.outputChange((fn) => {
        fn([{ list: ['..', 'radio1'], output: 'onIndexChange' }]).subscribe((change) => {
          change.field.form.control?.updateValue(`set ${change.list[0]![0]}`);
        });
      }),
    ],
  ),
]);

export function PiyingManualPage() {
  const field = convertToField(
    () => TypedSchema2,
    undefined,
    () => ({
      fieldGlobalConfig: fieldConfig,
      builder: CustomNgBuilder,
    }),
  );

  return (
    <InjectorToken value={field.injector}>
      <div className="grid gap-2 p-4">
        <Field field={field} path={['text1']}>
          {({ cvaa }) => (
            <input
              type="text"
              className="input"
              placeholder="text1"
              value={cvaa.value ?? ''}
              disabled={cvaa.disabled}
              onChange={(e) => cvaa.valueChange(e.target.value)}
              onBlur={cvaa.touchedChange}
            />
          )}
        </Field>

        <Field field={field} path={['number1']}>
          {({ cvaa }) => (
            <input
              type="number"
              className="input"
              placeholder="number1"
              value={cvaa.value ?? ''}
              disabled={cvaa.disabled}
              onChange={(e) => cvaa.valueChange(e.target.value === '' ? 0 : Number(e.target.value))}
              onBlur={cvaa.touchedChange}
            />
          )}
        </Field>

        <PiyingFieldTemplate field={field} path={['radio1']} />

        <Field field={field} path={['checkbox1']}>
          {({ cvaa }) => (
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={cvaa.value ?? false}
                disabled={cvaa.disabled}
                onChange={(e) => cvaa.valueChange(e.target.checked)}
                onBlur={cvaa.touchedChange}
              />
              <span className="label-text">checkbox1</span>
            </label>
          )}
        </Field>
      </div>
    </InjectorToken>
  );
}

import { PI_VIEW_FIELD_TOKEN, useSignalToRef } from '@piying/view-react';
import { useCallback, useContext, useMemo, useState } from 'react';
import JSONFormatter from 'json-formatter-js';
import { errorString } from './util/error-string';

interface FormHelpOptions {}
export function FormHelp(props: FormHelpOptions) {
  const field = useContext(PI_VIEW_FIELD_TOKEN)!;
  const props2 = useSignalToRef(field, () => field?.props());

  const control = field.form.root;
  const value = useSignalToRef(control, (control) => control!.value$$());

  const formatedHtml = useMemo(() => new JSONFormatter(value).render(), [value]);
  const forceShowError = useSignalToRef(field, (field) => field.props()['forceShowError']);
  const hasError = useSignalToRef(control, (control) => !!control.errors);
  const isChangedStatus = useSignalToRef(control, (control) => control?.dirty$$() || control?.touched$$());
  const errors = control.errors;

  const errorStr$$ = useMemo(() => {
    if (!errors) {
      return '';
    }
    return errorString(errors);
  }, [errors]);
  const [initData, setInitData] = useState(undefined);

  const submit = useCallback(async () => {
    setSubmitting(true);
    if (props2['submitDelay']) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, props2['submitDelay']);
      });
    }
    alert(JSON.stringify(value, undefined, 4));
    setSubmitting(false);
  }, [value, props2]);
  const resetForm = useCallback(() => {
    control.reset(initData);
  }, [initData]);
  const saveInit = useCallback(() => {
    setInitData(value);
  }, [value]);
  const [isSubmitting, setSubmitting] = useState(false);
  return (
    <>
      <div>
        <div
          ref={(instance) => {
            if (instance) {
              instance.innerHTML = '';
              instance.appendChild(formatedHtml);
            }
          }}
        ></div>
        {forceShowError || (hasError && isChangedStatus) ? (
          <div>
            <label className="label">Form Error</label>
            <pre className="mt-2 text-error">{errorStr$$}</pre>
          </div>
        ) : undefined}

        <div className="flex gap-2 items-center">
          <button disabled={control.invalid || isSubmitting} className="btn btn-primary" onClick={submit}>
            Submit
          </button>
          <button className="btn btn-outline btn-secondary" onClick={resetForm}>
            Reset
          </button>
          <button className="btn btn-outline btn-accent" onClick={saveInit}>
            Update Intial Values
          </button>
        </div>
      </div>
    </>
  );
}

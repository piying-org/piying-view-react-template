import { PI_VIEW_FIELD_TOKEN, useSignalToRef } from '@piying/view-react';
import { useContext } from 'react';
import { fieldControlStatusClass } from '@piying/view-core';
import { errorString } from '../util/error-string';

export function ValidatorWrapper(props: { children: any }) {
  const field = useContext(PI_VIEW_FIELD_TOKEN);
  const statusClass = useSignalToRef(field, (field) => fieldControlStatusClass(field?.form.control));
  const hasError = useSignalToRef(field, (field) => !!field?.form.control!.errors);

  const errorStr = useSignalToRef(field, (field) => {
    const errors = field?.form.control!.errors;
    return errorString(errors);
  });

  const isChangedStatus = useSignalToRef(field, (field) => field?.form.control?.dirty$$() || field?.form.control?.touched$$());

  return (
    <>
      <div className={statusClass}>
        {props.children}
        {hasError && isChangedStatus ? <div className="text-error">{errorStr}</div> : undefined}
      </div>
    </>
  );
}

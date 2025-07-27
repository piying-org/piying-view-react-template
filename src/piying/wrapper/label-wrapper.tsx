import { PI_VIEW_FIELD_TOKEN, useSignalToRef } from '@piying/view-react';
import { useContext } from 'react';

export function LabelWrapper(props: { children: any }) {
  const field = useContext(PI_VIEW_FIELD_TOKEN);
  const props2 = useSignalToRef(field, () => field?.props());

  return (
    <>
      <div className="flex gap-2 items-center">
        {props2?.['title'] ? <span className="label">{props2['title']}</span> : undefined}

        {props.children}
      </div>
    </>
  );
}

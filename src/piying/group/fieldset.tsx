import { PI_VIEW_FIELD_TOKEN, useSignalToRef, type PiResolvedViewFieldConfig, PiyingFieldTemplate } from '@piying/view-react';
import { useContext } from 'react';
export function FieldsetGroup(props: { fields: PiResolvedViewFieldConfig[] }) {
  const field = useContext(PI_VIEW_FIELD_TOKEN);
  const props2 = useSignalToRef(field, (field) => field?.props());

  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
        {props2?.['title'] ? <legend className="fieldset-legend">{props2['title']}</legend> : undefined}
        {props.fields.map((field, index) => {
          return <PiyingFieldTemplate field={field} key={index}></PiyingFieldTemplate>;
        })}
      </fieldset>
    </>
  );
}

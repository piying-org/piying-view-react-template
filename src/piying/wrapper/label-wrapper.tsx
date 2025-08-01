import { PI_VIEW_FIELD_TOKEN, useSignalToRef } from '@piying/view-react';
import clsx from 'clsx';
import { useContext, useMemo } from 'react';

export function LabelWrapper(props: { children: any }) {
  const field = useContext(PI_VIEW_FIELD_TOKEN)!;
  const props2 = useSignalToRef(field, (field) => {
    return field.props();
  });
  const attributes = useSignalToRef(field, (field) => field.attributes());
  const isRequired = useSignalToRef(field, (field) => !!field.form.control?.required$$());

  const wrapperClass = useMemo(() => {
    return clsx('flex gap-2', {
      'flex-col': props2['titlePosition'] === 'top',
      'items-center': props2['titlePosition'] !== 'top',
    });
  }, [props2['titlePosition']]);
  const title = useMemo(() => props2['title'], [props2['title']]);
  return (
    <>
      <div className={wrapperClass}>
        {(!props2['titlePosition'] || props2['titlePosition'] === 'left' || props2['titlePosition'] === 'top') && props2['title'] ? (
          <label htmlFor={attributes?.['id']}>
            {isRequired ? <span className="text-red-500">*</span> : undefined}
            <span className="label">{title}</span>
          </label>
        ) : undefined}

        {props.children}

        {props2['titlePosition'] === 'right' && props2['title'] ? (
          <label htmlFor={attributes?.['id']}>
            {isRequired ? <span className="text-red-500">*</span> : undefined}
            <span className="label">{title}</span>
          </label>
        ) : undefined}
      </div>
    </>
  );
}

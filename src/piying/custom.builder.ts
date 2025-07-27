import { computed, isSignal, linkedSignal } from 'static-injector';

import { deepEqual } from 'fast-equals';
import { ReactFormBuilder, ReactSchemaHandle, type PiResolvedViewFieldConfig } from '@piying/view-react';
function getSignalValue(inputs: any) {
  return isSignal(inputs) ? inputs() : inputs;
}

export class CustomNgBuilder extends ReactFormBuilder {
  override afterResolveConfig(rawConfig: ReactSchemaHandle, config: PiResolvedViewFieldConfig) {
    const parsed = super.afterResolveConfig(rawConfig, config) ?? config;
    const props = parsed?.props;
    const inputs = parsed?.inputs;
    const options$$ = computed(
      () => {
        const value = getSignalValue(props);
        return value?.['options'];
      },
      { equal: deepEqual }
    );
    const inputs$$ = linkedSignal(() => {
      let value = getSignalValue(inputs);
      if (rawConfig.type === 'picklist') {
        const options = options$$();
        if (options && !value.options) {
          value = { ...value, options };
        }
      }
      return value;
    });

    return {
      ...parsed,
      props: props,
      inputs: inputs$$,
    } as any;
  }
}

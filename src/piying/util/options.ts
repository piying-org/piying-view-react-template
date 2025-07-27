export interface OptionConvert {
  label: (input: any) => string
  value: (input: any) => any
  isGroup: (input: any) => boolean
  children: (input: any) => any[]
  disabled?: (input: any) => boolean
}
export type Option2 = string

export const DefaultOptionConvert: OptionConvert = {
  label: (item) => (typeof item === 'string' ? item : item.label),
  value: (item) => (typeof item === 'string' ? item : item.value),
  disabled: (item) => typeof item === 'object' && item.disabled,
  isGroup: (item) => typeof item === 'object' && item.type === 'group',
  children: (item) => item.children,
}

export interface ResolvedOption {
  label: string
  value: any
  disabled?: boolean
  type: 'option' | 'group'
  children?: ResolvedOption[]
}
export function transformOptions(options: any[], optionConvert: OptionConvert): ResolvedOption[] {
  return options.map((option) => {
    const resolvedItem: ResolvedOption = {
      label: optionConvert.label(option),
      value: optionConvert.value(option),
      disabled: optionConvert.disabled?.(option) ?? false,
      type: 'option',
    }
    if (optionConvert.isGroup(option)) {
      resolvedItem.type = 'group'
      resolvedItem.children = transformOptions(optionConvert.children(option), optionConvert)
      return resolvedItem
    }
    return resolvedItem
  })
}

let RadioIndex = 0
export function getRadioIndex() {
  return RadioIndex++
}

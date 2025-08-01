import { summarize } from 'valibot';

export function errorString(errors: any) {
  if (errors) {
    const valibot = errors['valibot'];
    if (valibot) {
      return summarize(valibot);
    } else {
      return Object.values(errors!)
        .map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
        .join('\n');
    }
  }
  return '';
}

/**Helper function to string together classnames */
export function classNames(...classes: Array<string | undefined | false>) {
  return classes.filter((cn) => !!cn).join(' ');
}

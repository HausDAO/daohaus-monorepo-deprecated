import { WrappedSelect } from '../WrappedSelect/WrappedSelect';
import { SHAMAN_PERMISSIONS } from '@daohaus/common-utilities';
import { Buildable, SelectProps } from '../../../types/formAndField';

export const ShamanInput = (
  props: Buildable<Omit<SelectProps, 'id' | 'options'>>
) => {
  const options = Object.values(SHAMAN_PERMISSIONS).map((permission) => ({
    name: permission.displayName,
    value: permission.id,
  }));
  return <WrappedSelect {...props} id="shaman-input" options={options} />;
};

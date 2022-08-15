import { Select } from '@daohaus/ui';
import { SHAMAN_PERMISSIONS } from '@daohaus/common-utilities';

export const ShamanInput = () => {
  const options = Object.values(SHAMAN_PERMISSIONS).map((permission) => ({
    name: permission.displayName,
    value: permission.id,
  }));
  return <Select id="shaman-input" options={options} />;
};

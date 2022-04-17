import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './input';

export default {
  title: 'Atoms/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export const InputAtom: ComponentStory<typeof Input> = (args) => <Input />;
export const InputAtom2: ComponentStory<typeof Input> = (args) => <Input />;
export const InputAtom3: ComponentStory<typeof Input> = (args) => <Input />;

// InputAtom.storyName = 'Input';
// InputAtom.args = {
//   placeholder: 'Placeholder',
// };
// export const InputWithIcon: ComponentStory<typeof Input> = (args) => (
//   <Input {...args} icon={BsSearch} placeholder="With Icon" />
// );
// InputWithIcon.storyName = 'Input (With Icon)';
//

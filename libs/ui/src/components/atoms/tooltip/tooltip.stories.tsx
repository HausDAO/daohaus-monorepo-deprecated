import { grass } from '@radix-ui/colors';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { H1 } from '../typography';
import Tooltip from './tooltip';
import { LgTooltupTrigger } from './tooltipTriggers';

export default {
  title: 'Atoms/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args} />
);

export const AtomTooltip = Template.bind({});

AtomTooltip.args = {
  content: "Oh boy! It's content!",
};

export const LargeIconTooltip = Template.bind({});
LargeIconTooltip.args = {
  content: 'Oh boy! Large Icons!',
  triggerEl: <LgTooltupTrigger />,
};
export const CustomIconTrigger = Template.bind({});
CustomIconTrigger.args = {
  content: "Oh-eeee! That's a custom icon!",
  triggerEl: <BsCheckCircleFill color={grass.grass9} size="2rem" />,
};
export const CustomContent = Template.bind({});
CustomContent.args = {
  content: <H1>Whoaaa, an H1!!!!!</H1>,
};

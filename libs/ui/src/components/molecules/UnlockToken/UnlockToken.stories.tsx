import { ComponentMeta, ComponentStory } from '@storybook/react';
import { UnlockToken } from './UnlockToken';

export default {
  title: 'Molecules/Form/UnlockToken',
  component: UnlockToken,
} as ComponentMeta<typeof UnlockToken>;

const Template: ComponentStory<typeof UnlockToken> = (args) => {
  return (
    <div style={{ margin: '4rem' }}>
      <UnlockToken {...args} />
    </div>
  );
};

export const UnlockTokenTemplate = Template.bind({});
UnlockTokenTemplate.args = {
  handleOnClick: () => alert('action'),
  token: 'WXDAI',
};

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'

import Button from './button'

export default {
  title: 'Button',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
  // 组件级别的 decorators
  decorators: [
    withInfo, 
    (Story) => (
      <div style={{ textAlign: 'center' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    info: { 
      text: `
      Nice Component
      ## Header
      ~~~js
      const a = hello
      ~~~
      `,
      inline: true 
    },
  }
} as ComponentMeta<typeof Button>

// story级别的 decorators
// const styles: React.CSSProperties = {
//   textAlign: 'center'
// }
// const CenterDecorator = (Story: any) => <div style={styles}><Story /></div>

const BasicButton: ComponentStory<typeof Button> = (args) => <Button {...args}>{args.title ? args.title : 'Basic'}</Button>

export const Default = BasicButton.bind({});
// Default.decorators = [CenterDecorator]

export const Primary = BasicButton.bind({});
Primary.args = {
  btnType: 'primary',
  title: 'Primary'
}
// Primary.decorators = [CenterDecorator]

export const Small = BasicButton.bind({});
Small.args = {
  size: 'sm',
  title: 'Small'
}

export const Danger = BasicButton.bind({});
Danger.args = {
  btnType: 'danger',
  title: 'Danger'
}



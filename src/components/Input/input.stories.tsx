import React, {useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'
import Input from './input'

export default {
  title: 'Input',
  component: Input,
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
} as ComponentMeta<typeof Input>

const ControlledInput = () => {
  const [value, setValue] = useState('')
  return <Input value={value} onChange={e => setValue(e.target.value)}/>
}
export const ControlInput = ControlledInput.bind({})

const BasicInput: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Default = BasicInput.bind({})

export const DisabledInput = BasicInput.bind({})
DisabledInput.args = {
  disabled: true
}

export const PandInput = BasicInput.bind({})
PandInput.args = {
  prepend: "https://",
  append: ".com"
}
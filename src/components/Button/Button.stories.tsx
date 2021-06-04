import React from 'react'
import { Story } from '@storybook/react'
import Button, { ButtonProps } from '.'

export default {
  title: 'Button',
  component: Button,
}

const Template: Story<ButtonProps> = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  text: 'Button',
  isButton: false,
  url: '',
  internal: false,
  action: () => alert('hello'),
}

export const Secondary = Template.bind({})
Secondary.args = {
  primary: false,
  text: 'Button',
  isButton: false,
  url: '',
  internal: false,
  action: () => alert('hello'),
}

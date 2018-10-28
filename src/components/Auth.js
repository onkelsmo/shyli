import React from 'react'
import { List, InputItem, Button } from 'antd-mobile'
import { createForm } from 'rc-form'

const Item = List.Item

class Auth extends React.Component {
  state = {
    value: 1
  }

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        this.props.handleStateChange(this.props.form.getFieldsValue())
      } else {
        alert('Validation failed')
      }
    })
  }

  onReset = () => {
    this.props.form.resetFields()
  }

  validateAccount = (rule, value, callback) => {
    if (value && value.length >= 3) {
      callback()
    } else {
      callback(new Error('At least four characters for account'))
    }
  }

  render () {
    const { getFieldProps, getFieldError } = this.props.form

    return (
      <form>
        <List
          renderHeader={() => 'Please provide me with a username and a pin'}
          renderFooter={() =>
            getFieldError('username') && getFieldError('username').join(',')}
        >
          <InputItem
            {...getFieldProps('username', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: 'Please input username' },
                { validator: this.validateAccount }
              ]
            })}
            clear
            error={!!getFieldError('username')}
            onErrorClick={() => {
              alert(getFieldError('username').join('、'))
            }}
            placeholder='please input username'
          >
            Username
          </InputItem>
          <InputItem {...getFieldProps('pin')} placeholder='please input pin'>
            Pin
          </InputItem>

          <Item>
            <Button type='primary' size='small' inline onClick={this.onSubmit}>
              Submit
            </Button>
            <Button
              size='small'
              inline
              style={{ marginLeft: '2.5px' }}
              onClick={this.onReset}
            >
              Reset
            </Button>
          </Item>
        </List>
      </form>
    )
  }
}

export default createForm()(Auth)

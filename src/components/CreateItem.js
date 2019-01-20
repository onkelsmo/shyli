import React from 'react'
import { List, InputItem, Button } from 'antd-mobile'
import { createForm } from 'rc-form'

const Item = List.Item

class CreateItem extends React.Component {
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        this.props.handleItemAdd(
          this.props.form.getFieldsValue().title,
          this.props.activeCategory
        )
        this.props.handleItemSubmit()
        this.props.form.resetFields()
      }
    })
  }

  onReset = () => {
    this.props.form.resetFields()
  }

  validateTitle = (rule, value, callback) => {
    if (value && value.length > 0) {
      callback()
    } else {
      callback(new Error('The title can not be empty'))
    }
  }

  render () {
    const { getFieldProps, getFieldError } = this.props.form

    return (
      <form>
        <List
          renderHeader={() => 'Create a new Item'}
          renderFooter={() =>
            getFieldError('title') && getFieldError('title').join(',')
          }
        >
          <InputItem
            {...getFieldProps('title', {
              rules: [
                { required: true, message: 'Please input an item title' },
                { validator: this.validateTitle }
              ]
            })}
            clear
            error={!!getFieldError('title')}
            onErrorClick={() => {
              alert(getFieldError('title').join('、'))
            }}
            placeholder='Please input an item title'
          >
            Title
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

export default createForm()(CreateItem)

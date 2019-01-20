import React from 'react'
import { List, InputItem, Button, ImagePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import { database } from 'firebase'

const Item = List.Item
const data = []

class CreateItem extends React.Component {
  state = {
    files: data,
    multiple: false
  }

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        this.props.handleItemAdd(
          this.props.form.getFieldsValue().title,
          this.props.activeCategory,
          this.state.files[0]
        )
        this.props.handleItemSubmit()
        this.props.form.resetFields()
      }
    })
  }

  onReset = () => {
    this.props.form.resetFields()
  }

  onChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      files
    })
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
    const { files, multiple } = this.state

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
          <ImagePicker
            files={files}
            onChange={this.onChange}
            selectable={files.length < 1}
            multiple={multiple}
            length={1}
          />

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

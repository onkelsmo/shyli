import React from 'react'
import { List, Button } from 'antd-mobile'

const Sidebar = props => {
  let { name, pin, database, showAddCategory, showResetConfirmation } = props

  let fetchedCategories = {}
  database.ref('users/' + name + pin + '/categories/').on('value', snapshot => {
    fetchedCategories = snapshot.val()
  })

  return (
    <List renderHeader={() => 'Categories'}>
      {fetchedCategories &&
        Object.keys(fetchedCategories).map((i, index) => {
          if (index === 0) {
            return (
              <List.Item
                key={index}
                thumb='https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png'
                multipleLine
              >
                {i}
              </List.Item>
            )
          }
          return (
            <List.Item
              key={index}
              thumb='https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png'
            >
              {i}
            </List.Item>
          )
        })}
      <Button className='button-add' onClick={showAddCategory.bind(this)}>
        New Category
      </Button>
      <List renderHeader={() => 'Settings'}>
        <List.Item>
          <Button
            className='button-reset'
            onClick={showResetConfirmation.bind(this)}
          >
            Reset userdata
          </Button>
        </List.Item>
      </List>
    </List>
  )
}

export default Sidebar
import React from 'react'
import { List, Button } from 'antd-mobile'

const Sidebar = props => {
  let {
    showAddCategory,
    showResetConfirmation,
    setActiveCategory,
    fetchedCategories
  } = props

  return (
    <List renderHeader={() => 'Categories'}>
      {fetchedCategories &&
        Object.keys(fetchedCategories).map(index => {
          if (index !== 'loaded') {
            return (
              <List.Item
                key={index}
                thumb='https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png'
                onClick={setActiveCategory.bind(
                  null,
                  fetchedCategories[index].name
                )}
              >
                {fetchedCategories[index].name}
              </List.Item>
            )
          } else {
            return null
          }
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

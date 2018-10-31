import React from 'react'
import { List, Button } from 'antd-mobile'

const Sidebar = props => {
  let categoryArray = []
  props.database.ref('categories/').on('value', snapshot => {
    categoryArray = snapshot.val()
  })

  return (
    <List>
      {categoryArray &&
        categoryArray.map((i, index) => {
          if (index === 0) {
            return (
              <List.Item
                key={index}
                thumb='https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png'
                multipleLine
              >
                {categoryArray[index]}
              </List.Item>
            )
          }
          return (
            <List.Item
              key={index}
              thumb='https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png'
            >
              {categoryArray[index]}
            </List.Item>
          )
        })}
      <List renderHeader={() => 'Settings'}>
        <List.Item>
          <Button
            className='button-reset'
            onClick={props.showConfirmationPopup.bind(this)}
          >
            Reset Userdata
          </Button>
        </List.Item>
      </List>
    </List>
  )
}

export default Sidebar

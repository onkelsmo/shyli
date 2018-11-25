import React from 'react'
import { TabBar, List } from 'antd-mobile'
import CreateItem from './CreateItem'

let data = []

class CategoryItemListView extends React.Component {
  constructor (props) {
    super(props)

    Object.keys(props.items).map(index => {
      if (index !== 'loaded') {
        data.push({ img: '', title: props.items[index].title, des: '' })
      }
      return null
    })
  }

  render () {
    return (
      <List renderHeader={() => <span>{this.props.activeCategory}</span>}>
        {data &&
          Object.keys(data).map(index => {
            if (index !== 'loaded') {
              return (
                <List.Item
                  key={index}
                  thumb='https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png'
                >
                  {data[index].title}
                </List.Item>
              )
            } else {
              return null
            }
          })}
        {/* <Button className='button-add' onClick={showAddCategory.bind(this)}>
        New Category
      </Button> */}
      </List>
    )

    // <ListView
    //   ref={el => (this.lv = el)}
    //   dataSource={this.state.dataSource}
    //   renderHeader={() => <span>{this.props.activeCategory}</span>}
    //   renderFooter={() => (
    //     <div style={{ padding: 30, textAlign: 'center' }}>
    //       {this.state.isLoading ? 'Loading...' : 'Loaded'}
    //     </div>
    //   )}
    //   // renderSectionHeader={sectionData => (
    //   //   <div>{`Task ${sectionData.split(' ')[1]}`}</div>
    //   // )}
    //   renderRow={row}
    //   renderSeparator={separator}
    //   style={{
    //     height: this.state.height,
    //     overflow: 'auto'
    //   }}
    //   pageSize={4}
    //   onScroll={() => {
    //     console.log('scroll')
    //   }}
    //   scrollRenderAheadDistance={500}
    // />
  }
}

class CategoryItemList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 'blueTab',
      hidden: false
    }
  }

  handleItemSubmit () {
    this.setState({ selectedTab: 'blueTab' })
  }

  renderNewItem () {
    return (
      <CreateItem
        handleItemAdd={this.props.handleItemAdd.bind(this)}
        activeCategory={this.props.activeCategory}
        handleItemSubmit={this.handleItemSubmit.bind(this)}
      />
    )
  }

  render () {
    return (
      <div
        style={{ position: 'fixed', height: '90%', width: '100%', top: '10%' }}
      >
        <TabBar
          unselectedTintColor='#949494'
          tintColor='#33A3F4'
          barTintColor='white'
          tabBarPosition='bottom'
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title='List'
            key='List'
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            selected={this.state.selectedTab === 'blueTab'}
            // badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab'
              })
            }}
            data-seed='logId'
          >
            <CategoryItemListView
              activeCategory={this.props.activeCategory}
              items={this.props.items}
            />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            title='New Item'
            key='NewItem'
            // badge={'new'}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab'
              })
            }}
            data-seed='logId1'
          >
            {this.renderNewItem()}
          </TabBar.Item>
          {/* <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            title='New sub category'
            key='NewSubCategory'
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab'
              })
            }}
          >
            {this.renderContent('NewSubCategory')}
          </TabBar.Item> */}
        </TabBar>
      </div>
    )
  }
}

export default CategoryItemList

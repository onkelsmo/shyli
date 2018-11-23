import React, { Component } from 'react'
import { Drawer, NavBar, Icon, WhiteSpace, Modal, Toast } from 'antd-mobile'
import Auth from './components/Auth'
import Sidebar from './components/Sidebar'
import CategoryItemList from './components/CategoryItemList'
import './App.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { doAuth } from './actions/doAuth'
import { handleCategoryAdd } from './actions/handleCategoryAdd'
import { handleReset } from './actions/handleReset'

class App extends Component {
  state = {
    open: false,
    activeCategory: null,
    items: {}
  }

  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open })
  }

  setActiveCategory (categoryName) {
    this.setState({ open: false, activeCategory: categoryName })
  }

  showAddCategory () {
    Modal.prompt(
      'Add a new category',
      null,
      [
        {
          text: 'Close',
          onPress: () => {
            // this.setState({ open: false })
          }
        },
        {
          text: 'Add',
          onPress: categoryName => {
            if (!categoryName) {
              Toast.info('The Category name must not be empty', 1)
            } else {
              this.handleCategoryAdd(categoryName)
            }
          }
        }
      ],
      'default',
      null,
      ['category name']
    )
  }

  showResetConfirmation () {
    Modal.alert('Reset your userdata', 'Are you sure???', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'default'
      },
      { text: 'OK', onPress: () => this.handleReset() }
    ])
  }

  fetchItems (props) {
    this.database
      .ref(
        'users/' +
          props.auth.name +
          props.auth.pin +
          '/categories/' +
          props.activeCategory +
          '/items/'
      )
      .on('value', snapshot => {
        return snapshot.val()
      })
  }

  handleCategoryAdd (categoryName) {
    this.props.handleCategoryAdd(
      categoryName,
      this.props.auth.username,
      this.props.auth.pin
    )
  }

  handleAuth (credentials) {
    this.props.doAuth(credentials.username, credentials.pin)
  }

  handleReset () {
    this.props.handleReset(this.props.auth.username, this.props.auth.pin)

    this.setState({
      open: false
    })
  }

  handleItemAdd (title, category) {
    let itemsObject = this.state.items
    itemsObject.category = { item: title }
    this.setState({
      items: itemsObject
    })

    this.database()
      .ref(
        'users/' +
          this.state.auth.name +
          this.state.auth.pin +
          '/categories/' +
          category +
          '/items/' +
          title
      )
      .set({
        title: title
      })
  }

  render () {
    console.log(this.props)

    let isAuth = this.props.auth.username !== '' && this.props.auth.pin !== ''
    let activeCategory = this.state.activeCategory

    return (
      <div>
        <NavBar icon={<Icon type='ellipsis' />} onLeftClick={this.onOpenChange}>
          shyli
        </NavBar>
        {!isAuth && <Auth handleAuth={this.handleAuth.bind(this)} />}
        {isAuth &&
          <Drawer
            className='my-drawer'
            style={{ minHeight: document.documentElement.clientHeight }}
            enableDragHandle
            contentStyle={{
              color: '#A6A6A6',
              textAlign: 'center',
              paddingTop: 42
            }}
            sidebar={
              <Sidebar
                name={this.props.auth.username}
                pin={this.props.auth.pin}
                showResetConfirmation={this.showResetConfirmation.bind(this)}
                showAddCategory={this.showAddCategory.bind(this)}
                setActiveCategory={this.setActiveCategory.bind(this)}
              />
            }
            open={this.state.open}
            onOpenChange={this.onOpenChange}
          >
            {!activeCategory &&
              <div>
                Hello {this.props.auth.username}
                <WhiteSpace />
                and thank you for using shyli :-)
                <WhiteSpace />
                Now let's begin. Open the drawer on the left and start adding categories!
              </div>}
            {activeCategory &&
              <div>
                <CategoryItemList
                  auth={this.state.auth}
                  activeCategory={activeCategory}
                  handleItemAdd={this.handleItemAdd.bind(this)}
                />
              </div>}
          </Drawer>}
        {/* <ul>
          {this.props.items.map(item => (
            <li key={item.id}>
              {item.title}
            </li>
          ))}
          {' '}
        </ul> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
    // items: state
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      doAuth,
      handleCategoryAdd,
      handleReset
      // getItems
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

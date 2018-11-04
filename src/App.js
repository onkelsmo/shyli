import React, { Component } from 'react'
import { Drawer, NavBar, Icon, WhiteSpace, Modal, Toast } from 'antd-mobile'
import Auth from './components/Auth'
import Sidebar from './components/Sidebar'
import CategoryItemList from './components/CategoryItemList'
import './App.css'
import firebase from 'firebase'
import 'firebase/database'
import { DB_CONFIG } from './Config'

class App extends Component {
  state = {
    open: false,
    auth: {
      name: '',
      pin: ''
    },
    categories: [],
    activeCategory: null
  }

  constructor () {
    super()
    this.app = firebase.initializeApp(DB_CONFIG)
    this.database = this.app.database()
  }

  componentDidMount () {
    this.hydrateStateWithLocalStorage()
    window.addEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    )
  }

  componentWillUnmount () {
    window.removeEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    )
    this.saveStateToLocalStorage()
  }

  hydrateStateWithLocalStorage () {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key)
        try {
          value = JSON.parse(value)
          this.setState({ [key]: value })
        } catch (e) {
          this.setState({ [key]: value })
        }
      }
    }
  }

  saveStateToLocalStorage () {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]))
    }
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

  handleCategoryAdd (categoryName) {
    let categoriesArray = this.state.categories
    categoriesArray.push(categoryName)
    this.setState({ categories: categoriesArray })

    firebase
      .database()
      .ref(
        'users/' +
          this.state.auth.name +
          this.state.auth.pin +
          '/categories/' +
          categoryName
      )
      .set({
        name: categoryName
      })
  }

  handleStateChange (props) {
    this.setState({
      auth: {
        name: props.username,
        pin: props.pin
      }
    })

    firebase.database().ref('users/' + props.username + props.pin).set({
      name: props.username,
      pin: props.pin
    })
  }

  handleReset () {
    firebase
      .database()
      .ref('users/' + this.state.auth.name + this.state.auth.pin)
      .set(null)

    this.setState({
      open: false,
      auth: {
        name: '',
        pin: ''
      },
      categories: [],
      activeCategory: null
    })
  }

  render () {
    let isAuth = this.state.auth.name !== '' && this.state.auth.pin !== ''
    let activeCategory = this.state.activeCategory

    return (
      <div>
        <NavBar icon={<Icon type='ellipsis' />} onLeftClick={this.onOpenChange}>
          shyli
        </NavBar>
        {!isAuth &&
          <Auth handleStateChange={this.handleStateChange.bind(this)} />}
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
                name={this.state.auth.name}
                pin={this.state.auth.pin}
                database={this.database}
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
                Hello {this.state.auth.name}
                <WhiteSpace />
                and thank you for using shyli :-)
                <WhiteSpace />
                Now let's begin. Open the drawer on the left and start adding categories!
              </div>}
            {activeCategory &&
              <div>
                <CategoryItemList activeCategory={activeCategory} />
              </div>}
          </Drawer>}
      </div>
    )
  }
}

export default App

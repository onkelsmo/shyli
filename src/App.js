import React, { Component } from 'react'
import { Drawer, List, NavBar, Icon, WhiteSpace, Button } from 'antd-mobile'
import Auth from './components/Auth'
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
    }
  }

  constructor () {
    super()

    this.app = firebase.initializeApp(DB_CONFIG)
    this.database = this.app.database()
  }

  componentDidMount () {
    this.hydrateStateWithLocalStorage()

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
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

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage()
  }

  hydrateStateWithLocalStorage () {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key)

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value)
          this.setState({ [key]: value })
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value })
        }
      }
    }
  }

  saveStateToLocalStorage () {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]))
    }
  }

  onOpenChange = (...args) => {
    console.log(args)
    this.setState({ open: !this.state.open })
  }

  renderSidebar () {
    // Here comes the category data from db
    return (
      <List>
        {[
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15
        ].map((i, index) => {
          if (index === 0) {
            return (
              <List.Item
                key={index}
                thumb='https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png'
                multipleLine
              >
                Category
              </List.Item>
            )
          }
          return (
            <List.Item
              key={index}
              thumb='https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png'
            >
              Category{index}
            </List.Item>
          )
        })}
      </List>
    )
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
      auth: {
        name: '',
        pin: ''
      }
    })
  }

  render () {
    const sidebar = this.renderSidebar()
    let isAuth = this.state.auth.name !== '' && this.state.auth.pin !== ''

    return (
      <div>
        <NavBar icon={<Icon type='ellipsis' />} onLeftClick={this.onOpenChange}>
          shyli
        </NavBar>
        <Drawer
          className='my-drawer'
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          contentStyle={{
            color: '#A6A6A6',
            textAlign: 'center',
            paddingTop: 42
          }}
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          {!isAuth &&
            <Auth handleStateChange={this.handleStateChange.bind(this)} />}
          {isAuth &&
            <div>
              {this.state.auth.name}
              <WhiteSpace />
              {this.state.auth.pin}
              <Button onClick={this.handleReset.bind(this)}>Reset</Button>
            </div>}
        </Drawer>
      </div>
    )
  }
}

export default App

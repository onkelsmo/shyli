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
    console.log(args)
    this.setState({ open: !this.state.open })
  }

  renderSidebar () {
    let categoryArray = []
    this.database.ref('categories/').on('value', snapshot => {
      categoryArray = snapshot.val()
    })

    return (
      <List>
        {categoryArray.map((i, index) => {
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

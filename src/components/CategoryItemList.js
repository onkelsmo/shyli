import React from 'react'
import ReactDOM from 'react-dom'
import { TabBar, ListView } from 'antd-mobile'
import CreateItem from './CreateItem'

let data = []
const NUM_SECTIONS = 5
const NUM_ROWS_PER_SECTION = 5
let pageIndex = 0

const dataBlobs = {}
let sectionIDs = []
let rowIDs = []
function genData (pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = pIndex * NUM_SECTIONS + i
    const sectionName = `Section ${ii}`
    sectionIDs.push(sectionName)
    dataBlobs[sectionName] = sectionName
    rowIDs[ii] = []

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`
      rowIDs[ii].push(rowName)
      dataBlobs[rowName] = rowName
    }
  }
  sectionIDs = [...sectionIDs]
  rowIDs = [...rowIDs]
}

class CategoryItemListView extends React.Component {
  constructor (props) {
    super(props)

    Object.keys(props.items).map(index => {
      if (index !== 'loaded') {
        data.push({ img: '', title: props.items[index].title, des: '' })
      }
      return null
    })

    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID]
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID]

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })

    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4
    }
  }

  componentDidMount () {
    const hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop
    setTimeout(() => {
      genData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(
          dataBlobs,
          sectionIDs,
          rowIDs
        ),
        isLoading: false,
        height: hei
      })
    }, 600)
  }

  onEndReached = event => {
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    console.log('reach end', event)
    this.setState({ isLoading: true })
    setTimeout(() => {
      genData(++pageIndex)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(
          dataBlobs,
          sectionIDs,
          rowIDs
        ),
        isLoading: false
      })
    }, 1000)
  }

  render () {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED'
        }}
      />
    )
    let index = data.length - 1
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1
      }
      const obj = data[index--]
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6'
            }}
          >
            {obj.title}
          </div>
          <div style={{ display: 'flex', padding: '15px 0' }}>
            <img
              style={{ height: '64px', marginRight: '15px' }}
              src={obj.img}
              alt=''
            />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                {obj.des}
              </div>
            </div>
          </div>
        </div>
      )
    }

    console.log(this.state.dataSource)

    return (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>{this.props.activeCategory}</span>}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>
        )}
        // renderSectionHeader={sectionData => (
        //   <div>{`Task ${sectionData.split(' ')[1]}`}</div>
        // )}
        renderRow={row}
        renderSeparator={separator}
        style={{
          height: this.state.height,
          overflow: 'auto'
        }}
        pageSize={4}
        onScroll={() => {
          console.log('scroll')
        }}
        scrollRenderAheadDistance={500}
      />
    )
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

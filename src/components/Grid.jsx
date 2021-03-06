import React, { Component } from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import { addResizeListener, removeResizeListener } from '../js/resize'

const gridStyle = {
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  maxWidth: '100%',
  margin: '0 auto',
}

const gridTileStyle = {
  width: 100,
  height: 100,
  margin: '0 auto',
  boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
  cursor: 'pointer'
}


const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(240, 200, 20, 0.6)',
  textAlign: 'center',
  textDecoration: 'none',
  outline: 'none'
}

const iconFontStyle = {
  fontSize: 72,
  color: '#fff',
  margin: '0 auto'
}

export default class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cols: null,
      padding: null
    }
  }
  componentDidMount() {
    addResizeListener(this.resize)
    this.resize()
  }
  componentWillUnmount() {
    removeResizeListener(this.resize)
  }
  resize = () => {
    if (window.innerWidth < 420) {
      this.setState({
        cols: 2
      })
    } else if (window.innerWidth < 960) {
      this.setState({
        cols: 3,
        maxWidth: 768
      })
    } else {
      this.setState({
        cols: 6,
        maxWidth: 960
      })
    }

    if (window.innerWidth < 480) {
      this.setState({
        padding: 20
      })
    } else if (window.innerWidth < 560) {
      this.setState({
        padding: 40
      })
    } else {
      this.setState({
        padding: 60
      })
    }
  }
  click = (proxy, link) => {
    window.chrome.tabs.update({
      url: link.url
    })
  }
  render() {
    const style = {
      grid: {
        ...gridStyle,
      },
      gridList: {
        maxWidth: this.state.maxWidth
      },
      gridTile: {
        ...gridTileStyle
      },
      icon: {
        ...iconStyle
      },
      iconFont: {
        ...iconFontStyle
      }
    }
    return (
      <div style={style.grid}>
        <GridList
          cellHeight="auto"
          cols={this.state.cols}
          padding={this.state.padding}
          style={style.gridList}
        >
          {this.props.links.map((link, index) => (
            <GridTile
              key={`${link.title}-${index}`}
              title={link.title}
              style={style.gridTile}
              onClick={e => this.click(e, link)}
            >
              <div style={style.icon}>
                <i
                  className="material-icons"
                  style={style.iconFont}
                >{link.icon}</i>
              </div>
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}

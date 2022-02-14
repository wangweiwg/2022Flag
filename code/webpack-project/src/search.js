import React from 'react'
import ReactDOM from 'react-dom'
import '../static/styles/search.less'
import img from '../static/images/img.webp'

class Search extends React.Component {
    render() {
        return (
            <div className='search-text'>
                <p>搜索内容区域，为什么没有变化呢??</p>
                <img src={ img } />
            </div>
        )
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)
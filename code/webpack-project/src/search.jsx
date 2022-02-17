import React from 'react'
import ReactDOM from 'react-dom'
import '../static/styles/search.less'
import img from '../static/images/img.webp'

function Search() {
    return (
        <div className='search-text'>
            <p>搜索内容区域，hahah</p>
            <img src={img} alt='图片' />
        </div>
    )
}

ReactDOM.render(
    <Search />,
    document.getElementById('root'),
)

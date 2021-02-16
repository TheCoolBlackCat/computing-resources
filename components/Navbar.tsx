import React, { Component } from 'react'
import Link  from 'next/link'

type Props = {
    items: Array<{
        name: string
        link: string
        active?: true
    }>
    brandText: string
    brandLink: string
    prefix: string
}

export default class Navbar extends Component<Props> {
    static defaultProps = {
        brandLink: "/",
        prefix: ""
    }

    render() {
        const {items, prefix, brandLink, brandText} = this.props
        const current = <span className='aria-hidden'> (current)</span>
        const dropdownItems = items.map((item, i) => 
            <li className={'nav-item'} key={i}>
                <Link href={`${prefix}${item.link}`}>
                    <a className='nav-link'>{item.name}{/*item.active || current*/}</a>
                </Link>
                
            </li>
        )

        return (
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className="container-fluid">
                    <Link href={brandLink}>
                        <a className='navbar-brand' >{brandText}</a>
                    </Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarDropdown' aria-controls='navbarDropdown' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarDropdown'>
                        <ul className='navbar-nav mr-auto'>
                            {dropdownItems}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

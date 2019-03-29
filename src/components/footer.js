import React from 'react'
import { Link } from 'gatsby'
import { Col, Row } from 'reactstrap'
import SocialLinks from './SocialLinks.jsx'
/*
_menuArray object details:
  name:  the title of the menu item (link text)
  id: id used for unique key. top level is numbered, submenu adds letters.
  drop: true/false, specifies if it is a dropdown menu
  url: the url for Link
  submenu: a nested array for dropdown menu items
*/

const _menuArray = [
  {
    name: 'Our Solutions',
    id: '1',
    links: [
      {name: 'Responsive Web Design', id: '1a', url: '/responsive-web-design'},
      {name: 'Software Development', id: '1b', url: '/software-development'},
      {name: 'eCommerce Design', id: '1c', url: '/ecommerce-design'},
      {name: 'Digital Marketing', id: '1d', url: '/digital-marketing'},
    ]
  },
  {
    name: 'Alkemy Blog',
    id: '2',
    links: [
      {name: 'Read the Latest', id: '2a', url: '/alkemy-blog'},
      {name: 'View the Archives', id: '2b', url: '/alkemy-blog/archives'},
    ]
  },
  {
    name: 'About Us',
    id: '3',
    links: [
      {name: 'About Alkemy, Inc.', id: '3a', url: '/about-alkemy'},
    ]
  },
  {
    name: 'Contact',
    id: '4',
    links: [
      {name: 'Contact Alkemy', id: '4a', url: '/contact-alkemy'},
    ],
    phone: [
      {name: 'By Phone:', id: '4b', textNumber:'877-4ALKEMY', number:'425-5369', url:'tel:8774255369'}
    ]
  }
]

const _subLinks = [
  {name: 'Privacy Policy', id: '1', url: '/privacy-policy'},
  {name: 'Terms & Conditions', id: '2', url: '/terms-and-conditions'},
  {name: 'Site Map', id: '3', url: '/site-map'}
]

const Footer = (props) => (
    <footer className="footer wow fadeInUp p-5">
        <Row>
          {renderLinkAreas(_menuArray)}
        </Row>

        <Row className="my-5 my-lg-0">
          <div className="copyText text-center position-absolute my-5 my-lg-0 px-5">
            Copyright &copy; 2018, Alkemy, Inc.&nbsp;&mdash;&nbsp;
            {renderSubLinks(_subLinks)}
          </div>
          <SocialLinks className="position-absolute mb-3"/>
        </Row>
    </footer>
  )

const renderLinkAreas = (menu) => {
  return menu.map(item=>{
    return(
      <Col xs={12} md={6} lg={3} key={item.id}>
        <h4>{item.name}</h4>
        <ul className="list-unstyled ml-0 mb-5">
          {(item.links.map(link=>{return(<li key={link.id}><Link to={link.url}>{link.name}</Link></li>)}))}
          {(item.phone)
            &&(item.phone.map(phone=>{
              return(
                <li key={phone.id}>{phone.name}: <br/><a href={phone.url}><strong>{phone.textNumber}</strong></a><p>&emsp;&emsp;({phone.number})</p></li>
              )
            })
          )}
        </ul>
      </Col>
    )
  })
}

const renderSubLinks = (menu) => {
  return menu.map((item,index)=>{
    if(index!==menu.length-1){
      return(
        <span key={item.id}><Link to={item.url}>{item.name}&nbsp;|&nbsp;</Link></span>
      )
    }else{
      return(
        <span key={item.id}><Link to={item.url}>{item.name}</Link></span>
      )
    }
  })
}

export default Footer
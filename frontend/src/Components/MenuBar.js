import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const MenuBar = () => {

    const pathname = window.location.pathname
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
      <div>
        <Menu pointing secondary basic color='purple'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Item
            name='post'
            active={activeItem === 'post'}
            onClick={handleItemClick}
          />
        
         <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
            to="/login"
            />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
             to="/register"
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }


export default MenuBar
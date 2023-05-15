import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';



function SubMenu({ item }) {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);


  return (
    <Sidebar>
      <div className="sidebarLink" onClick={item.subNav && showSubnav}>
        <div className='flex items-center'>
          <span className=''>
            {item.icon}
          </span>
          <div className='sidebarLabel'>{item.title}</div>
        </div>
        <div className='arrow'>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
              ? item.iconClosed
              : null}
        </div>
      </div>

      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link className="dropDownLink" key={index} to={item.path}>
              <span className='text-sm lg:text-2xl'>
                {item.icon}
              </span>
              <div className='sidebarLabel'>{item.title}</div>
            </Link>

          );
        })
      }
    </Sidebar>
  )
}


const Sidebar = styled.section`
  .dropDownLink{
    background: linear-gradient(128.03deg, rgba(97, 153, 219, 0.1) -0.78%, rgba(75, 202, 105, 0.1) 90.56%);
    height: 50px;
    padding-left: 1.5rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: rgba(50, 64, 84, 0.7);
    font-size: 18px;
    
    &:hover {
      background: green;
      cursor: pointer;
      color: #ffffff;
    }
  }

  .sidebarLink{
    display: flex;
    color: #324054;
    justify-content: space-between;
    align-items: center;
    /* padding: 20px; */
    list-style: none;
    height: 50px;
    text-decoration: none;
    font-size: 16px;
    line-height: 20px;
    padding-right: 20px;
    font-weight: 500;
    
    &:hover {
        background: linear-gradient(128.03deg, rgba(97, 153, 219, 0.1) -0.78%, rgba(75, 202, 105, 0.1) 90.56%);
        border-left: 4px solid green;
        cursor: pointer;
    }
  }

  .sidebarLabel{
    margin-left: 20px;
    font-size: 16px;
  }

  .arrow{
    font-size: 20px;
    color:  #71839B;
  }
`



export default SubMenu
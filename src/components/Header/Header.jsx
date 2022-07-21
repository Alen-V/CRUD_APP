import { useState } from 'react';
import './Header.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OutsideClickHandler from 'react-outside-click-handler';

const Header = ({view, setView, user, setUser, setIsRegisterOpen}) => {
  const navItems = [['list-items', 'Листа на предмети'], ['new-item', 'Нов Предмет'], ['search-items', 'Пребарување']]

  const [isUserAccOpen, setIsUserAccOpen] = useState(false)

  const logout = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/logout`, {}, { withCredentials: true })
      const { data } = res
      if (data.success === 1) {
        setUser({})
      }
    } catch (error) {
      
    }
  }

  const printNavItems = (items) => items.map((item, index) => (
    <div key={item[0]+index} className={`nav-item ${view === item[0] ? 'selected' : ''}`} onClick={() => setView(item[0])}>
      <span>{item[1]}</span>
    </div>
  ))

  const userAccMore = (
    <div className='user-acc'>
      {user.admin ? 
      <button className='register-user-btn' onClick={() => setIsRegisterOpen(true)}>Register User</button> : null}
      <button className='logout' onClick={() => logout()}>Logout</button>
    </div>
  )

  return (
    <div className="navbar">
      <div className='nav-container'>
        {printNavItems(navItems)}
      </div>
      <div className='user-container'>
        <OutsideClickHandler onOutsideClick={() => {setIsUserAccOpen(false)}}> 
          <div className='username' onClick={() => setIsUserAccOpen(!isUserAccOpen)}>
            <span>{user.username}</span>
            <span className='icon'><FontAwesomeIcon icon="chevron-down" /></span>
          </div>
          {isUserAccOpen ? userAccMore : null}
        </OutsideClickHandler>
      </div>
    </div>
  )
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;

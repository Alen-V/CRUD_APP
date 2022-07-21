import { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header/Header'
import Register from './components/Register/Register';
import Login from './components/Login/Login'
import ItemsList from './components/ItemsList/ItemsList'
import ItemForm from './components/Item/ItemForm'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown, faChevronRight, faChevronLeft } from '@fortawesome/fontawesome-free-solid'
import OutsideClickHandler from 'react-outside-click-handler';
import { ServerlessItems } from './itemForm';

function App() {
  library.add(fas, faChevronDown, faChevronRight, faChevronLeft)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({})
  const [view, setView] = useState()
  const [items, setItems] = useState([])
  const [isSearched, setIsSearched] = useState(false)
  const [filteredItems, setFilteredItems] = useState([])
  const [isItemSelected, setIsItemSelected] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [searchQuery, setSearchQuery] = useState({})

  useEffect(() => {
    if (!process.env.REACT_APP_BASE_URL) {
      setItems(ServerlessItems)
      setUser({ admin: 1, status: 1 })
      return
    }
    const checkIsLoggedIn = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/status`, { withCredentials: true })
        const { data } = res
        if (data.status === 1) {
          setUser(data)
        }
      } catch (error) {
        
      }
    }
    checkIsLoggedIn()
  }, [])

  useEffect(() => {
    if (!user.status) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }, [user])

  useEffect(() => {
    if (filteredItems.docs && filteredItems.docs.length) {
      setIsSearched(true)
    } else {
      setIsSearched(false)
      document.getElementById('root').scrollTop = 0
    }
  }, [filteredItems])

  useEffect(() => {
    if (!isItemSelected) {
      setSelectedItem({})
    }
  }, [isItemSelected])

  useEffect(() => {
    setIsItemSelected(false)
    setSelectedItem({})
    setFilteredItems([])
    setSearchQuery({})
  }, [view])

  useEffect(() => {
    if (selectedItem.fields) {
      setIsItemSelected(true)
    } else {
      setIsItemSelected(false)
    }
  }, [selectedItem])

  useEffect(() => {
    if (isLoggedIn) {
      const initialLoad = async () => {
        await fetchData(1)
        setView('list-items')
      }
      initialLoad()
    }
  }, [isLoggedIn])

  const fetchData = async (page) => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/items/all/${page}`, {
        withCredentials: true,
      })
      if (res.status === 200) {
        setItems(res.data)
      }
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  const fetchSearchData = async (page) => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/items/query/${page}`, {
        params: {
          ...searchQuery
        },
        withCredentials: true,
      })
      if (res.status === 200) {
        setFilteredItems(res.data)
      }
    } catch (err) {
    }
    setIsLoading(false)
  }

  let container = (<></>);

  if (view === 'list-items') {
    let itemView;
    if (isItemSelected) {
      itemView = (
        <ItemForm 
          view={view} 
          itemData={selectedItem} 
          user={user} 
          setIsItemSelected={setIsItemSelected} 
          setIsLoading={setIsLoading} 
          setSelectedItem={setSelectedItem} 
          itemsPage={items.page} 
          fetchData={fetchData} />
        )
    } else {
      itemView = (
        <ItemsList 
          items={items} 
          fetchData={fetchData} 
          user={user} 
          setSelectedItem={setSelectedItem} 
        />
      )
    }
    container = (
      !isLoading ? itemView : null
    )
  } else if (view === 'new-item') {
    container = (
      <ItemForm 
        view={view} 
        setView={setView}
        title={'New Item'}
        newItem={true}
        itemData={{fields: {}}} 
        user={user} 
        itemsPage={items.totalPages} 
        fetchData={fetchData} 
      />
    )
  } else if (view === 'search-items') {
    let itemView;
    if (!isSearched) {
      itemView = (
        <ItemForm 
          view={view}
          title={'Search'}
          isSearch={1}
          itemData={{fields: {}}} 
          user={user} 
          itemsPage={1} 
          setFilteredItems={setFilteredItems} 
          setSelectedItem={setSelectedItem} 
          fetchData={fetchData}
          setSearchQuery={setSearchQuery}
        />
      )
    } else {
      if (isItemSelected) {
        itemView = (
          <ItemForm 
            view={view} 
            itemData={selectedItem} 
            isSearch={0} 
            user={user} 
            setIsItemSelected={setIsItemSelected} 
            setIsLoading={setIsLoading} 
            setSelectedItem={setSelectedItem}
            itemsPage={filteredItems.page}
            setFilteredItems={setFilteredItems}
            fetchData={fetchData}
            fetchSearchData={fetchSearchData}
            isSearched={isSearched} 
          />
        )
      } else {
        itemView = (
          <ItemsList
            items={filteredItems} 
            isSearch={1} 
            setFilteredItems={setFilteredItems} 
            fetchData={fetchSearchData} 
            user={user} 
            setSelectedItem={setSelectedItem} 
          />
        )
      }
    }
    container = !isLoading ? itemView : null
  }

  const mainPage = (
    <>
      <div className='top-header'>
        <Header view={view} setView={setView} user={user} setUser={setUser} setIsRegisterOpen={setIsRegisterOpen} />
      </div>
      <div className='viewport'>
        {container}
        {isRegisterOpen ? 
          <div className='modal register-user'>
            <OutsideClickHandler onOutsideClick={() => {setIsRegisterOpen(false)}}> 
              <Register setIsRegisterOpen={setIsRegisterOpen} />
            </OutsideClickHandler>
          </div>
        : null}
      </div>
    </>
  )

  const loginPage = (
    <>
      <Login setUser={setUser} />
    </>
  )

  return (
    <div className="App">
      {isLoggedIn ? mainPage : loginPage}
    </div>
  );
}

export default App;

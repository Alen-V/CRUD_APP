import Item from '../Item/Item';
import './ItemsList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ItemsList = ({items, isSearch, fetchData, setSelectedItem, setFilteredItems}) => {
  const { docs, hasNextPage, hasPrevPage, nextPage, prevPage } = items
  const setItem = (item) => {
    setSelectedItem(docs[item])
  }

  if (!docs) return null

  const printItems = docs.map((item, index) => {
    const { fields, createdBy, createdAt, updatedAt } = item
    const { name, surname } = fields
    return (
      <Item 
        key={name+surname+index}
        name={name}
        surname={surname}
        username={createdBy}
        createdAt={createdAt}
        updatedAt={updatedAt}
        setItem={setItem}
        item={index} 
      />
    )
  })
  const navBtns = () => {
    return (
      <div className='pagination-container'>
        <span className={`page-control left ${hasPrevPage ? 'active' : ''}`} onClick={() => fetchData(prevPage)}>
          {hasPrevPage ? <FontAwesomeIcon icon={'chevron-left'}/> : null}
        </span>
        <span className={`page-control right ${hasNextPage ? 'active' : ''}`} onClick={() => fetchData(nextPage)}>
          {hasNextPage ? <FontAwesomeIcon icon={'chevron-right'}/> : null}
        </span>
      </div>
    )
  }
  return (
    <div className='list-items'>
      <div className='list-header'>
        {isSearch ? <span className="back-btn" onClick={() => setFilteredItems([])}><FontAwesomeIcon icon={'chevron-left'} /></span> : null}
        <span className='total-docs'>Total Items: {items.totalDocs}</span>
      </div>
      <div className='list-sub-header'>
            <div className="full-name">
                <span className='item-desc'>Name</span>
                <span className='item-desc'>Surname</span>
            </div>
            <div className='create-desc'>
                <span className='item-desc create-desc-item date'>Created at</span>
                <span className='item-desc create-desc-item date'>Updated at</span>
                <span className='item-desc create-desc-item'>From</span>
            </div>
      </div>
      {printItems}
      {navBtns()}
    </div>
  )
};

ItemsList.propTypes = {};

ItemsList.defaultProps = {};

export default ItemsList;

import './Item.css'

const Item = ({name, surname, username, setItem, item, createdAt, updatedAt}) => {
    const created = new Date(createdAt).toLocaleDateString()
    const updated = new Date(updatedAt).toLocaleDateString()
    return (
        <div className='item' onClick={() => setItem(item)}>
            <div className="full-name">
                <span className='item-desc'>{name}</span>
                <span className='item-desc'>{surname}</span>
            </div>
            <div className='create-desc'>
                <span className='item-desc create-desc-item date'>{created ? created : ''}</span>
                <span className='item-desc create-desc-item date'>{updated ? updated : ''}</span>
                <span className='item-desc create-desc-item'>{username}</span>
            </div>
        </div>
    )
}

export default Item
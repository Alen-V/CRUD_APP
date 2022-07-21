import OutsideClickHandler from 'react-outside-click-handler';

const DeleteItemModal = ({ setDeleteItemModal, deleteItem, id }) => {
    return (
        <div className="modal">
          <OutsideClickHandler onOutsideClick={() => {setDeleteItemModal(false)}}>
            <div className="delete-item-confirm">
              <div className="delete-item-title">
                <span>Are you sure you want to delete this item ?</span>
              </div>
              <button className="delete-item" onClick={() => deleteItem(id)}>Delete</button>
            </div>
          </OutsideClickHandler>
        </div>
    )
}

export default DeleteItemModal
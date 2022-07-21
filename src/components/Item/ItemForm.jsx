import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormEl from "./FormEl";
import './ItemForm.css';
import { FormItems } from "../../itemForm";
import DeleteItemModal from "./DeleteItemModal";

const ItemForm = ({
  view, 
  title, 
  newItem, 
  itemData, 
  isSearch, 
  user, 
  setIsItemSelected, 
  setSelectedItem, 
  setIsLoading, 
  setFilteredItems, 
  itemsPage, 
  fetchData,
  fetchSearchData,
  setSearchQuery,
  isSearched,
  setView}) => {

  const fields = {
    name: itemData.fields.name ? itemData.fields.name : '', 
    surname: itemData.fields.surname ? itemData.fields.surname : '',
    id: itemData.fields.id ? itemData.fields.id : '', 
    sex: itemData.fields.sex ? itemData.fields.sex : '', 
    area: itemData.fields.area ? itemData.fields.area : '', 
    municipality: itemData.fields.municipality ? itemData.fields.municipality : '', 
    region: itemData.fields.region ? itemData.fields.region : '', 
    address: itemData.fields.address ? itemData.fields.address : '', 
    phoneNumber: itemData.fields.phoneNumber ? itemData.fields.phoneNumber : '', 
    email: itemData.fields.email ? itemData.fields.email : '', 
    age: itemData.fields.age ? itemData.fields.age : '', 
    ethnicity: itemData.fields.ethnicity ? itemData.fields.ethnicity : '', 
    religion: itemData.fields.religion ? itemData.fields.religion : '', 
    education: itemData.fields.education ? itemData.fields.education : '', 
    societalStatus: itemData.fields.societalStatus ? itemData.fields.societalStatus : '', 
    nFamily: itemData.fields.nFamily ? itemData.fields.nFamily : '', 
    monthlyIncome: itemData.fields.monthlyIncome ? itemData.fields.monthlyIncome : '',
    health: itemData.fields.health ? itemData.fields.health : '',
    maritalStatus: itemData.fields.maritalStatus ? itemData.fields.maritalStatus : '',
    sexOrientation: itemData.fields.sexOrientation ? itemData.fields.sexualOrientation : '',
    gender: itemData.fields.gender ? itemData.fields.gender : '',
    field: itemData.fields.field ? itemData.fields.field : '',
    problem: itemData.fields.problem ? itemData.fields.legalProblem : '',
    advice: itemData.fields.advice ? itemData.fields.legalAdvice : '',
    noticeDate: itemData.fields.noticeDate ? itemData.fields.dateOfNotice.slice(0,10) : '',
    submissionDate: itemData.fields.submissionDate ? itemData.fields.dateOfSubmission.slice(0,10) : '',
    waitPeriod: itemData.fields.waitPeriod ? itemData.fields.waitingPeriod : '',
    resolution: itemData.fields.resolution !== undefined ? `${itemData.fields.resolution}` : '',
    status: itemData.fields.status !== undefined ? `${itemData.fields.status}` : ''
  };

  const [isDisabled, setIsDisabled] = useState(true)
  const [deleteItemModal, setDeleteItemModal] = useState(false)

  useEffect(() => {
    if (newItem || isSearch) {
      setIsDisabled(false)
    }
  }, [newItem, isSearch])

  const setEditFields = (state) => {
    if (state === true) {
      reset({...fields})
    }
    setIsDisabled(state)
  }
  
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/items/${id}`, { withCredentials: true })
      if (res.data.message === 'Success') {
        alert(res.data.message)
        if (!isSearched) {
          await fetchData(itemsPage)
        } else {
          await fetchSearchData(itemsPage)
        }
        setIsItemSelected(false)
      }
    } catch (error) {
      
    }
  }

  const { register, handleSubmit, formState: { errors },  reset } = useForm({
    defaultValues: {
      ...fields
    }
  });

  useEffect(() => {
    if (view !== 'list-items') {
      reset({...fields})
    }
  }, [reset, view])

  const checkQuery = (query) => {
    let isParam;
    let obj = {...query}
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        if (element === '') {
          delete obj[key]
        } else {
          obj[key] = obj[key].trim()
          isParam = key
        }
      }
    }
    return [obj, isParam]
  }

  const onSubmit = async (itemFormData) => {
    let path = '/items/';
    let method;
    let sendData = {
      ...itemFormData,
      noticeDate: new Date(itemFormData.noticeDate),
      submissionDate: new Date(itemFormData.submissionDate),
      resolution: itemFormData.resolution === 'true',
      status: itemFormData.status === 'true'
    }
    let data = {
      fields: sendData
    }
    let params = {}
    if (!newItem && itemData && itemData._id) {
      path += `${itemData._id}`
      method = 'put'
    } else if (isSearch) {
      const [queryData, check] = checkQuery(itemFormData) 
      if (!queryData[check]) {
        alert('No items found')
        return
      }
      setSearchQuery({...queryData})
      path += 'query/1'
      method = 'get'
      data = {}
      params = {
        ...queryData
      }
    } else {
      path += 'create'
      method = 'post'
    }
    try {
      const res = await axios({
        method,
        url: `${process.env.REACT_APP_BASE_URL}${path}`,
        data,
        params,
        withCredentials: true
      })
      if (method === 'get') {
        if (res.status === 200) {
          if (res.data.docs.length === 0) {
            alert('No items found!')
            reset()
          }
          setFilteredItems(res.data)
        }
        return
      }
      if (res.data === 'gud' || (res.data && res.data.status === 1))
      if (!isSearched) {
        await fetchData(itemsPage)
      } else {
        await fetchSearchData(itemsPage)
      }
      if (method === 'post' && res.data === 'gud') {
        reset()
        alert('Succefully created a new item')
        if (newItem) {
          setView('list-items')
        }
      }
      if (method === 'put' && res.data.status === 1) {
        setIsLoading(true)
        setSelectedItem({
          ...res.data.item
        })
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <div className="item-form-container">
      <div className="title">
        <span className="item-title">
          {!newItem && !isSearch ? <span className="back-btn" onClick={() => setIsItemSelected(false)}><FontAwesomeIcon icon={'chevron-left'} /></span> : null}
          {(!newItem && !isSearch) ? 
            `${itemData.fields.name} ${itemData.fields.surname}` :
             title}
        </span>
        {(!newItem && !isSearch) && user.admin ?
          <div className="edit-user-container">
            <button className={`edit-form ${isDisabled ? '' : 'cancel'}`} onClick={() => setEditFields(!isDisabled)}>{isDisabled ? 'Edit' : 'Cancel'}</button>
            <button className={`delete-item`} onClick={() => setDeleteItemModal(true)}>Избриши</button>
          </div>
        : null}
      </div>
      <form className='item-form' onSubmit={handleSubmit((data) => onSubmit(data))}>
        {FormItems.map((fItem, i) => 
          <FormEl key={fItem.el+i} isDisabled={isDisabled} el={fItem.el} type={fItem.type} err={errors} register={register} item={fItem.item} text={fItem.text} required={isSearch ? 0 : 1} />
        )}
        {newItem || !isDisabled || isSearch ? 
          <input 
            className='form-item submit-btn' 
            type="submit" 
            value={isSearch ? 'Search' : 'Save'} /> 
        : null}
      </form>
      {deleteItemModal &&
        <DeleteItemModal setDeleteItemModal={setDeleteItemModal} deleteItem={deleteItem} id={itemData._id} />
      }
    </div>
  );
}

ItemForm.propTypes = {};

ItemForm.defaultProps = {};

export default ItemForm;

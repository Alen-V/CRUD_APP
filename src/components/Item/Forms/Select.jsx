import { selectOptions } from "../../../itemForm";
import { ErrorMessage } from '@hookform/error-message';

const Select = ({isDisabled, register, item, required, err}) => {
    const isRequired = required ? 'Please choose one option' : false;
    if (!selectOptions[item]) return null
    return (
        <>
            <select className="form-item" {...register(item, { required: isRequired })} name={item} disabled={isDisabled}>
                {selectOptions[item].map((option, index) => {
                    return (
                        <option 
                            key={option+index} 
                            hidden={option === '' ? true : false}
                            value={option}>{option}</option>
                    )
                })}
            </select>
            <ErrorMessage
                    errors={err}
                    name={item}
                    render={({ message }) => <p className='fill_out_form'>{message}</p>}
                    />
        </>
    )
}

export default Select
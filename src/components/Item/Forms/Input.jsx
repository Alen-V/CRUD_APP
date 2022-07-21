import { radioOptions } from '../../../itemForm/index'
import { ErrorMessage } from '@hookform/error-message';

const Input = ({isDisabled, type, item, required, register, err}) => {
    const isInputRequired = required ? 'Please fill in this field!' : false
    const isRadioRequired = required ? 'Please choose one option!' : false
    if (type === 'radio') {
        if (!radioOptions[item]) return null
        return <>
            {radioOptions[item].map((option, index) => {
                const val = radioOptions[item+'Val'][option]
                return (
                    <div key={option+index}>
                        <input 
                            className='form-item' 
                            {...register(item, { required: isRadioRequired })} 
                            value={val}
                            name={item}
                            type={type} 
                            placeholder="" 
                            disabled={isDisabled}
                        />
                        <label htmlFor={option}>{option}</label>
                    </div>
                    )
            })}
            <ErrorMessage
                    errors={err}
                    name={item}
                    render={({ message }) => <p className='fill_out_form'>{message}</p>}
                    />            
        </>
    } else {
        return( 
            <>
                <input className='form-item' {...register(item, { required: isInputRequired })} type={type} placeholder=""disabled={isDisabled} />
                <ErrorMessage
                    errors={err}
                    name={item}
                    render={({ message }) => <p className='fill_out_form'>{message}</p>}
                    />            
            </>
        )
    }
}

export default Input
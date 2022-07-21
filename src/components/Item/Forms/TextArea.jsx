import { ErrorMessage } from '@hookform/error-message';

const TextArea = ({isDisabled, item, register, required, err}) => {
    const isRequired = required ? 'Please fill in this field!' : false
    return (<>
        <textarea 
        className="form-item" 
        {...register(item, { required: isRequired })} 
        name={item} 
        disabled={isDisabled}
        cols="30" rows="10"></textarea>
        <ErrorMessage
            errors={err}
            name={item}
            render={({ message }) => <p className='fill_out_form'>{message}</p>}
            />
    </>
    )
}

export default TextArea
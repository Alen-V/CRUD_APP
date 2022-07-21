import Input from "./Forms/Input";
import Select from "./Forms/Select";
import TextArea from "./Forms/TextArea";

const FormEl = ({isDisabled, register, el, item, text, required, type, err}) => {
    let formEl;
    if (el === 'input') {
        formEl = <Input err={err} isDisabled={isDisabled} type={type} item={item} required={required} register={register} />
    } else if (el === 'select') {
        formEl = <Select err={err} isDisabled={isDisabled} register={register} item={item} required={required} />
    } else if (el === 'textarea') {
        formEl = <TextArea err={err} isDisabled={isDisabled} register={register} item={item} required={required} />
    }

    return (
      <span className={`desc-container ${el === 'textarea' || type === 'radio' ? 'full-page' : ''}`}>
        <label htmlFor={item}>{text} {required ? '**' : ''}</label>
        {formEl}
      </span>
    )
}

export default FormEl
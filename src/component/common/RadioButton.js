const RadioButton = ({data,formik,label}) => {
    return ( <>
    <input
        type="radio"
        id={data}
        name="gender"
        value={data}
        onChange={formik.handleChange}
        checked={formik.values.gender === data}
    />
    <label htmlFor={data}>{label}</label> 
    {formik.errors.gender && formik.touched.gender && (
				<div className="error"> {formik.errors.gender}</div>
			)}
    </> );
}
 
export default RadioButton;
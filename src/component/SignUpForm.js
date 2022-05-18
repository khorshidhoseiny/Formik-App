import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Input from "./common/Input";
import RadioButton from "./common/RadioButton";
import Select from "./Select";
import CheckBoxInput from "./common/CheckBoxInput";

const CheckBoxOption = [
	{ label: "Ract.js", value: "React" },
	{ label: "Vue.js", value: "Vue" },
];

const selectOption = [
	{ label: "Select Nationality...", value: "" },
	{ label: "Iran", value: "IR" },
	{ label: "Germany", value: "GER" },
	{ label: "USA", value: "US" },
];


const initialValues = {
	name: "",
	email: "",
	phoneNumber: "",
	password: "",
	passwordConform: "",
	gender: "",
	nationality: "",
	interests: [],
	terms:false
};

const validationSchema = Yup.object({
	name: Yup.string()
		.required("وارد کردن اسم الزامی است")
		.min(4, "لطفا اسم طولانی تری بنویسید"),
	email: Yup.string()
		.email("لطفا فرمت ایمیل وارد کنید")
		.required("وارد کردن ایمیل الزامی است"),
	phoneNumber: Yup.string()
		.required("وارد کردن شماره الزامی است")
		.matches(/^[0-9]{11}$/, "شماره ای که وارد کردید اشتباه است")
		.nullable(),
	password: Yup.string()
		.required("وارد کردن پسورد الزامی است")
		.matches(
			/^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?][0-9a-zA-Z]*$/,
			"Need one special character"
		),
	passwordConform: Yup.string()
		.required("وارد کردن تایید پسورد لازم است")
		.oneOf([Yup.ref("password"), null], "پسورد باید یکی باشد"),
	gender: Yup.string().required("gender is required"),
	nationality: Yup.string().required("select Nationality !"),
	interests: Yup.array().min(1).required(" select One Interest"),
	terms:Yup.boolean().oneOf([true],"the terms and conditional must be accepted")
});
const SignUpForm = () => {
	const [formData, setFormData] = useState(null);
	

	const onSubmit=(values)=>{
console.log(values,"ONE SUBMIT");
axios.post("http://localhost:3001/users/",values).then(res=>console.log(res.data)).catch(err=>console.log(err))

	}
	const formik = useFormik({
		initialValues: formData || initialValues,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
		onSubmit
	});

	// const onSubmit=(values)=>{
		// axios.post("http://localhost:3001/users/1",values).then(res=>console.log(res.data)).catch(err=>console.log(err))
	// 	}
	console.log(formik.errors);
	useEffect(() => {
		axios
			.get("http://localhost:3001/users/1")
			.then((res) => setFormData(res.data))
			.catch((err) => console.log(err));
	}, []);

	// console.log(formik.errors.nationality);
	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<Input label="Name" name="name" formik={formik} />
				<Input label="Email" name="email" formik={formik} />
				<Input label="Phone Number" name="phoneNumber" formik={formik} />
				<Input
					label="Password"
					name="password"
					formik={formik}
					type="password"
				/>
				<Input
					label="Password Coniform"
					name="passwordConform"
					formik={formik}
					type="password"
				/>
				<div className=".radioControl">
					<RadioButton data="0" formik={formik} label="Male" />
					<RadioButton data="1" formik={formik} label="Female" />
				</div>
				<Select
					selectOption={selectOption}
					formik={formik}
					name="nationality"
				/>
				<CheckBoxInput
					CheckBoxOption={CheckBoxOption}
					formik={formik}
					name="interests"
				/>
				<>
				<input
						type="checkbox"
						id="terms"
						name="terms"
						value={true}
						onChange={formik.handleChange}
						checked={formik.values.terms}
					/>
					<label htmlFor="terms">Terms & According</label>
				{formik.errors.terms && formik.touched.terms && (
				<div className="error"> {formik.errors.terms}</div>
			)}
				</>
				


				<button type="submit" disabled={!formik.isValid}>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignUpForm;

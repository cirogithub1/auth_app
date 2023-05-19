import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { useRef, useState } from "react"
import { useRouter } from "next/router"

import { useFormik } from "formik"
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi"

import Layout from "@/layout/Layout"

import { registerValidate } from "@/lib/validate"

export default function Register() {
	const [show, setShow] = useState({
		passShow: false,
		cPassShow: false
	})
	const inputPass:any = useRef()
	const cInputPass:any = useRef()
	const router = useRouter()
	const formik = useFormik({
		initialValues: {
			username:"",
			email:"",
			password:"",
			cPassword:""
		},
		validate: registerValidate,
		onSubmit
	})

	async function onSubmit() {
		const options = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(formik.values)
		}

		try {
			const res = await fetch('http://localhost:3000/api/auth/signup', options)
			const data = await res.json()
			console.log('pages/register.tsx: data =', data)
			if (data.status) {
				router.push("http://localhost:3000")
			}
			
		} catch (error) {console.error(error)}
	}

	return (
		<Layout>
			<Head>
				<title>
					Register
				</title>
			</Head>
			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
					<p className="w-3/4 mx-auto text-gray-400">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
						aperiam.
					</p>
				</div>

				{/* form */}
				<form 
					className="flex flex-col gap-2"
					onSubmit={formik.handleSubmit}>
					<div className={`input_group ${formik.errors.username && formik.touched.username && 'border border-rose-600'}`}>
						<input
							className='input_text'
							type="text"
							// name="username"
							placeholder="Username"
							{...formik.getFieldProps("username")}/>
						<span className="icon flex items-center px-4">
							<HiOutlineUser size={30}/>
						</span>
					</div>
					{formik.errors.username && formik.touched.username && <span className="text-yellow-400">{formik.errors.username}</span>}

					<div className={`input_group ${formik.errors.email && formik.touched.email && 'border border-rose-600'}`}>
						<input
							className='input_text'
							type="email"
							// name="email"
							placeholder="Email"
							{...formik.getFieldProps("email")}/>
						<span className="icon flex items-center px-4">
							<HiAtSymbol size={30}/>
						</span>
					</div>
					{formik.errors.email && formik.touched.email && <span className="text-yellow-400">{formik.errors.email}</span>}

					<div className={`input_group ${formik.errors.password && formik.touched.password && 'border border-rose-600'}`}>
						<input
							className='input_text'
							type={`${show.passShow ? "text" : "password"}`}
							ref={inputPass}
							// name="password"
							placeholder="Password"
							{...formik.getFieldProps("password")}/>
							
						<span 
							className="icon flex items-center px-4"
							onClick={() => {setShow({ ...show, passShow:!show.passShow}); inputPass.current.focus()}}>
							<HiFingerPrint size={30}/>
						</span>
					</div>
					{formik.errors.password && formik.touched.password && <span className="text-yellow-400">{formik.errors.password}</span> }

					<div className={`input_group ${formik.errors.cPassword && formik.touched.cPassword && 'border border-rose-600'}`}>
						<input
							className="input_text"
							type={`${show.cPassShow ? "text" : "password"}`}
							ref={cInputPass}
							// name="cPassword"
							placeholder="Confirm Password"
							{...formik.getFieldProps("cPassword")}/>
						<span 
							className="icon flex items-center px-4"
							onClick={() => {
								setShow({...show, cPassShow:!show.cPassShow}) 
							}}>
							<HiFingerPrint size={30}/>
						</span>
					</div>
					{formik.errors.cPassword && formik.touched.cPassword && <span className="text-yellow-400">{formik.errors.cPassword}</span> }

					{/* bottom sign in */}
					<div className="input_button">
						<button 
							type="submit"
							onClick={onSubmit}>
								Submit
						</button>
					</div>

					{/* <div className="">
						<button 
							className='custom_button' 
							type="button">
								Sign in with Google   
								<Image 
									src={'/assets/google-icon-logo-svgrepo-com.svg'} 
									width='25' 
									height='25' 
									alt='google-icon-logo-svgrepo-com.svg'>
								</Image>
						</button>
					</div> */}
					
					{/* <div className="">
						<button className='custom_button' type="button">Sign in with Github  <Image src={'/assets/github-mark.svg'} width='25' height='25' alt='github-mark.svg'></Image></button>
					</div> */}
				</form>
				
				{/* bottom sign up*/}
				<p className="text-center text-gray-400">
					Have an account?  
					<br />
					<Link className="text-blue-800" href={'/login'}>Sign In</Link>
				</p>
			</section>		</Layout>
	)
}
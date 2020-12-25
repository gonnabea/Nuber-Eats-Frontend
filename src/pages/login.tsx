import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
    email?: string;
    password?: string;
}

export const Login = () => {
    const {register, getValues, errors, handleSubmit} = useForm<ILoginForm>()
    const onSubmit = () => {
        console.log(getValues())
    }
    return <span className="h-screen flex items-center justify-center bg-gray-800">
        <div className="bg-white w-full max-w-lg pt-10 pb-5 rounded-lg text-center">
            <h3 className="font-3xl text-2xl text-gray-800">Log In</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 px-5">
                <input ref={register({required: "Email is required"})} name="email" required type="email" placeholder="Email" className="mb-3 input"></input>
                {errors.password?.message && <span className="font-medium text-red-500">{errors.email?.message}</span>}
                <input ref={register({required: "Password is required", minLength: 10})} name="password" required type="password" placeholder="Password" className="input"></input>
                {errors.password?.type === "minLength" && <span className="font-medium text-red-500">Password must be more than 10 chars.</span>}
            <button className="btn mt-3">
                Log In
            </button>
            </form>
        </div>
    </span>
}
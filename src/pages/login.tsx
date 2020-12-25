import React from "react";
import { FormError } from "../components/form-error"
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
    mutation PotatoMutation($email: String!, $password:String!) {
        login(input: {
            email:$email,
            password:$password
        }) {
            ok,
            token,
            error
        }
    }
`

interface ILoginForm {
    email: string;
    password: string;
}

export const Login = () => {
    const {register, getValues, errors, handleSubmit} = useForm<ILoginForm>()
    const [loginMutation, {loading,error,data}] = useMutation(LOGIN_MUTATION)
    const onSubmit = () => {
        const {email, password} = getValues()
        loginMutation({
            variables: {
                email,
                password
            }
        })
    }
    return <span className="h-screen flex items-center justify-center bg-gray-800">
        <div className="bg-white w-full max-w-lg pt-10 pb-5 rounded-lg text-center">
            <h3 className="font-3xl text-2xl text-gray-800">Log In</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 px-5">
                <input ref={register({required: "Email is required"})} name="email" required type="email" placeholder="Email" className="mb-3 input"></input>
                {errors.email?.message && <FormError errorMessage={errors.email?.message}/>}
                <input ref={register({required: "Password is required", minLength: 3})} name="password" required type="password" placeholder="Password" className="input"></input>
                {errors.password?.message && <FormError errorMessage={errors.password?.message}/>}
                {errors.password?.type === "minLength" && <FormError errorMessage="Password must be more than 3 chars."/>}
            <button className="btn mt-3">
                Log In
            </button>
            </form>
        </div>
    </span>
}
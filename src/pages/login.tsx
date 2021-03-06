import React from "react";
import { FormError } from "../components/form-error"
import { useForm } from "react-hook-form";
import { ApolloError, gql, useMutation } from "@apollo/client";
import nuberLogo from "../images/logo.svg"
import { LoginMutation, LoginMutationVariables } from "../__generated__/LoginMutation"
import {Button} from "../components/button"
import { Link } from "react-router-dom";

const LOGIN_MUTATION = gql`
    mutation LoginMutation($loginInput: LoginInput!) {
        login(input:$loginInput) {
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
    const {register, getValues, errors, handleSubmit, formState} = useForm<ILoginForm>({
        mode:"onChange"
    })
    const onCompleted = (data: LoginMutation) => {
        const { login: {error, ok, token} } = data
        if(ok) {
            console.log(token)
        }
    }
    const [loginMutation, {data: loginMutationResult, loading }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
        onCompleted
    })
    const onSubmit = () => {
        if(!loading){
            const {email, password} = getValues()
            loginMutation({
                variables: {
                    loginInput:{
                        email,
                        password
                    }
                }
            })
        }
    }
    return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
        <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">Welcome back</h4>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 w-full mb-3">
                <input ref={register({required: "Email is required"})} name="email" required type="email" placeholder="Email" className="input"></input>
                {errors.email?.message && <FormError errorMessage={errors.email?.message}/>}
                <input ref={register({required: "Password is required", minLength: 3})} name="password" required type="password" placeholder="Password" className="input"></input>
                {errors.password?.message && <FormError errorMessage={errors.password?.message}/>}
                {errors.password?.type === "minLength" && <FormError errorMessage="Password must be more than 3 chars."/>}
            <Button canClick={formState.isValid} loading={loading} actionText={"Log In"}/>
            {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error}/>}
            </form>
            <div>
                New to Nuber? <Link to={"create-account"} className="text-lime-600 hover:underline">Create an Account</Link>
            </div>
            </div>
    </div>
    )
}
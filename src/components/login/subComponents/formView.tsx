import React, { ChangeEvent, useCallback } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AuthStorage, EnumLocalStoreKey, useMultiState } from '../../../lib';
import {FaHeadphones} from 'react-icons/fa';
import { apiLogin, TApiLoginRequest } from '../api';
import { ActionLogin } from '../reducer';
import { ThunkLogin } from '../thunk';
import { useDispatchTyped } from '../../../store/store';

type FormInputs = {
    email: string;
    password: string;
  };

type TState={
    email:string;
    password:string;
    showPassword:boolean;
    isBusy:boolean;
    loginSuccess:boolean;
    error?:string;
}

const initialState:TState={
    email:"",
    password:"",
    showPassword:false,
    isBusy:false,
    loginSuccess:false,
    error:undefined,
}

function FormViewComponent(){
    const { register,errors,handleSubmit} = useForm<FormInputs>({
        mode: 'onSubmit',
        reValidateMode:"onChange",
        defaultValues: {},
    })

    const dispatch = useDispatchTyped();

    const onSubmit=(data:FormInputs) => {
           console.log(data);
           setState({isBusy:true});
           const requestModel:TApiLoginRequest={
               email:data.email,
               password:data.password
           }
           apiLogin(requestModel).then(res=>{
               setState({isBusy:false});
               if(res.response){
                   AuthStorage.setValue(EnumLocalStoreKey.TOKEN, res.response.data.access_token);
                   dispatch(ThunkLogin.GetProfile({updatedResponse:res.response.data.profile}))
                   dispatch(ActionLogin.setLoginState(true));                   
               }
               else setState({error:res.error?.message});
           })
    }
    

    const [state,setState]=useMultiState(initialState);

    const tooglePassword = useCallback(
        () => {
           setState({showPassword:!state.showPassword});
        },
        [state.showPassword]
    )

    const setInputValue = useCallback(
        (e:ChangeEvent<HTMLInputElement>) => {
           setState({[e.target.name]:e.target.value});
        },
        []
    )

    return (
        <Row className="ml-0 mr-md-3 rounded bg-white">
            <Col>
                <div className="text-center">
                    <FaHeadphones className="display-1 text-primary" />
                </div>
                {!!state.error && <p className="text-danger text-center">{state.error}</p>}
                <Form onSubmit={handleSubmit(onSubmit)} onChange={()=>setState({error:undefined})}>
                    <Form.Group>
                        <Form.Control className="mt-2" type="email" name="email" 
                            value={state.email} onChange={setInputValue} placeholder="Email" 
                            ref={register({required:"Email is required"})} />
                        <p className="text-danger"> {errors.email? errors.email.message:""}</p>

                        <Form.Control className="" type={state.showPassword?"text":"password"} 
                            name="password" placeholder="Password" value={state.password} onChange={setInputValue} 
                            ref={register({required:"Password is required",minLength:{value:5, message:"Password must be at least 5 character"},max:20})} />
                        <p className="text-right mb-0"> <small className="cur-point hover-primary" 
                            onClick={tooglePassword} >{state.showPassword?"Hide":"Show"}</small> </p>

                        {!!errors.password && <p className="mt-0 text-danger">{errors.password.message}</p>}
                        <Button className="mb-2" type="submit" disabled={state.isBusy}>Sign in</Button>
                        {/* <p><Link to={UiRoutes.ForgotPassword} >Forgot Password</Link></p> */}
                    </Form.Group>
                    <hr/>
                    {/* <p className="text-center text-info">Don't have an account?</p>
                    <p className="text-center">
                        <Link to={UiRoutes.SingUp} className="h2 bg-success text-white px-2 text-decoration-none rounded">
                            Create Account
                        </Link>
                    </p> */}
                </Form>
            </Col>
        </Row>
    )
}

export const FormView = React.memo(FormViewComponent);
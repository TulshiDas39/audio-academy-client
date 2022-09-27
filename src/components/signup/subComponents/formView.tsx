import React, { ChangeEvent, useCallback } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthStorage, EnumLocalStoreKey, EnumUserType, UiRoutes, useMultiState } from '../../../lib';
import {FaHeadphones} from 'react-icons/fa';
import { IApiSignUpRequest } from '../typing/apiModels';
import { apiSignUp } from '../api';
import { ActionLogin } from '../../login/reducer';
import { useDispatchTyped } from '../../../store/store';

interface IFormInputs extends IApiSignUpRequest{
};

interface IState{
    showPassword:boolean;
    isBusy:boolean;
}

const initialState:IState={
    showPassword:false,
    isBusy:false,
}

function FormViewComponent(){
    const { register,errors,handleSubmit } = useForm<IFormInputs>({
        mode: 'onSubmit',
        reValidateMode:"onChange",
        defaultValues: {},
    })

    const navigate = useNavigate();
    const dispath = useDispatchTyped();

    const onSubmit=(data:IFormInputs) => {
           setState({isBusy:true});
           apiSignUp(data).then(res=>{
               setState({isBusy:false});
               if(res.response) {
                   AuthStorage.setValue(EnumLocalStoreKey.TOKEN, res.response.data.access_token);
                   dispath(ActionLogin.setLoginState(true));
                   navigate(UiRoutes.ContributorDashBoard);
                }
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
        [state.showPassword]
    )

    return (
        <Row className="ml-0 mr-md-3 rounded bg-white">
            <Col>
                <div className="text-center">
                    <FaHeadphones className="display-1 text-primary" />
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>

                        <div className="text-center">
                            <Form.Check
                                type="radio"
                                label="Student"
                                name="type"
                                value={EnumUserType.STUDENT}
                                id="studentRadioButton"
                                defaultChecked
                                inline
                                ref={register()}
                            />
                            <Form.Check
                                type="radio"
                                label="Instructor"
                                name="type"
                                value={EnumUserType.CONTRIBUTOR}
                                id="instructorRadioButton"
                                inline
                                ref={register()}
                            />
                        </div>
                        
                        <Form.Control className="mt-2" type="text" name="name" 
                            onChange={setInputValue} placeholder="Full name" 
                            ref={register({required:"Name is required"})} />
                        <p className="text-danger"> {errors.name? errors.name.message:""}</p>

                        <Form.Control className="mt-2" type="email" name="email" 
                            onChange={setInputValue} placeholder="Email" 
                            ref={register({required:"Email is required"})} />
                        <p className="text-danger"> {errors.email? errors.email.message:""}</p>

                        <Form.Control className="mt-2" type="text" name="phone" 
                            onChange={setInputValue} placeholder="Phone number" 
                            ref={register({required:"Phone number is required"})} />
                        <p className="text-danger"> {errors.phone? errors.phone.message:""}</p>

                        <Form.Control className="" type={state.showPassword?"text":"password"} 
                            name="password" placeholder="Password" onChange={setInputValue} 
                            ref={register({required:"Password is required",minLength:{value:5, message:"Password must be at least 5 character"},max:20})} />
                        <p className="text-right mb-0"> <small className="cur-point hover-primary" 
                            onClick={tooglePassword} >{state.showPassword?"Hide":"Show"}</small> </p>

                        {!!errors.password && <p className="mt-0 text-danger">{errors.password.message}</p>}
                        <Button className="mb-2" type="submit" disabled={state.isBusy}>Sign up</Button>
                        <p><Link to={UiRoutes.ForgotPassword} >Forgot Password</Link></p>
                    </Form.Group>
                    <hr/>
                    <p className="text-center text-info">Have an account?</p>
                    <p className="text-center">
                        <Link to={UiRoutes.Login} className="h5 bg-success text-white px-2 text-decoration-none rounded">
                            Log in
                        </Link>
                    </p>
                </Form>
            </Col>
        </Row>
    )
}

export const FormView = React.memo(FormViewComponent);
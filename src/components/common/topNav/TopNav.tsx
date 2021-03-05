import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaHeadphones, FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Constants, UiRoutes } from '../../../lib';
import { useSelectorTyped } from '../../../store/rootReducer';
import { ThunkLogin } from '../../login/thunk';
import './contributorTopNav.scss';

const CustomToggle = React.forwardRef<HTMLSpanElement,any>(({onClick}, ref) => {
    const store = useSelectorTyped(state=>({
        apiProfileVersion:state.api.getProfile.version,
    }))
    return (
        <span ref={ref} onClick={onClick} className="cur-point">
            <span title={ThunkLogin.Profile.name}>{ThunkLogin.Profile?.name?.split?.(" ")?.[0]}</span>
            <FaUserCircle className="" />
        </span>
  )});

function TopNavComponent(){

    const dispatch = useDispatch();

    const handleLogout=()=>{
        dispatch(ThunkLogin.Logout())
    }

    return (
        <div className="contributorTopNav bg-success row mx-0 align-items-center">
            <div className="col-auto">
                <Link to={UiRoutes.ContributorDashBoard} className="text-white hover-no-underline">
                    <FaHeadphones className="h6 mr-1" />
                    <span className="h5">{Constants.SiteName}</span>
                </Link>
            </div>
            <div className="col text-right">
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-basic-we">
                        hi
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export const TopNav = React.memo(TopNavComponent);
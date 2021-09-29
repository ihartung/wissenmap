import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import routes from './routes.js';
import axios from 'axios';
import {createUseStyles} from 'react-jss';
import { GoogleLogout, GoogleLogin } from 'react-google-login';


const clientId ='43484635742-eaa1v6v83q2unc17ub76ggnaaqi2ea1v.apps.googleusercontent.com';

export default function AuthButton(props){

	const handleResponse = (response) => {
		console.log(response);
		var headers = {'X-CSRFToken':localStorage.getItem('csrftoken'), 'Authorization':response.tokenId}
		var data = {'access_token':response.accessToken}
		axios({ 
			url: routes.root + '/rest-auth/google/',
			method: 'post',
			data: data,
			headers: headers}).then(result => {
				localStorage.removeItem('authtoken');
				localStorage.setItem('authtoken', result.data.csrfToken);
				props.handleAuth(true);
				console.log(result);
				return result.status;
			}).catch(error => console.log(error));
	}

	const onSuccess = () => {
		console.log('Logout made successfully');
		//alert('Logout made successfully ✌');
		var headers = {'X-CSRFToken':localStorage.getItem('csrftoken')}
		var data = {'csrfmiddlewaretoken':localStorage.getItem('csrftoken')};
		axios({ 
			url: routes.root + '/rest-auth/logout/',
			method: 'post',
			data: data,
			headers: headers,
			}).then(() => {
				localStorage.removeItem('authtoken');
				props.handleAuth(false);
			}).catch(error => console.log(error));
	};

	return (

		localStorage.getItem('authtoken') == null ?
		<GoogleLogin
		clientId={clientId}
		buttonText="LOGIN WITH GOOGLE"
		onSuccess={handleResponse}
		onFailure={handleResponse}
		/>:
		<GoogleLogout
		clientId={clientId}
		buttonText="Logout"
		onLogoutSuccess={onSuccess}
		></GoogleLogout>
	);
}

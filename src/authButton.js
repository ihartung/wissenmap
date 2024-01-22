import { GoogleLogout, GoogleLogin } from 'react-google-login';
import axios from 'axios';
import routes from './routes.js';

export const resetCSRF = () => {
	let tmp = document.cookie.split('; ')
		.find(entry => entry.startsWith('csrf'))
		.split('=')[1];
	axios.defaults.headers.post['X-CSRFToken'] = tmp;
	console.log('new csrf = ' + tmp);

}


const clientId ='43484635742-eaa1v6v83q2unc17ub76ggnaaqi2ea1v.apps.googleusercontent.com';

export default function AuthButton(props){

	const handleResponse = (response) => {
		console.log(response);
		var data = {'access_token':response.accessToken}
		axios({ 
			url: routes.root + '/rest-auth/google/login/',
			method: 'post',
			data: data}).then(result => {
				localStorage.setItem('token', result.data.key);
				props.handleAuth(true);
				resetCSRF();
				return result.status;
			}).catch(error => console.log(error));
	}

	const onSuccess = () => {
		console.log('Logout made successfully');
		//alert('Logout made successfully ✌');
		axios({ 
			url: routes.root + '/rest-auth/logout/',
			method: 'post',
		}).then(() => {
			localStorage.removeItem('token');
			props.handleAuth(false);
		}).catch(error => console.log(error));
	};

	return (

		localStorage.getItem('token') == null ?
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

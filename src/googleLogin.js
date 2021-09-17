import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

export default function GoogleSocialAuth () {

    const handleResponse = (response) => {
      console.log(response);}

    return (
        <GoogleLogin
          clientId="<43484635742-eaa1v6v83q2unc17ub76ggnaaqi2ea1v.apps.googleusercontent.com>"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={handleResponse}
          onFailure={handleResponse}
        />
    );
}

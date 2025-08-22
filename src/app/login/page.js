"use client"
import './logInPage.css';

import React, { useState, useEffect, useRef } from 'react';
export default function logIn () {
const [emailVal, setEmailVal] = useState('');
const [passVal, setPassVal] = useState('');
const handleEmailChange = (event) => {
	setEmailVal(event.target.value);
	}
	const handlePassChange = (event) => {
	setPassVal(event.target.value);
	}
const confirm =  () => {
	if (passVal === "1234") {
		    localStorage.setItem('username', emailVal);
		
		window.open("./adder");
		}
		
	else if (passVal === "5678") {
				    localStorage.setItem('username', emailVal);

		window.open ("./products");
		}
		else {
			alert ("no");
			}
	}
return (
	<div className = "logInForm">
	<h1> Log In </h1> <br />
	<input type = "text" value = {emailVal} onChange= {handleEmailChange} className="bg-black-500" placeholder = "Name" /> <br /> <br />
	<input type = "text" value = {passVal} onChange= {handlePassChange} className="bg-black-500" placeholder = "Password" /> <br /> <br />
	<button onClick={confirm} >Confirm </button> <br /> <br />
	<p> password 1234 for Admin </p>
	<p> 5678 for Customers </p>
	<p> Peke are, literally just if else lmao </p>
	</div>
	);
}

import {fireEvent, render, screen} from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BrowserRouter} from "react-router-dom";
import Login from "../Login";
import React from "react";
import {configure, mount, shallow} from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

describe('Testing Login Component', ()=>{
    const onSubmit = jest.fn()
    it('should render the login component',()=>{
        render(<BrowserRouter><Login /></BrowserRouter>)
        const signInHeading = screen.getByText("Sign in to your account")
        expect(signInHeading).toHaveTextContent("account")
    })
    it('should have email input field', ()=>{
        render(<BrowserRouter><Login /></BrowserRouter>)
        const emailInput = screen.getByLabelText("Email address")
        expect(emailInput).toBeInTheDocument()
    })
    it('should have password input field', ()=>{
        render(<BrowserRouter><Login /></BrowserRouter>)
        const passwordInput = screen.getByLabelText("Password")
        expect(passwordInput).toBeInTheDocument()
    })
    it('should have register button', ()=>{
        render(<BrowserRouter><Login /></BrowserRouter>)
        const registerButton = screen.getByText("Register")
        expect(registerButton).toBeInTheDocument()
    })
    it('should have register button', ()=>{
        render(<BrowserRouter><Login /></BrowserRouter>)
        const loginButton = screen.getByText("Login")
        expect(loginButton).toBeInTheDocument()
    })
    it('should test login button click', ()=>{
        render(<BrowserRouter><Login /></BrowserRouter>)
        const signInButton = screen.getByText("Sign In")
        expect(signInButton).toBeInTheDocument()
        fireEvent.click(signInButton)
    })
    it('should test register button click', async ()=>{
        render(<BrowserRouter><Login /></BrowserRouter>)
        const registerButton = screen.getByText("Register")
        expect(registerButton).toBeInTheDocument()
        fireEvent.click(registerButton)
    });

    it('should test the labels',()=>{
        const wrapper = mount(<BrowserRouter><Login /></BrowserRouter>)
        const form = wrapper.find('form')
        const label = form.find('label')
        expect(label.length).toEqual(2)
        const labelEmail = label.at(0)
        expect(labelEmail.text()).toEqual('Email address');
        const labelPassword = label.at(1)
        expect(labelPassword.text()).toEqual('Password');
    })

    it('should test the email input field', ()=>{
        const wrapper = mount(<BrowserRouter><Login /></BrowserRouter>)
        const form = wrapper.find('form')
        const input = form.find('input')
        expect(input.length).toEqual(3)

        let emailInput = input.at(1)
        expect(emailInput.prop('type')).toEqual('email');
        expect(emailInput.prop('name')).toEqual('email');
        expect(emailInput.prop('id')).toEqual('email-address');

        const button = form.find('button').at(0)
        expect(button.prop('type')).toEqual('submit');
        emailInput.simulate('change', {
            target: {
                name: "email",
                value: "sanjay123@gmail.com"
            }
        })
        emailInput = wrapper.find('form').find('input').at(1)
        expect(emailInput.prop('value')).toEqual('sanjay123@gmail.com')
    })

    it('should test the password input field', ()=>{
        const wrapper = mount(<BrowserRouter><Login /></BrowserRouter>)
        const form = wrapper.find('form')
        const input = form.find('input')
        expect(input.length).toEqual(3)

        let passwordInput = input.at(2)
        expect(passwordInput.prop('type')).toEqual('password');
        expect(passwordInput.prop('name')).toEqual('password');
        expect(passwordInput.prop('id')).toEqual('password');

        passwordInput.simulate('change', {
            target: {
                name: "password",
                value: "password123"
            }
        })
        passwordInput = wrapper.find('form').find('input').at(2)
        expect(passwordInput.prop('value')).toEqual('password123')
    })
})
import {fireEvent, render, screen} from '@testing-library/react';
import { BrowserRouter} from "react-router-dom";
import Registration from "../Registration";
import Enzyme, {mount} from "enzyme";
import Login from "../Login";
import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
describe('Testing Registration Component', ()=>{
    it('should render the register component',()=>{
        render(<BrowserRouter><Registration /></BrowserRouter>)
        const registerHeading = screen.getByText("Register")
        expect(registerHeading).toBeInTheDocument()
    })
    it('should have first name input field', ()=>{
        render(<BrowserRouter><Registration /></BrowserRouter>)
        const firstName = screen.getByLabelText("First Name")
        expect(firstName).toBeInTheDocument()
    })
    it('should have last name input field', ()=>{
        render(<BrowserRouter><Registration /></BrowserRouter>)
        const lastName = screen.getByLabelText("Last Name")
        expect(lastName).toBeInTheDocument()
    })
    it('should have email input field', ()=>{
        render(<BrowserRouter><Registration /></BrowserRouter>)
        const email = screen.getByText("Email address")
        expect(email).toBeInTheDocument()
    })
    it('should have password input field', ()=>{
        render(<BrowserRouter><Registration /></BrowserRouter>)
        const password = screen.getByText("Password")
        expect(password).toBeInTheDocument()
    })
    it('should test register button click', ()=>{
        render(<BrowserRouter><Registration /></BrowserRouter>)
        const signUpButton = screen.getByText("Sign Up")
        expect(signUpButton).toBeInTheDocument()
        fireEvent.click(signUpButton)
    })

    it('should test the labels', ()=>{
        const wrapper = mount(<BrowserRouter><Registration /></BrowserRouter>)
        const form = wrapper.find('form')
        const label = form.find('label')
        expect(label.length).toEqual(4)

        const firstName = label.at(0)
        expect(firstName.text()).toEqual('First Name');
        const lastName = label.at(1)
        expect(lastName.text()).toEqual('Last Name');
        const labelEmail = label.at(2)
        expect(labelEmail.text()).toEqual('Email address');
        const labelPassword = label.at(3)
        expect(labelPassword.text()).toEqual('Password');

    })
    it('should test first name input field', ()=>{
        const wrapper = mount(<BrowserRouter><Registration /></BrowserRouter>)
        const form = wrapper.find('form')
        const input = form.find('input')

        expect(input.length).toEqual(5)
        let firstName = input.at(1)
        expect(firstName.prop('type')).toEqual('text');
        expect(firstName.prop('name')).toEqual('firstName');
        expect(firstName.prop('id')).toEqual('first-name');

        const button = form.find('button')
        expect(button.length).toEqual(1)
        expect(button.prop('type')).toEqual('submit');

        firstName.simulate('change', {
            target: {
                name: "firstName",
                value: "Sanjay"
            }
        })
        firstName = wrapper.find('form').find('input').at(1)
        expect(firstName.prop('value')).toEqual('Sanjay')
    })

    it('should test last name input field', ()=>{
        const wrapper = mount(<BrowserRouter><Registration /></BrowserRouter>)
        const form = wrapper.find('form')
        const input = form.find('input')

        expect(input.length).toEqual(5)
        let lastName = input.at(2)
        expect(lastName.prop('type')).toEqual('text');
        expect(lastName.prop('name')).toEqual('lastName');
        expect(lastName.prop('id')).toEqual('last-name');

        lastName.simulate('change', {
            target: {
                name: "firstName",
                value: "Singh"
            }
        })
        lastName = wrapper.find('form').find('input').at(1)
        expect(lastName.prop('value')).toEqual('Singh')
    })

    it('should test the email input field', ()=>{
        const wrapper = mount(<BrowserRouter><Registration /></BrowserRouter>)
        const form = wrapper.find('form')
        const input = form.find('input')

        let emailInput = input.at(3)
        expect(emailInput.prop('type')).toEqual('email');
        expect(emailInput.prop('name')).toEqual('email');
        expect(emailInput.prop('id')).toEqual('email-address');

        emailInput.simulate('change', {
            target: {
                name: "email",
                value: "sanjay123@gmail.com"
            }
        })
        emailInput = wrapper.find('form').find('input').at(3)
        expect(emailInput.prop('value')).toEqual('sanjay123@gmail.com')
    })

    it('should test the password input field', ()=>{
        const wrapper = mount(<BrowserRouter><Registration /></BrowserRouter>)
        const form = wrapper.find('form')
        const input = form.find('input')

        let passwordInput = input.at(4)
        expect(passwordInput.prop('type')).toEqual('password');
        expect(passwordInput.prop('name')).toEqual('password');
        expect(passwordInput.prop('id')).toEqual('password');

        passwordInput.simulate('change', {
            target: {
                name: "password",
                value: "password123"
            }
        })
        passwordInput = wrapper.find('form').find('input').at(4)
        expect(passwordInput.prop('value')).toEqual('password123')
    })
})
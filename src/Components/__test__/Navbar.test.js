import React from "react";
import Navbar from "../Navbar";
import {fireEvent, render, screen} from '@testing-library/react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

describe('Navbar Component Test',()=>{
    it('should render the navbar component',()=>{
        render(<BrowserRouter><Navbar /></BrowserRouter>)
        const dashboardButton = screen.getByText("DASHBOARD")
        expect(dashboardButton).toBeInTheDocument()

        // const navbarImage = screen.getByRole('img')
        // expect(navbarImage).toBeInTheDocument()
    })
})
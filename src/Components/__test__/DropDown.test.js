import React from "react";
import DropDown from "../DropDown";
import Enzyme, {render} from "enzyme";
import {configure, mount, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import * as Constants from "../../constants";
import { BrowserRouter} from "react-router-dom";
import {fireEvent, prettyDOM, screen} from '@testing-library/react';
import {corePlugins as renderer} from "tailwindcss/lib/corePlugins";
import {Menu} from "@headlessui/react";

Enzyme.configure({ adapter: new Adapter() });

describe('DropDown Component Tests',()=>{
    const options = [
        {
            id: 1,
            name: Constants.EVERY_DAY
        },
        {
            id: 2,
            name: Constants.EVERY_WEEK
        },
        {
            id: 3,
            name: Constants.EVERY_OTHER_WEEK
        },
        {
            id: 4,
            name: Constants.EVERY_MONTH
        },
        {
            id: 5,
            name: Constants.EVERY_YEAR
        }
    ]
    it('should render drop down options',()=>{
        render(<DropDown options={options} />)
        const menuButton = screen.queryByTestId(/menu-button/i)
        // expect(menuButton).toBeInTheDocument();
        console.log(menuButton)
        //expect(menuButton).toBeInTheDocument()
        // expect(menuButton.length).toEqual(2)
        screen.debug()
        // console.log(screen)
        // const option = screen.getByText("Every day")
        // expect(option).toBeInTheDocument()
    })
})
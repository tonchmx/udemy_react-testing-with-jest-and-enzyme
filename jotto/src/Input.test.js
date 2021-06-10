import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../test/testUtils'

import Input from './Input'

const setup = (success = false, secretWord = 'party') => {
    return shallow(<Input success={success} secretWord={secretWord} />)
}

describe('render', () => {
    describe('success is true', () => {
        let wrapper 

        beforeEach(() => {
            wrapper = setup(true)
        })

        test('renders without errors', () => {
            const component = findByTestAttr(wrapper, 'component-input')
            expect(component.length).toBe(1)
        })

        test('input box does not show', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box')
            expect(inputBox.exists()).toBe(false)
        })

        test('submit button does not show', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button')
            expect(submitButton.exists()).toBe(false)
        })
    })

    describe('success is false', () => {
        let wrapper 

        beforeEach(() => {
            wrapper = setup(false)
        })

        test('renders without errors', () => {
            const component = findByTestAttr(wrapper, 'component-input')
            expect(component.length).toBe(1)
        })

        test('input box does not show', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box')
            expect(inputBox.exists()).toBe(true)
        })

        test('submit button does not show', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button')
            expect(submitButton.exists()).toBe(true)
        })
    })
})

test('does not throw warning with expected props', () => {
    checkProps(Input, { secretWord: 'party' })
})

describe('state controlled input field', () => {
    let mockSetCurrentGuess = jest.fn()
    let wrapper
    let originalUseState

    beforeEach(() => {
        mockSetCurrentGuess.mockClear()
        originalUseState = React.useState
        React.useState = jest.fn(() => ['', mockSetCurrentGuess])
        wrapper = setup()
    })

    afterAll(() => {
        React.useState = originalUseState
    })

    test('state update with value of input box upon change', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box')

        const mockEvent = { target: { value: 'train' } }
        inputBox.simulate('change', mockEvent)

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
    })

    test('state update with empty string', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box')

        const mockEvent = { target: { value: '' } }
        inputBox.simulate('change', mockEvent)

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
    })

    test('field is clearer upon submit button click', () => {
        const submitButton = findByTestAttr(wrapper, 'submit-button')

        submitButton.simulate('click', { preventDefault() {} })

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
    })
})
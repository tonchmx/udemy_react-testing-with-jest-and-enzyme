import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ success, secretWord }) => {
    const [currentGuess, setCurrentGuess] = React.useState('')
    const handleOnClick = (event) => {
        // TODO: update guessedWords
        // TODO: check against secretWord and update success if needed
        event.preventDefault()
        setCurrentGuess('')
    }

    if (success) {
        return (
            <div data-test="component-input" />
        )
    }

    return (
        <div data-test="component-input">
            <form className="form-inline">
                <input 
                    data-test="input-box"
                    className="mb-2 mx-sm-3"
                    type="text"
                    placeholde="enter guess"
                    value={currentGuess}
                    onChange={(event) => setCurrentGuess(event.target.value)}
                />
                <button
                    data-test="submit-button"
                    onClick={handleOnClick}
                    className="btn btn-primary mb-2"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

Input.propTypes = {
    success: PropTypes.bool,
    secretWord: PropTypes.string.isRequired
}

export default Input
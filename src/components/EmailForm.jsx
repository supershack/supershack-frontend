import { useState } from 'react'
import axios from 'axios'

function EmailForm({ jobId, isEmailSet, onChange }) {

    const [email, setEmail] = useState("")
    const [successMessage, setSuccessMessage] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleEmail = (e) => setEmail(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()

        const requestBody = { email, jobId }

        axios.post("http://localhost:3000/api/users", requestBody)
            .then((response) => {
                if (response.data.message === "created") {
                    onChange(true)
                    setErrorMessage(undefined)
                    setSuccessMessage("Welcome! You have successfully signed up. Please check your email.")
                }
                else {
                    const errorDescription = response.data.message
                    setErrorMessage(errorDescription)
                    setSuccessMessage(undefined)
                }
            })
            .catch((error) => {
                console.log(error)
                const errorDescription = error.response.data.message
                setErrorMessage(errorDescription)
                setSuccessMessage(undefined)
            })
    }

    return (
        <form className="textContainer" onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                className="inputField"
                placeholder="max@muster.de"
                required={true}
                value={email}
                onChange={handleEmail}
            />
            {/* <label
                className="inputLabel"
                htmlFor="email">Email
            </label> */}
            <p className='textSmaller'>Mit der Anmeldung bestätigst du, dass du einverstanden bist, dass wir dich kontaktieren dürfen, sobald wir den Job für dich gefunden haben oder eine passende Alternative.</p>
            <button type="submit" className="buttonDefault submit">
                Abschicken
            </button>
            {successMessage && <p className="textSmall">{successMessage}</p>}
            {errorMessage && <p className="textSmall">{errorMessage}</p>}
        </form>
    )
}

export default EmailForm

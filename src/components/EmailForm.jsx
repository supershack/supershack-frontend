import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function EmailForm({ jobId }) {

    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate()

    const handleEmail = (e) => setEmail(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()

        const requestBody = { email, jobId }

        axios.post("http://localhost:3000/api/users", requestBody)
            .then((response) => {
                console.log(response)
                const errorDescription = response.data.message
                setErrorMessage(errorDescription)
            })
            .catch((error) => {
                console.log(error)
                const errorDescription = error.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <input
                        type="email"
                        name="email"
                        className="inputField"
                        placeholder="Email"
                        required={true}
                        value={email}
                        onChange={handleEmail}
                    />
                    <label
                        className="inputLabel"
                        htmlFor="email">Email
                    </label>
                </div>
                <p>This will sign you up for our Newsletter</p>
                <button type="submit" className="button Signup">
                    Submit
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    )
}

export default EmailForm
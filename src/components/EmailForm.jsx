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
                if (response.data.message == "User created successfully.") {
                    setErrorMessage(undefined)
                    setSuccessMessage("Welcome! You have successfully signed up. Please check your email.")
                    setTimeout(() => {
                        onChange(true)  // This line triggers the parent component's state change
                    }, 2500); // Adjust timing as necessary
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
            <p className='textSmaller' style={{ textAlign: 'justify' }}>
  Mit der Eingabe meiner E-Mail-Adresse und dem Klick auf "Abschicken" erkläre ich mich damit einverstanden, dass die Leapwize GmbH mir regelmäßig Informationen zu Jobvorschlägen und Neuigkeiten per E-Mail zusendet. Weitere Informationen zum Umgang mit meinen Daten finde ich in der{' '}
  <a href="https://www.leapwize.de/datenschutzerklarung" target="_blank" rel="noopener noreferrer">
    Datenschutzerklärung
  </a>.
</p>
            <button type="submit" className="buttonDefault submit">
                Abschicken
            </button>
            {successMessage && <p className="textSmall">{successMessage}</p>}
            {errorMessage && <p className="textSmall">{errorMessage}</p>}
        </form>
    )
}

export default EmailForm
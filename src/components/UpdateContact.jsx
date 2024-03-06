import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const url = "https://boolean-api-server.fly.dev/Vayeros/contact/"

function UpdateContact() {
    const { id } = useParams()
    const [contact, setContact] = useState(null)
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        jobTitle: "",
        street: "",
        city: "",
        favouriteColour: ""
    })

    useEffect(() => {
        fetch(url + id)
            .then(response => response.json())
            .then(data => {
                setContact(data)
                setForm(data)})
    }, [id])

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        e.target.reset()
        fetch(url + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .then(() => navigate(`/contact/${id}`))
    }

    return (
        <div>
            <h1>Update Contact</h1>
            {contact ? (
                <>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">Firstname: </label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} /> <br />
                    <label htmlFor="lastName">Lastname: </label>
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} /> <br />
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} /> <br />
                    <label htmlFor='gender'>Gender: </label>
                    <input type="text" name='gender' value={form.gender} onChange={handleChange} /> <br />
                    <label htmlFor='jobTitle'>Job Title: </label>
                    <input type='text' name='jobTitle' value={form.jobTitle} onChange={handleChange} /> <br />
                    <label htmlFor="street">Street: </label>
                    <input type="text" name="street" value={form.street} onChange={handleChange} /> <br />
                    <label htmlFor="city">City: </label>
                    <input type="text" name="city" value={form.city} onChange={handleChange} /> <br />
                    <label htmlFor='favouriteColour'>Favourite Colour: </label>
                    <input type='color' name='favouriteColour' value={form.favouriteColour} onChange={handleChange} /> <br />
                    <button type="submit">Update</button>
                </form>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default UpdateContact
import React, { useState, useEffect } from 'react';
import loginService from '../../services/loginService';
import { Link } from "react-router-dom";
import { Navbar, Nav, NavLink } from 'react-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import '../../css/App.css';

function Navigationbar() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [error, setError] = useState("");
    const [notification, setNotification] = useState("");


    const refreshPage = () => {
        window.location.reload(false);
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user);
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            setUser(user)
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')

            refreshPage();

        } catch (error) {
            console.log(error.response.data.error)
            setError(error.response.data.error)
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.register({
                username, password,
            })
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
            setNotification("Rekisteröityminen onnistui")
            setTimeout(() => {
                setNotification(null)
            }, 3000)

        } catch (error) {
            console.log(error.response.data.error)
            setError(error.response.data.error)
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    }


    if (user === null) {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="navibar">
                <Navbar.Toggle aria-controls="navBarScroll" data-bs-target="#navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav>
                        <NavLink eventKey="1" as={Link} to="/">Etusivu</NavLink>
                        <NavLink eventKey="2" as={Link} to="/emissionSources">Päästölähteet</NavLink>
                        <NavLink eventKey="3" as={Link} to="/temperature">Lämpötilatiedot ja co2 pitoisuudet</NavLink>
                        <NavDropdown
                            id="nav-dropdown"
                            title="Kirjaudu"
                            menuVariant="light"
                        >
                            <div className='navbarForm'>
                                <Form onSubmit={handleLogin}>
                                    <h5 id="form-header">Kirjaudu</h5>
                                    {error
                                        ? <div className="error">{error}</div>
                                        : null
                                    }
                                    <Form.Group>
                                        <Form.Label id="form-label">Käyttäjätunnus</Form.Label>
                                        <Form.Control id="form-control" onChange={({ target }) => setUsername(target.value)} type="username" placeholder='käyttäjätunnus' />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label id="form-label">Salasana</Form.Label>
                                        <Form.Control id="form-control" onChange={({ target }) => setPassword(target.value)} type="password" placeholder='salasana' />
                                    </Form.Group>
                                    <div className='buttonDiv'>
                                        <Button type='submit' id="form-button">
                                            Kirjaudu sisään
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </NavDropdown>
                        <NavDropdown
                            id="nav-dropdown"
                            title="Rekisteröidy"
                            menuVariant="light"
                        >
                            <div className='navbarForm'>
                                <Form onSubmit={handleRegister} id="form">
                                    <h5 id="form-header">Rekisteröidy</h5>
                                    {error
                                        ? <div className="error">{error}</div>
                                        : null
                                    }
                                    {notification
                                        ? <div className="notification">{notification}</div>
                                        : null
                                    }
                                    <Form.Group>
                                        <Form.Label id="form-label">Käyttäjätunnus</Form.Label>
                                        <Form.Control id="form-control" onChange={({ target }) => setUsername(target.value)} type="username" placeholder='käyttäjätunnus' />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label id="form-label">Salasana</Form.Label>
                                        <Form.Control id="form-control" onChange={({ target }) => setPassword(target.value)} type="password" placeholder='salasana' />
                                    </Form.Group>
                                    <div className='buttonDiv'>
                                        <Button type='submit' id="form-button" data-testid="registerbutton">
                                            Luo uusi tili
                                        </Button>
                                    </div>

                                </Form>
                            </div>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    } else {
        return (
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="navBarScroll" data-bs-target="#navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav>
                        <NavLink eventKey="1" as={Link} to="/">Etusivu</NavLink>
                        <NavLink eventKey="2" as={Link} to="/emissionSources">Päästölähteet</NavLink>
                        <NavLink eventKey="3" as={Link} to="/temperature">Lämpötilatiedot ja co2 pitoisuudet</NavLink>
                        <NavLink eventKey="4" as={Link} to="/profile">Profiili</NavLink>
                        <Button onClick={() => { window.localStorage.removeItem('loggedUser'); setUser(null); refreshPage() }}>Kirjaudu ulos</Button>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )

    }
}
export default Navigationbar;
import React, { useState, useEffect } from 'react'
import { Container, Form, Alert, Spinner } from 'react-bootstrap'
import NavigationBar from './components/NavigationBar'

function App () {
  const [isEnabled, setIsEnabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRemoteAdminStatus()
  }, [])

  const fetchRemoteAdminStatus = async () => {
    try {
      setLoading(true)
      setError(null)
      // TODO: Replace with actual API endpoint when backend is implemented
      // const response = await fetch('/api/remote-admin/status')
      // if (!response.ok) {
      //   throw new Error('Failed to fetch remote admin status')
      // }
      // const data = await response.json()
      // setIsEnabled(data.enabled)
      
      // Placeholder: Set default to false until API is implemented
      setIsEnabled(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (event) => {
    const newValue = event.target.checked
    setIsEnabled(newValue)

    try {
      setError(null)
      // TODO: Replace with actual API endpoint when backend is implemented
      // const response = await fetch('/api/remote-admin/toggle', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ enabled: newValue })
      // })
      // if (!response.ok) {
      //   throw new Error('Failed to update remote admin status')
      // }
    } catch (err) {
      setError(err.message)
      // Revert the toggle on error
      setIsEnabled(!newValue)
    }
  }

  return (
    <div className='App'>
      <NavigationBar />
      <Container className="mt-4">
      <h1 className="mb-4">Remote Administration</h1>
      
      <p className="mb-4">
        If you have purchased the remote adminstration package, the switch below should be turnd on, to enable remote administration.
      </p>

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Form>
          <Form.Check
            type="switch"
            id="remote-admin-switch"
            label="Enable Remote Administration"
            checked={isEnabled}
            onChange={handleToggle}
            style={{ fontSize: '1.2rem' }}
          />
        </Form>
      )}
      </Container>
    </div>
  )
}

export default App


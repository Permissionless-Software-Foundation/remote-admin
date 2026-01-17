import React, { useState, useEffect, useMemo } from 'react'
import { Container, Form, Alert, Spinner } from 'react-bootstrap'
import NavigationBar from './components/NavigationBar'
import ConfigAPI from './services/config-api'

function App () {
  const [isEnabled, setIsEnabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize config API service once
  // Use absolute URL for development, relative for production
  const configAPI = useMemo(() => {
    return new ConfigAPI(
      import.meta.env.DEV
        ? 'http://localhost:3633/api/config'
        : '/api/config'
    )
  }, [])

  useEffect(() => {
    fetchRemoteAdminStatus()
  }, [])

  const fetchRemoteAdminStatus = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await configAPI.getConfig('remote-admin')
      
      // Check if data is null (404), empty object, or has empty/missing value
      let isEmpty = false
      if (data === null) {
        isEmpty = true
      } else if (typeof data === 'object' && Object.keys(data).length === 0) {
        isEmpty = true
      } else if (!data.value) {
        isEmpty = true
      } else if (typeof data.value === 'object' && Object.keys(data.value).length === 0) {
        isEmpty = true
      }
      
      if (isEmpty) {
        // Set enabled to false and save the config
        setIsEnabled(false)
        await configAPI.saveConfig('remote-admin', { enabled: false })
      } else {
        // Extract enabled value from config.value object
        setIsEnabled(data.value?.enabled || false)
      }
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
      await configAPI.saveConfig('remote-admin', { enabled: newValue })
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


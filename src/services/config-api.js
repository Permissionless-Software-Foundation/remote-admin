/*
  Service library for interacting with the config API.
*/

class ConfigAPI {
  constructor (baseURL = '/api/config') {
    this.baseURL = baseURL
  }

  /**
   * Get a configuration setting by key
   * @param {string} key - Configuration key
   * @returns {Promise<Object|null>} Configuration object with { key, value } or null if not found
   * @throws {Error} If the request fails (except 404)
   */
  async getConfig (key) {
    try {
      const url = `${this.baseURL}/${key}`
      const response = await fetch(url)

      if (response.status === 404) {
        // Config doesn't exist yet, return null
        return null
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (err) {
      // Re-throw network errors and non-404 HTTP errors
      throw err
    }
  }

  /**
   * Save a configuration setting
   * @param {string} key - Configuration key
   * @param {Object} value - Configuration value (must be an object)
   * @returns {Promise<Object>} Saved configuration object with { key, value }
   * @throws {Error} If the request fails
   */
  async saveConfig (key, value) {
    try {
      const url = `${this.baseURL}/${key}`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Failed to save config: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (err) {
      // Re-throw network errors and HTTP errors
      throw err
    }
  }
}

export default ConfigAPI

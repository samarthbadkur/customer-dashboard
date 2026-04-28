import React, { useEffect, useState } from 'react'

const API_BASE = 'http://localhost:5000'

export default function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/customers`)
      const data = await res.json()
      setCustomers(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = { name, email, phone }
    const res = await fetch(`${API_BASE}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      setName('')
      setEmail('')
      setPhone('')
      fetchCustomers()
    } else {
      const err = await res.json()
      alert(err.error || 'Failed to add')
    }
  }

  async function handleDelete(id) {
    const res = await fetch(`${API_BASE}/customers/${id}`, { method: 'DELETE' })
    if (res.status === 204) {
      fetchCustomers()
    } else {
      alert('Failed to delete')
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '24px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Customer Dashboard</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block' }}>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block' }}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block' }}>Phone Number</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>

      <h2>Customers</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="4">No customers</td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    <button onClick={() => handleDelete(c.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

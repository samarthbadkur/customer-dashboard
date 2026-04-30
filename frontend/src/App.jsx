import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.PROD
  ? ''
  : (import.meta.env.VITE_API_BASE || 'http://localhost:5000')

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
    <main className="app-shell">
      <section className="app-header">
        <h1>Customer Dashboard</h1>
        <p>Manage customer records quickly and keep your list always up to date.</p>
      </section>

      <section className="card">
        <h2>Add Customer</h2>
        <form onSubmit={handleSubmit} className="customer-form">
          <div className="field-grid">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Add Customer</button>
          </div>
        </form>
      </section>

      <section className="card">
        <div className="list-header">
          <h2>Customers</h2>
          <span className="count-pill">{customers.length}</span>
        </div>

        {loading ? (
          <div className="state-message">Loading customers...</div>
        ) : customers.length === 0 ? (
          <div className="state-message">No customers added yet.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDelete(c.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

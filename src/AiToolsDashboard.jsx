import { useState, useEffect } from 'react'

function AiToolsDashboard() {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('/tools_db.json')
      .then(res => res.json())
      .then(data => {
        setTools(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading tools:', err)
        setLoading(false)
      })
  }, [])

  const filteredTools = filter === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === filter)

  const categories = ['all', ...new Set(tools.map(t => t.category))]

  if (loading) {
    return <div className="loading">Loading AI tools...</div>
  }

  return (
    <div className="dashboard">
      <header>
        <h1>AI Tools Discovery Dashboard</h1>
        <p>Daily updated AI tools from across the web</p>
      </header>
      
      <div className="filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={filter === cat ? 'active' : ''}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="tools-grid">
        {filteredTools.map(tool => (
          <div key={tool.id} className="tool-card">
            <h3>{tool.name}</h3>
            <p className="category">{tool.category}</p>
            <p className="description">{tool.description}</p>
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              Visit Tool
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AiToolsDashboard

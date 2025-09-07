import { useEffect, useState } from "react";
import axios from "axios";
import type { CSSProperties } from 'react';

interface Post {
  id: number;
  userId: number;
  title: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ userId: 1, title: "" });

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then(res => setPosts(res.data));
  }, []);

  const addPost = async () => {
    const res = await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
    setPosts([...posts, { ...res.data, id: posts.length + 1 }]);
    setNewPost({ userId: 1, title: "" });
  };

  const updatePost = async (id: number) => {
    const updated = { ...posts.find(p => p.id === id), title: "Updated Title" };
    await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updated);
    setPosts(posts.map(p => (p.id === id ? (updated as Post) : p)));
  };

  const deletePost = async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    setPosts(posts.filter(p => p.id !== id));
  };
  
  // Stil nesneleri
  const styles = {
    container: {
      padding: '1.5rem',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'sans-serif',
    } as CSSProperties,
    title: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '1rem',
    } as CSSProperties,
    form: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1.5rem',
    } as CSSProperties,
    input: {
      border: '1px solid #d1d5db',
      padding: '0.5rem',
      borderRadius: '0.25rem',
    } as CSSProperties,
    titleInput: {
      width: '50%',
    } as CSSProperties,
    userIdInput: {
      width: '25%',
    } as CSSProperties,
    addButton: {
      backgroundColor: '#22c55e',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    } as CSSProperties,
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    } as CSSProperties,
    tableHeaderRow: {
      backgroundColor: '#e5e7eb',
    } as CSSProperties,
    tableCell: {
      border: '1px solid #d1d5db',
      padding: '0.5rem',
      textAlign: 'left',
    } as CSSProperties,
    tableHeaderCell: {
      textAlign: 'center',
    } as CSSProperties,
    tableRow: {
      textAlign: 'center',
    } as CSSProperties,
    actionCell: {
      whiteSpace: 'nowrap',
    } as CSSProperties,
    updateButton: {
      backgroundColor: '#eab308',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '0.25rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginRight: '0.5rem',
    } as CSSProperties,
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '0.25rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    } as CSSProperties,
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Post List</h2>

      {/* Yeni Post Formu */}
      <div style={styles.form}>
        <input
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          style={{ ...styles.input, ...styles.titleInput }}
        />
        <input
          type="number"
          placeholder="User ID"
          value={newPost.userId}
          onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          style={{ ...styles.input, ...styles.userIdInput }}
        />
        <button 
          onClick={addPost} 
          style={styles.addButton}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
        >
          Add
        </button>
      </div>

      {/* Post Tablosu */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={{ ...styles.tableCell, ...styles.tableHeaderCell }}>ID</th>
            <th style={{ ...styles.tableCell, ...styles.tableHeaderCell }}>User ID</th>
            <th style={{ ...styles.tableCell, ...styles.tableHeaderCell }}>Title</th>
            <th style={{ ...styles.tableCell, ...styles.tableHeaderCell }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id} style={styles.tableRow}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <td style={styles.tableCell}>{p.id}</td>
              <td style={styles.tableCell}>{p.userId}</td>
              <td style={styles.tableCell}>{p.title}</td>
              <td style={{ ...styles.tableCell, ...styles.actionCell }}>
                <button 
                  onClick={() => updatePost(p.id)} 
                  style={styles.updateButton}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ca8a04'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#eab308'}
                >
                  Update
                </button>
                <button 
                  onClick={() => deletePost(p.id)} 
                  style={styles.deleteButton}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
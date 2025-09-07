import { useEffect, useState } from "react";
import axios from "axios";
import type { CSSProperties } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", username: "", email: "" });

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => setUsers(res.data));
  }, []);

  const addUser = async () => {
    const res = await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
    setUsers([...users, { ...res.data, id: users.length + 1 }]);
    setNewUser({ name: "", username: "", email: "" });
  };

  const updateUser = async (id: number) => {
    const updated = { ...users.find(u => u.id === id), name: "Updated Name" };
    await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updated);
    setUsers(users.map(u => (u.id === id ? (updated as User) : u)));
  };

  const deleteUser = async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    setUsers(users.filter(u => u.id !== id));
  };

  // Stil nesneleri tanımlanıyor
  const styles = {
    container: {
      padding: '1.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'sans-serif',
    } as CSSProperties,
    title: {
      fontSize: '1.5rem', // 2xl
      fontWeight: 600,    // semibold
      marginBottom: '1rem', // mb-4
    } as CSSProperties,
    form: {
      display: 'flex',
      gap: '0.5rem', // gap-2
      marginBottom: '1.5rem', // mb-6
    } as CSSProperties,
    input: {
      border: '1px solid #d1d5db', // border
      padding: '0.5rem', // p-2
      borderRadius: '0.25rem', // rounded
      width: '25%', // w-1/4
    } as CSSProperties,
    addButton: {
      backgroundColor: '#3b82f6', // blue-500
      color: 'white',
      padding: '0.5rem 1rem', // px-4 py-2
      borderRadius: '0.25rem', // rounded
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    } as CSSProperties,
    table: {
      width: '100%',
      borderCollapse: 'collapse', // border-collapse
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // shadow
    } as CSSProperties,
    tableHeaderRow: {
      backgroundColor: '#e5e7eb', // bg-gray-200
    } as CSSProperties,
    tableCell: {
      border: '1px solid #d1d5db',
      padding: '0.5rem', // p-2
      textAlign: 'left',
    } as CSSProperties,
    tableHeaderCell: {
      textAlign: 'center',
    } as CSSProperties,
    tableRow: {
      textAlign: 'center', // text-center
    } as CSSProperties,
    actionCell: {
      whiteSpace: 'nowrap',
    } as CSSProperties,
    updateButton: {
      backgroundColor: '#eab308', // yellow-500
      color: 'white',
      padding: '0.25rem 0.75rem', // px-3 py-1
      borderRadius: '0.25rem', // rounded
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginRight: '0.5rem', // space-x-2
    } as CSSProperties,
    deleteButton: {
      backgroundColor: '#ef4444', // red-500
      color: 'white',
      padding: '0.25rem 0.75rem', // px-3 py-1
      borderRadius: '0.25rem', // rounded
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    } as CSSProperties,
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User List</h2>

      {/* Yeni Kullanıcı Formu */}
      <div style={styles.form}>
        <input
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          style={styles.input}
        />
        <input
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          style={styles.input}
        />
        <input
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          style={styles.input}
        />
        <button 
          onClick={addUser} 
          style={styles.addButton}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'} // hover:bg-blue-600
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'} // bg-blue-500
        >
          Add
        </button>
      </div>

      {/* Kullanıcı Tablosu */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={{ ...styles.tableCell, ...styles.tableHeaderCell }}>ID</th>
            <th style={{ ...styles.tableCell, ...styles.tableHeaderCell }}>Name</th>
            <th style={{ ...styles.tableCell, ...styles.tableHeaderCell }}>Username</th>
            <th style={{ ...styles.tableCell, ...styles.tableHeaderCell }}>Email</th>
            <th style={{ ...styles.tableCell, ...styles.tableHeaderCell }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={styles.tableRow}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'} // hover:bg-gray-50
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <td style={styles.tableCell}>{u.id}</td>
              <td style={styles.tableCell}>{u.name}</td>
              <td style={styles.tableCell}>{u.username}</td>
              <td style={styles.tableCell}>{u.email}</td>
              <td style={{ ...styles.tableCell, ...styles.actionCell }}>
                <button 
                  onClick={() => updateUser(u.id)} 
                  style={styles.updateButton}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ca8a04'} // hover:bg-yellow-600
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#eab308'} // bg-yellow-500
                >
                  Update
                </button>
                <button 
                  onClick={() => deleteUser(u.id)} 
                  style={styles.deleteButton}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'} // hover:bg-red-600
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'} // bg-red-500
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
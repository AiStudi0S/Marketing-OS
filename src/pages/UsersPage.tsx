import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import type { Role } from '../contexts/AuthContext';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';

interface UserEntry {
  id: string;
  username: string;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'inactive';
}

const initialUsers: UserEntry[] = [
  { id: '1', username: 'admin', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active' },
  { id: '2', username: 'dev', name: 'Dev User', email: 'dev@example.com', role: 'developer', status: 'active' },
  { id: '3', username: 'user', name: 'Regular User', email: 'user@example.com', role: 'user', status: 'active' },
  { id: '4', username: 'auditor', name: 'Audit User', email: 'auditor@example.com', role: 'auditor', status: 'active' },
];

const roleColor: Record<string, string> = {
  admin: '#00f5ff',
  developer: '#bf00ff',
  user: '#00ff88',
  auditor: '#fbbf24',
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserEntry[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserEntry | null>(null);
  const [form, setForm] = useState({ username: '', name: '', email: '', role: 'user' as Role });

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => setForm({ username: '', name: '', email: '', role: 'user' });

  const handleAdd = () => {
    setUsers(prev => [...prev, { ...form, id: Date.now().toString(), status: 'active' }]);
    resetForm();
    setAddOpen(false);
  };

  const handleEdit = () => {
    if (!editUser) return;
    setUsers(prev => prev.map(u => u.id === editUser.id ? { ...editUser, ...form } : u));
    setEditUser(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const openEdit = (u: UserEntry) => {
    setEditUser(u);
    setForm({ username: u.username, name: u.name, email: u.email, role: u.role });
  };

  const UserForm = ({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) => (
    <div className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label style={{ color: '#94a3b8' }}>Username</Label>
        <Input value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
          placeholder="username" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(0,245,255,0.2)', color: '#e2e8f0' }} />
      </div>
      <div className="space-y-2">
        <Label style={{ color: '#94a3b8' }}>Full Name</Label>
        <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="Full Name" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(0,245,255,0.2)', color: '#e2e8f0' }} />
      </div>
      <div className="space-y-2">
        <Label style={{ color: '#94a3b8' }}>Email</Label>
        <Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="email@example.com" type="email" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(0,245,255,0.2)', color: '#e2e8f0' }} />
      </div>
      <div className="space-y-2">
        <Label style={{ color: '#94a3b8' }}>Role</Label>
        <Select value={form.role} onValueChange={v => setForm(f => ({ ...f, role: v as Role }))}>
          <SelectTrigger style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(0,245,255,0.2)', color: '#e2e8f0' }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent style={{ backgroundColor: '#0f0f2a', borderColor: 'rgba(0,245,255,0.2)' }}>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="auditor">Auditor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={onSave} style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)', color: '#0a0a1a' }}>Save</Button>
        <Button variant="outline" onClick={onCancel} style={{ borderColor: 'rgba(0,245,255,0.2)', color: '#94a3b8' }}>Cancel</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gradient-cyan">Users</h1>
          <p style={{ color: '#94a3b8' }}>Manage platform users and their roles</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setAddOpen(true); }}
              style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)', color: '#0a0a1a' }}>
              <Plus size={16} /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)', color: '#e2e8f0' }}>
            <DialogHeader>
              <DialogTitle style={{ color: '#00f5ff' }}>Add New User</DialogTitle>
            </DialogHeader>
            <UserForm onSave={handleAdd} onCancel={() => setAddOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Search size={16} style={{ color: '#94a3b8' }} />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search users..."
              className="max-w-sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(0,245,255,0.2)', color: '#e2e8f0' }} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: 'rgba(0,245,255,0.1)' }}>
                <TableHead style={{ color: '#94a3b8' }}>User</TableHead>
                <TableHead style={{ color: '#94a3b8' }}>Username</TableHead>
                <TableHead style={{ color: '#94a3b8' }}>Role</TableHead>
                <TableHead style={{ color: '#94a3b8' }}>Status</TableHead>
                <TableHead style={{ color: '#94a3b8' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(u => (
                <TableRow key={u.id} style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <TableCell style={{ color: '#e2e8f0' }}>
                    <div className="font-medium">{u.name}</div>
                    <div className="text-xs" style={{ color: '#94a3b8' }}>{u.email}</div>
                  </TableCell>
                  <TableCell className="font-mono text-sm" style={{ color: '#94a3b8' }}>{u.username}</TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-0.5 rounded font-semibold uppercase"
                      style={{ background: `${roleColor[u.role]}15`, color: roleColor[u.role], border: `1px solid ${roleColor[u.role]}30` }}>
                      {u.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-0.5 rounded"
                      style={{ background: 'rgba(0,255,136,0.1)', color: '#00ff88' }}>
                      {u.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog open={editUser?.id === u.id} onOpenChange={open => !open && setEditUser(null)}>
                        <DialogTrigger asChild>
                          <button onClick={() => openEdit(u)} className="p-1 rounded hover:bg-white/5 transition-colors" title="Edit">
                            <Pencil size={14} style={{ color: '#00f5ff' }} />
                          </button>
                        </DialogTrigger>
                        <DialogContent style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)', color: '#e2e8f0' }}>
                          <DialogHeader>
                            <DialogTitle style={{ color: '#00f5ff' }}>Edit User</DialogTitle>
                          </DialogHeader>
                          <UserForm onSave={handleEdit} onCancel={() => setEditUser(null)} />
                        </DialogContent>
                      </Dialog>
                      <button onClick={() => handleDelete(u.id)} className="p-1 rounded hover:bg-red-400/10 transition-colors" title="Delete">
                        <Trash2 size={14} style={{ color: '#ef4444' }} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-3 text-xs" style={{ color: '#94a3b8' }}>
            Showing {filtered.length} of {users.length} users
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

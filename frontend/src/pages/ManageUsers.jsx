import { useGetUsersQuery, useDeleteUserMutation } from '../store/api/usersApi'
import { UserCog, Trash2, Stethoscope, ClipboardList, Search } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ManageUsers = () => {
  const [tab, setTab] = useState('doctor')
  const { data, isLoading } = useGetUsersQuery(tab)
  const [deleteUser] = useDeleteUserMutation()
  const [search, setSearch] = useState('')

  const users = (data?.data || data || []).filter(u => u.name?.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return
    try { await deleteUser(id).unwrap(); toast.success('User deleted!') } catch { toast.error('Failed') }
  }

  const tabs = [
    { key: 'doctor', label: 'Doctors', icon: Stethoscope },
    { key: 'receptionist', label: 'Receptionists', icon: ClipboardList },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
          <UserCog className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">Manage Users</h1>
          <p className="text-sm text-slate-500">Manage doctors and receptionists</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === t.key ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input className="input-field pl-10 py-2.5 text-sm" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-slate-400">Loading...</div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 text-center py-20">
          <UserCog className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500">No {tab}s found</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {users.map(u => (
            <div key={u._id} className="bg-white rounded-xl p-5 border border-slate-100 flex items-center justify-between hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                  {u.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{u.name}</h3>
                  <p className="text-slate-400 text-sm">{u.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 capitalize">{u.role}</span>
                <button onClick={() => handleDelete(u._id, u.name)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageUsers

import { useState } from 'react'
import { useGetUsersQuery, useDeleteUserMutation } from '../store/api/usersApi'
import { UserPlus, Search, Trash2, Shield, Stethoscope, ClipboardList, Users } from 'lucide-react'
import toast from 'react-hot-toast'

const ManageUsers = () => {
  const [roleFilter, setRoleFilter] = useState('')
  const [search, setSearch] = useState('')
  const { data, isLoading } = useGetUsersQuery(roleFilter || undefined)
  const [deleteUser] = useDeleteUserMutation()

  const users = (data?.data || data || []).filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"?`)) return
    try { await deleteUser(id).unwrap(); toast.success('Deleted!') } catch { toast.error('Failed') }
  }

  const roleIcons = {
    admin: <Shield size={14} className="text-amber-600" />,
    doctor: <Stethoscope size={14} className="text-blue-600" />,
    receptionist: <ClipboardList size={14} className="text-emerald-600" />,
  }

  const roleColors = {
    admin: 'bg-amber-50 text-amber-700 border-amber-200',
    doctor: 'bg-blue-50 text-blue-700 border-blue-200',
    receptionist: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  }

  const filters = [
    { key: '', label: 'All Users' },
    { key: 'admin', label: 'Admins' },
    { key: 'doctor', label: 'Doctors' },
    { key: 'receptionist', label: 'Receptionists' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Manage Users</h1>
          <p className="text-xs sm:text-sm text-slate-500">{users.length} users found</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
        <div className="relative flex-1 max-w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input className="input-field pl-10 py-2.5 text-sm" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1.5 overflow-x-auto scroll-x-mobile pb-1">
          {filters.map(f => (
            <button key={f.key} onClick={() => setRoleFilter(f.key)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                roleFilter === f.key ? 'bg-amber-500 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              }`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-16 sm:py-20 text-slate-400">Loading...</div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 text-center py-16 sm:py-20 px-4">
          <Users className="w-14 h-14 sm:w-16 sm:h-16 text-slate-200 mx-auto mb-3 sm:mb-4" />
          <p className="text-slate-500 text-sm sm:text-base">No users found</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-slate-500 uppercase">User</th>
                    <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-slate-500 uppercase">Email</th>
                    <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-slate-500 uppercase">Role</th>
                    <th className="text-right px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-slate-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {u.name?.[0]?.toUpperCase()}
                          </div>
                          <span className="font-medium text-slate-800 text-sm">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-slate-500">{u.email}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${roleColors[u.role] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                          {roleIcons[u.role]} {u.role}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-right">
                        <button onClick={() => handleDelete(u._id, u.name)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {users.map(u => (
              <div key={u._id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {u.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-800 text-sm truncate">{u.name}</h3>
                      <p className="text-xs text-slate-400 truncate">{u.email}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(u._id, u.name)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all active:scale-95 shrink-0 ml-2">
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-50">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border capitalize ${roleColors[u.role] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                    {roleIcons[u.role]} {u.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ManageUsers
import { Access } from 'payload'

const adminPerms: Access = ({ req: { user }, id }) => {
  if (user?.role && user?.role === 'admin') {
    return true
  }
  return user?.id === id
}

const fieldAdmin: Access = ({ req: { user }, id }) => {
  if (user?.role && user?.role === 'admin') {
    return true
  }
  return user?.id === id
}

const userPerms: Access = ({ req: { user }, id }) => {
  if (user?.role && ['admin', 'user'].includes(user?.role)) {
    return true
  }
  return user?.id === id
}

const viewerPerms: Access = ({ req: { user }, id }) => {
  if (user?.role && ['admin', 'user', 'viewer'].includes(user?.role)) {
    return true
  }
  return user?.id === id
}

export { adminPerms, userPerms, viewerPerms, fieldAdmin }

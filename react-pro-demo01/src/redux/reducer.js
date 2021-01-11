const defaultNotices = {
  isAllRead: false,
  count: 8
}
const notices = (state = defaultNotices, action) => {
  switch (action.type) {
    case 'READ_ALL':
      return { state, isAllRead: true }
    default:
      return state
  }
}
export default notices
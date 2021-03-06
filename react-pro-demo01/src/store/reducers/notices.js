const defaultVal = {
  isAllRead: false,
  count: 8
}
const notices = (state = defaultVal, action) => {
  switch (action.type) {
    case 'READ_ALL':
      return { ...state, isAllRead: true }

    default:
      return state
  }
}

export default notices
export function navigate(to) {
  return {
    type: 'NAVIGATE',
    route: to
  }
}
export default function handleRemoveScrollY() {
  const pageY = localStorage.getItem('pageY')
  if (pageY) localStorage.removeItem('pageY')
}
export default function handleRemoveScrollY() {
  if(typeof window !== 'undefined' && localStorage) {
    const pageY = localStorage.getItem('pageY')
    if (pageY) localStorage.removeItem('pageY')
  }
}
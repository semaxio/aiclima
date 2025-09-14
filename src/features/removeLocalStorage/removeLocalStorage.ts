export default function removeLocalStorage() {
  if(typeof window !== 'undefined' && localStorage) {
    localStorage.removeItem('pageNumber')
    localStorage.removeItem('category')
    localStorage.removeItem('pageY')
  }
}
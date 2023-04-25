export default function Divider({ num, extraClass }) {
  return <div className={ `mb-${ num } mt-${ num } ${ extraClass }` }></div>
}
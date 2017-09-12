import Status from '../modules/status'

const NotFound = () => (
  <Status code={404}>
    <div>
      <p>Sorry, can't find that.</p>
    </div>
  </Status>
)

export default NotFound

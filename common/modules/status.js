import {
  Route
} from 'react-router'

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
      if (staticContext) {
        statucContext.status = code
      }
      return children
    }} />
)

export default Status

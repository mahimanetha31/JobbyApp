import './index.css'

const NoJobsView = () => (
  <div className="no-jobs-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      alt="no jobs"
      className="no-jobs-image"
    />
    <h1 className="no-jobs-heading">No Jobs Found</h1>
    <p className="no-jobs-description">
      We could not find any jobs. Try other filters.
    </p>
  </div>
)

export default NoJobsView

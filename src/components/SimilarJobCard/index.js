import {BsFillStarFill} from 'react-icons/bs'
import {FaBriefcase, FaMapMarkerAlt} from 'react-icons/fa'
import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = jobDetails

  return (
    <li className="similar-job-card">
      <div className="similar-job-header">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-logo"
        />
        <div className="similar-job-title-rating">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-job-rating">
            <BsFillStarFill className="star-icon" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h2 className="description-heading">Description</h2>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-job-info">
        <p>
          <FaMapMarkerAlt className="icon" /> {location}
        </p>
        <p>
          <FaBriefcase className="icon" /> {employmentType}
        </p>
      </div>
    </li>
  )
}

export default SimilarJobCard

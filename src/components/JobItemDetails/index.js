import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsStar, BsBriefcase, BsGeoAlt} from 'react-icons/bs'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import FailureView from '../FailureView'
import LoaderView from '../LoaderView'

import './index.css'

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.INITIAL,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.IN_PROGRESS})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedJobDetails = this.formatJobDetails(fetchedData.job_details)
      const updatedSimilarJobs = fetchedData.similar_jobs.map(job =>
        this.formatSimilarJob(job),
      )
      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.SUCCESS,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.FAILURE})
    }
  }

  formatJobDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    skills: data.skills,
    lifeAtCompany: data.life_at_company,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  formatSimilarJob = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
    title: job.title,
  })

  renderSkills = skills => (
    <ul className="skills-list">
      {skills.map(skill => (
        <li key={skill.name} className="skill-item">
          <img src={skill.image_url} alt={skill.name} className="skill-icon" />
          <p className="skill-name">{skill.name}</p>
        </li>
      ))}
    </ul>
  )

  renderLifeAtCompany = lifeAtCompany => (
    <div className="life-at-company-section">
      <p className="life-description">{lifeAtCompany.description}</p>
      <img
        src={lifeAtCompany.image_url}
        alt="life at company"
        className="life-image"
      />
    </div>
  )

  renderJobDetailsView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <>
        <Header />
        <div className="job-details-container">
          <div className="job-card">
            <div className="job-header">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="job-logo"
              />
              <div>
                <h1 className="job-title">{title}</h1>
                <div className="rating">
                  <BsStar className="icon star-icon" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>

            <div className="job-info">
              <div className="location-employment">
                <div className="info-item">
                  <BsGeoAlt className="icon" />
                  <p>{location}</p>
                </div>
                <div className="info-item">
                  <BsBriefcase className="icon" />
                  <p>{employmentType}</p>
                </div>
              </div>
              <p className="salary">{packagePerAnnum}</p>
            </div>

            <hr />

            <div className="description-section">
              <div className="desc-heading">
                <h2>Description</h2>
                <a
                  href={companyWebsiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="company-link"
                >
                  Visit
                </a>
                <img
                  src={companyLogoUrl}
                  alt="website logo"
                  className="website-logo"
                />
              </div>

              <p>{jobDescription}</p>
            </div>

            <h2 className="section-heading">Skills</h2>
            {this.renderSkills(skills)}

            <h2 className="section-heading">Life at Company</h2>
            {this.renderLifeAtCompany(lifeAtCompany)}
          </div>

          <h2 className="section-heading">Similar Jobs</h2>
          <ul className="similar-jobs-list">
            {similarJobs.map(job => (
              <SimilarJobCard key={job.id} jobDetails={job} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  onRetry = () => {
    this.getJobDetails()
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.SUCCESS:
        return this.renderJobDetailsView()
      case apiStatusConstants.FAILURE:
        return <FailureView onRetry={this.onRetry} />
      case apiStatusConstants.IN_PROGRESS:
        return <LoaderView />
      default:
        return null
    }
  }
}

export default withRouter(JobItemDetails)

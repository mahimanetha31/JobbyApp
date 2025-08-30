import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'
import FailureView from '../FailureView'
import NoJobsView from '../NoJobsView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    isLoading: false,
    apiStatus: apiStatusConstants.initial,
    employmentType: [],
    salaryRange: '',
    searchInput: '',
    locations: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({isLoading: true})
    const {employmentType, salaryRange, searchInput, locations} = this.state
    const employmentTypesQuery = employmentType.join(',')
    const locationsQuery = locations.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesQuery}&minimum_package=${salaryRange}&search=${searchInput}&location=${locationsQuery}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(job => ({
        id: job.id,
        title: job.title,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
      }))
      this.setState({
        jobsList: updatedData,
        isLoading: false,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        isLoading: false,
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  updateEmploymentType = type => {
    this.setState(prevState => {
      const isSelected = prevState.employmentType.includes(type)
      const updatedTypes = isSelected
        ? prevState.employmentType.filter(each => each !== type)
        : [...prevState.employmentType, type]
      return {employmentType: updatedTypes}
    }, this.getJobs)
  }

  updateSalaryRange = range => {
    this.setState({salaryRange: range}, this.getJobs)
  }

  updateLocation = (location, isChecked) => {
    this.setState(prevState => {
      const updatedLocations = isChecked
        ? [...prevState.locations, location]
        : prevState.locations.filter(each => each !== location)
      return {locations: updatedLocations}
    }, this.getJobs)
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    return jobsList.length > 0 ? (
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobCard key={job.id} jobDetails={job} />
        ))}
      </ul>
    ) : (
      <NoJobsView />
    )
  }

  render() {
    const {isLoading, apiStatus, searchInput} = this.state
    const {employmentTypesList, salaryRangesList} = this.props

    let content
    if (isLoading) {
      content = (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    } else if (apiStatus === apiStatusConstants.failure) {
      content = <FailureView onRetry={this.getJobs} />
    } else {
      content = this.renderJobsList()
    }

    return (
      <>
        <Header />
        <div className="jobs-route-container">
          <FiltersGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            updateEmploymentType={this.updateEmploymentType}
            updateSalaryRange={this.updateSalaryRange}
            updateLocation={this.updateLocation}
          />
          <div className="jobs-content">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.updateSearchInput}
              />
              <button
                type="button"
                className="search-button"
                data-testid="searchButton"
                onClick={this.onClickSearch}
              >
                🔍
              </button>
            </div>
            {content}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

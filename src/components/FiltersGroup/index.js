import Profile from '../Profile'
import './index.css'

const locationList = [
  {id: 'HYDERABAD', label: 'Hyderabad'},
  {id: 'BANGALORE', label: 'Bangalore'},
  {id: 'CHENNAI', label: 'Chennai'},
  {id: 'DELHI', label: 'Delhi'},
  {id: 'MUMBAI', label: 'Mumbai'},
]

const FiltersGroup = ({
  employmentTypesList,
  salaryRangesList,
  updateEmploymentType,
  updateSalaryRange,
  updateLocation,
}) => {
  const onChangeEmploymentType = event => {
    updateEmploymentType(event.target.value)
  }

  const onChangeSalary = event => {
    updateSalaryRange(event.target.value)
  }

  const onChangeLocation = event => {
    updateLocation(event.target.value, event.target.checked)
  }

  return (
    <div className="filters-group-container sticky-filters">
      <Profile />
      <hr className="separator" />
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-list">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="filter-item">
            <input
              type="checkbox"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              onChange={onChangeEmploymentType}
            />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        ))}
      </ul>
      <hr className="separator" />
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="filter-item">
            <input
              type="radio"
              id={each.salaryRangeId}
              value={each.salaryRangeId}
              name="salary"
              onChange={onChangeSalary}
            />
            <label htmlFor={each.salaryRangeId}>{each.label}</label>
          </li>
        ))}
      </ul>
      <hr className="separator" />
      <h1 className="filter-heading">Locations</h1>
      <ul className="filter-list">
        {locationList.map(each => (
          <li key={each.id} className="filter-item">
            <input
              type="checkbox"
              id={each.id}
              value={each.label}
              onChange={onChangeLocation}
            />
            <label htmlFor={each.id}>{each.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FiltersGroup

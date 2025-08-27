import Profile from '../Profile'
import './index.css'

const FiltersGroup = ({
  employmentTypesList,
  salaryRangesList,
  updateEmploymentType,
  updateSalaryRange,
}) => {
  const onChangeEmploymentType = event => {
    updateEmploymentType(event.target.value)
  }

  const onChangeSalary = event => {
    updateSalaryRange(event.target.value)
  }

  return (
    <div className="filters-group-container">
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
    </div>
  )
}

export default FiltersGroup

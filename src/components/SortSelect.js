import React from 'react';
import PropTypes from 'prop-types';

const SortSelect = ({ values, selected, onChange }) => (
  <select value={selected} onChange={onChange}>
    {values.map(({ key, name }) => (
      <option value={key} key={key}>
        {name}
      </option>
    ))}
  </select>
);

SortSelect.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired, name: PropTypes.string.isRequired }),
  ),
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SortSelect.defaultProps = {
  values: [],
  selected: '',
};

export default SortSelect;

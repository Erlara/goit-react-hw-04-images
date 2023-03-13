import { useState } from 'react';
import { Button, Input, Label, SearchForm, Header } from './Searchbar.styled';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

export function Searchbar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast('Please, enter a query to search!');
      return;
    }
    onSearch(value);
    setValue('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <Button type="submit">
          <ImSearch />
          <Label>Search</Label>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

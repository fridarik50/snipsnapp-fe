import React, { useState, useContext } from 'react';
import Context from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';


const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const ctx = useContext(Context);
  const nav = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    ctx.setSearchText(searchTerm);
    ctx.handleSearch(searchTerm);
    nav('/search');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    
    }
  };



  return (
    <div style={styles.searchBarContainer}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>
        Search
      </button>
    </div>
  );
};

const styles = {
  searchBarContainer: {
    display: 'flex',
    alignItems: 'center',
  } as React.CSSProperties,
  input: {
    width: '400px',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    marginRight: '8px',
  } as React.CSSProperties,
  button: {
    padding: '8px 16px',
    fontSize: '16px',
    borderRadius: '20px',
    border: 'none',
    fontWeight: 'bold',
    backgroundColor: '#89D5BC',
    color: 'white',
    cursor: 'pointer',
  } as React.CSSProperties,
};

export default SearchBar;

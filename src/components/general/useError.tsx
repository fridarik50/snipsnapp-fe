import {useState, useEffect} from 'react';
import Header from './Header';

const useError = () => {
    const [error, setError] = useState<string | undefined>(undefined);

    const clearError = () => {
        setError(undefined);
    }
    useEffect(() => {}, [error]);

    const Message = () => <Header title={error} isError={error !== undefined} clearError={clearError}/>;
    return {error, setError, Message}

}

export default useError;
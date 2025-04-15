import { memo, useState , useCallback ,useMemo } from 'react';
//usecallback is used to prevent the recreation of the function and is needed when u have a function as a dependency of a useEffect and is also needed in conjuction with memo to avoid uneccessary recreation

//useMemo is used when u have a complex calculation that needs to be prevented

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter = memo( function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

//this maks sure that the isPrime would only change when the value of initialCount changes and would not be changes if counter changes

  const initialCountIsPrime = useMemo(()=> isPrime(initialCount),[initialCount]);

  const [counter, setCounter] = useState(initialCount);

const handleDecrement = useCallback  (
  function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  },[]);

const handleIncrement=useCallback(  function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  },[])

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
});

export default Counter;


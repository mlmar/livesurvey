import { useRef, useEffect } from 'react';

// auto focuses an element when depdencies change
const useFocus = (dependencies) => {
  const elemRef = useRef(null);
  useEffect(() => {
    elemRef.current?.focus();
  }, dependencies)

  return elemRef;
}

export default useFocus
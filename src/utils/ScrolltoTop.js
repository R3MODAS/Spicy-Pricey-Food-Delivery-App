
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrolltoTop = () => {

    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0,0);
        window.scroll({
            behavior : 'smooth'
        })
    },[pathname])

  return null;
}

export default ScrolltoTop
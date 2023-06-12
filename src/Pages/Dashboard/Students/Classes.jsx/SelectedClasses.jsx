import React from 'react';

import SelClassTable from './SelClassTable';
import useSelectedData from '../../../../Hooks/useSelectedData';

const SelectedClasses = () => {
  
    const [cart, refetch] = useSelectedData()

    return (
        <div className='MyContainer w-full'>
            <SelClassTable cart={cart} refetch={refetch} />
        </div>
    );
};

export default SelectedClasses;
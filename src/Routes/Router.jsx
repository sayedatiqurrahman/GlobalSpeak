import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLay from '../Pages/LayOuts/MainLay';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLay />
    }
])

export default router;
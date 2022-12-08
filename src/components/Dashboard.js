import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { loadUsersStart } from '../redux/Actions/actions';
import { loadCategoriesStart } from '../redux/Actions/categoryActions';
import { loadDepartmentStart } from '../redux/Actions/departmentActions';
import { loadProductsStart } from '../redux/Actions/productActions';
import image1 from '../assets/demo/Images/03.jpg'

const Dashboard = (props) => {
   
    const dispatch = useDispatch();
    const [lineOptions, setLineOptions] = useState(null);
    const users = useSelector((state) => state?.data?.users?.count);
    const productss = useSelector((state) => state?.product?.productss?.count);
    const categoriess = useSelector((state) => state?.category?.categories?.count);
    const departmentsList = useSelector((state) => state?.department?.departments?.count);
   
    useEffect(() => {
        dispatch(loadUsersStart());
    }, []);
    useEffect(() => {
        dispatch(loadProductsStart());
    }, []);
    useEffect(() => {
        dispatch(loadCategoriesStart());
    }, []);
    useEffect(() => {
        dispatch(loadDepartmentStart());
    }, []);

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };
        setLineOptions(lineOptions)
    }


    useEffect(() => {
        if (props.colorMode === 'light') {
            applyLightTheme(); 
        } else {
            applyDarkTheme();
        }
    }, [props.colorMode]);

    return (
    <div style={{overflowY:'hidden', overflowX: 'hidden' }}>
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
            <Link to="/admindashboard/employees" >
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">EMPLOYEES</span>
                            <div className="text-900 font-medium text-xl">{users}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-users text-blue-500 text-xl"/>
                        </div>
                    </div>
                    {/* <span className="text-green-500 font-medium">24 new </span>
                    <span className="text-500">since last visit</span> */}
                </div>
            </Link>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
            <Link to="/admindashboard/assets" >
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">ASSETS</span>
                            <div className="text-900 font-medium text-xl">{productss}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-qrcode text-orange-500 text-xl"/>
                        </div>
                    </div>
                    {/* <span className="text-green-500 font-medium">%52+ </span>
                    <span className="text-500">since last week</span> */}
                </div>
            </Link>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
            <Link to="/admindashboard/categories" >
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">CATEGORIES</span>
                            <div className="text-900 font-medium text-xl">{categoriess}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-inbox text-cyan-500 text-xl"/>
                        </div>
                    </div>
                    {/* <span className="text-green-500 font-medium">520  </span>
                    <span className="text-500">newly registered</span> */}
                </div>
            </Link>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
            <Link to="/admindashboard/departments" >
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">DEPARTMENTS</span>
                            <div className="text-900 font-medium text-xl">{departmentsList}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-home text-purple-500 text-xl"/>
                        </div>
                    </div>
                    {/* <span className="text-green-500 font-medium">85 </span>
                    <span className="text-500">responded</span> */}
                </div>
            </Link>
            </div>
        </div>

        <div className="card align-items-center justify-content-center flex mt-3">
            <img src={image1} alt="Image" height={'80%'} width={'60%'} className="align-items-center" style={{ borderRadius:'2%' }}/>
        </div> 
    </div>  
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return (prevProps.location.pathname === nextProps.location.pathname) && (prevProps.colorMode === nextProps.colorMode);
};

export default React.memo(Dashboard, comparisonFn);

import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import Dashboard from './components/Dashboard';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';

import EmployeesData from './components/menu/EmployeesData';
import Categories from './components/menu/Categories';
import Products from './components/menu/Products';
import Combos from './components/menu/Combos';
import Allocations from './components/menu/Allocation'
import Product from './pages/SingleViews/Product';
import Category from './pages/SingleViews/Category';
import Combo from './pages/SingleViews/Combo';
import EditUser from './pages/EditComponent/EditUser';
import AddEditProduct from './pages/EditComponent/AddEditProduct';
import Employee from './pages/SingleViews/Employee';
import Stocks from './components/menu/Stocks';
import AddUser from './pages/EditComponent/AddUser';


const AdminDashboard = () => {
    const [layoutMode, setLayoutMode] = useState('static');
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);


    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            label: 'Home',
            items: [{
                label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/admindashboard'
            }]
        },
       
        {
            label: 'Menu Hierarchy', icon: 'pi pi-fw pi-search',
            items: [
                { label: 'EMPLOYEES INFO', icon: 'pi pi-fw pi-bookmark' , to: '/admindashboard/employees' },
                { label: 'CATEGORIES INFO', icon: 'pi pi-fw pi-bookmark', 
                    items: [
                        { label: 'ALL CATEGORIES', icon: 'pi pi-fw pi-bookmark', to: '/admindashboard/categories' },
                        { label: 'CHECK STOCKS', icon: 'pi pi-fw pi-bookmark', to: '/admindashboard/stocks' },
                    ]},
                { label: 'PRODUCTS INFO', icon: 'pi pi-fw pi-bookmark', to: '/admindashboard/products' },
                { label: 'GET ALLOCATIONS', icon: 'pi pi-fw pi-bookmark', to: '/admindashboard/allocations' }, 
                { label: 'COMBOS ASSIGN', icon: 'pi pi-fw pi-bookmark', to: '/admindashboard/combos' }, 
            ]
        },
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar onToggleMenuClick={onToggleMenuClick} 
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
            </div>

            <div className="layout-main-container"> 
                <div className="layout-main">
                    <Route path="/admindashboard" exact render={() => <Dashboard location={location} />}  />
                    <Route path="/admindashboard/employees" component={EmployeesData} />
                    <Route path="/admindashboard/categories" component={Categories} />
                    <Route path="/admindashboard/products" component={Products} />
                    <Route path="/admindashboard/allocations" component={Allocations} />
                    <Route path="/admindashboard/combos" component={Combos} />   
                    <Route path="/admindashboard/stocks" component={Stocks} />
                    <Route path="/employee/:id" component={Employee} />
                    <Route path="/category/:id" component={Category} />
                    <Route path="/product/:id" component={Product} />
                    <Route path="/combo/:id" component={Combo} />
                    <Route path="/addnew-employee" component={AddUser} />
                    <Route path="/update-employee/:id" component={EditUser}/>
                    <Route path="/addnew-product" component={AddEditProduct} />
                    <Route path="/update-product/:id" component={AddEditProduct} />     
                </div>

                <AppFooter  />
            </div>

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
        </div>
    );
}

export default AdminDashboard;

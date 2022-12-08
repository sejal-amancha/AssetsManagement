import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar"
import { Chip } from 'primereact/chip';
import { getcomboByIdStart } from '../../redux/Actions/comboActions';


const Combo = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const combo_data = useSelector((state) => state?.comboDetails?.comboDetails)

    let valuesss = [];
    // let item_name = [];
    const item_assigned = combo_data.employeeDetail?.employeeAssigments;
    const assigned = item_assigned?.map((data) => {
        valuesss.push(data.itemDetail)
    })
   
    useEffect(() => {
        dispatch(getcomboByIdStart(id));
    }, []);

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        )
    }
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3">{`Employee Information/${combo_data?.employeeDetail?.firstName}`}</div>
                </div>
            </React.Fragment>
        )
    }
    const gotoPrevious = () => {
        history.goBack();
    }

    return (
        <div className="surface-section card" style={{ margin: '1%', padding: '1%' }}>
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <ul className="list-none p-0 m-0">
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">First Name</div>
                    <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{combo_data?.employeeDetail?.firstName}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Last Name</div>
                    <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{combo_data?.employeeDetail?.lastName}</div>
                </li>
                {/* <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Email Address</div>
                    <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleEmployeeData?.email}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Department</div>
                    <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleEmployeeData?.departmentDetails?.name}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Phone</div>
                    <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleEmployeeData?.phone}</div>
                </li> */}
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Assets Assigned</div>
                    <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">
                        {valuesss.length > 0 ? valuesss.map((items) => {
                            return (
                                <>
                                    <Chip label={items?.itemName} className="mr-2 mb-2"/>
                                </>
                            )
                        }) :  "No Assets Assigned"}
                    </div>
                    <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{combo_data?.itemDetail?.itemName}</div>    
                </li>
                {/* <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                 <div className="text-500 text-2xl w-6 md:w-3 font-medium">Created At</div>
                 <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleEmployeeData?.created_at}</div>   
             </li>
             <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                 <div className="text-500 text-2xl w-6 md:w-3 font-medium">Updated At</div>
                 <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleEmployeeData?.updated_at}</div>    
             </li> */}
            </ul>
        </div>
    )
}

export default Combo;

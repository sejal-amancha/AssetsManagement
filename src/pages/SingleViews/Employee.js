import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSingleEmployeeAssignemntStart, getSingleEmployeeStart } from "../../redux/Actions/actions";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar"
import { Chip } from 'primereact/chip';


const Employee = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { uniqueId } = useParams();

    const singleEmployeeData = useSelector((state) => state?.employeeDetails?.singleUser);
    let arr = []
    const assignmentsData = useSelector((state) => state.employeeDetails.singleUserAssignment);
    assignmentsData?.map((data) => {
        const item =  data.itemDetail
        arr.push(item)
    });
    useEffect(() => {
        dispatch(getSingleEmployeeStart(uniqueId));
    }, []);

    useEffect(() => {
        dispatch(getSingleEmployeeAssignemntStart(uniqueId));
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
                    <div className="font-medium text-4xl text-900 mb-3">{`Employee Information/${singleEmployeeData.firstName}`}</div>
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
                    <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleEmployeeData?.firstName}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Last Name</div>
                    <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleEmployeeData?.lastName}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
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
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Assets Assigned</div>
                    <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">
                        {arr.length > 0 ? arr.map((items) => {
                            return (
                                <>
                                    <Chip label={items.itemName} className="mr-2 mb-2"/>
                                </>
                            )
                        }) :  "No Assets Assigned"}
                    </div>
                    {/* <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{arr? arr : "No Item Assigned to this Employee"}</div>     */}
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

export default Employee;

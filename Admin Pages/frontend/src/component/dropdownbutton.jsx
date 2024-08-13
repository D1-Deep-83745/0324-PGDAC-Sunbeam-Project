import * as React from 'react';
import { useEffect } from 'react';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
const DropDownButton = () => {
    const items = [
        {
            text: 'Dashboard',
            iconCss: 'e-ddb-icons e-dashboard'
        },
        {
            text: 'Notifications',
            iconCss: 'e-ddb-icons e-notifications',
        },
        {
            text: 'User Settings',
            iconCss: 'e-ddb-icons e-settings',
        },
        {
            text: 'Log Out',
            iconCss: 'e-ddb-icons e-logout'
        }
    ];
    return (<div className='control-pane'>
            <div className='control-section'>
                <div className='dropdownbutton-section'>
                    <div id='dropdownbutton-control'>
                        <div className='row'>
                            <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                <DropDownButtonComponent items={items} iconCss='e-ddb-icons e-profile'></DropDownButtonComponent>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                <DropDownButtonComponent items={items}>Profile</DropDownButtonComponent>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                <DropDownButtonComponent items={items} iconCss='e-ddb-icons e-profile'>Profile</DropDownButtonComponent>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                                <DropDownButtonComponent items={items} cssClass='e-caret-hide'>Profile</DropDownButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
export default DropDownButton;
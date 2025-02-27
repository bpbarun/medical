import React, { useState, useEffect } from "react";
import axios from 'axios';
import { IP } from './Constant'
import {
    NavLink
} from "react-router-dom";
function Sidebar() {
    const role = localStorage.getItem("user_role");
    const [sealseman, setSealseman] = useState([]);
    const fetchData = () => {
        axios.get(IP + 'ventilia-api/index.php/api/user/user/technicalsidebar/'+localStorage.getItem("user_id"), {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            setSealseman(response.data.data)
        }).catch(err => {
            console.log(err);
        });
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="active treeview menu-open">
                            {role === 'sealseman' &&
                                <>
                                    <ul className="side-bar-menu">
                                        <NavLink to="/AddMedicine">
                                            <li title="Dashboard">
                                                <span className="menu_title">Add Medicine</span>
                                            </li>
                                        </NavLink>
                                    </ul>
                                </>
                            }
                        </li>
                    </ul>
                </section>
            </aside>
        </>
    )
}
export default Sidebar;
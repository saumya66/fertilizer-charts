import React from "react"
import "./Sidebar.css"
import { Link } from "react-router-dom"
import {
  TrendingUp,
  Inventory2
} from "@mui/icons-material"

function Sidebar() {
  return (
    <div className="flex-1 sticky bg-[#f5f5f5] h-[calc(100vh-60px)] max-w-[200px]">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Analytics
              </li>
            </Link>
            <Link to="/product" className="link">
              <li className="sidebarListItem">
                <Inventory2 className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/dashboard" className="link">
              <li className="sidebarListItem">
                <Inventory2 className="sidebarIcon" />
                <p className="">Dashboard</p>
              </li>
            </Link>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

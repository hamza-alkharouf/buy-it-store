import React from "react";
import "./sidebar.css";
import logo from "../../images/logo2.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { BiGridSmall } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';


const Sidebar = () => {
  const [t, i18n]= useTranslation();
  
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Buy It" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> 
          <span  className="removetext">{t('Dashboard')}</span>

        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ProductionQuantityLimitsIcon />}
        >
          <TreeItem nodeId="1" label={t('Products')}>
            <Link to="/admin/products">
              <TreeItem nodeId="2" label={t('All')} icon={<BiGridSmall />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label={t('Create')} icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<CategoryIcon />}
        >
          <TreeItem nodeId="1" label={t('Category')}>
            <Link to="/admin/categories">
              <TreeItem nodeId="2" label={t('All')} icon={<BiGridSmall />} />
            </Link>

            <Link to="/admin/category">
              <TreeItem nodeId="3" label={t('Create')} icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          <span  className="removetext">{t('Orders')}</span>

        </p>

      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon />
          <span  className="removetext">{t('Users')}</span>
 
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          <span className="removetext">{t('Reviews')}</span>
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;

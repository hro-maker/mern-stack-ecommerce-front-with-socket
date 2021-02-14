import React, { useState } from "react";
import Layout from "../../components/Header/Layout";
import "./style.scss";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import plac from './plac.png'
/**
 * @author
 * @function SearchUsers
 **/

const SearchUsers = (props) => {
    const [usersearch, setusersearch] = useState(props.match.params.data);
  const searchingdata = props.match.params.data;
  const auth = useSelector((state) => state.auth);
  // eslint-disable-next-line
  const users = auth.users.filter(
    (el) =>
      el.role != "admin" &&
      (el.firstName.includes(searchingdata) ||
        el.lastName.includes(searchingdata))
  );
  console.log(users);
  return(
    <Layout>
        <div className="users_searching_page">
                    <div className="search_people">
                <input value={usersearch} onChange={(e)=>setusersearch(e.target.value)} className="inputttt" placeholder="search users" type="text"/>

                <Link className="search_people_loo" to={`/users/search/${usersearch}/u`}> <IoIosSearch /> </Link>
                
            </div>
            <div className="users_lisst">
                {
                 users.length >0 ?   users.map((el,i) =>
                 <Link className="link_users_" to={`/profiles/user/${el._id}/u`} >
                 <div key={i} className="yousers_item">
                        <div className="user_image">
                            <img className="comentpicter_wraper" src={el.profilePicture ? el.profilePicture : plac} alt=""/>
                        </div>
                        <div className="users_inforrrr">
                               <span>fistname =&gt;</span> 
                            <div className="user_namee">{el.firstName}</div>
                                  <span>lastname =&gt;</span>
                            <div className="user_lastt">{el.lastName}</div>
                        </div>
                        </div>
                 </Link>
                        
                    ) : <div className="dont_found_user" >user dont fond</div>
                }
            </div>
        </div>
    
</Layout>
  ) 
};

export default SearchUsers;

import {React, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useAxios from "../utils/useAxios"
import moment from 'moment';
import Swal from "sweetalert2";  




const EditProfile = () => {
    const [errors, setErrors] = useState(null);
    const [dateString, setDateString] = useState("");
    const [fDate, setfDate] = useState("");

    const profileAPI = useAxios();
    const navigate =useNavigate()



    useEffect(() => {
        fetchUserProfile();
    }, []);
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        email: '',
        current_password: '',
        new_password: '',
        confirm_password: '',
        phone:'',
        job:'',
        address:'',
        image:'',
        bio:'',
        date_joined:''
    });


    const fetchUserProfile = async () => {
        try {
            const response = await profileAPI.get('accounts/profile/');
            setFormData(prevFormData => ({
                ...prevFormData,
                full_name: response.data.full_name,
                username: response.data.username,
                // current_password:response.data.password,
                email: response.data.email,
                phone: response.data.phone,
                job: response.data.job,
                address: response.data.address,
                image: response.data.image,
                bio: response.data.bio,
                date_joined:response.data.date_joined
            }));
            console.log(formData.image)
            console.log(formData.username)
            setDateString(formData.date_joined)
            console.log(formData.date_joined)
            setfDate(moment(dateString,'YYYY-MM-DD[T]HH:mm:ss').format("DD MMM YYYY"))
            console.log(fDate)
            
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };
    // const formattedDate=moment(dateString).format("DD MMM YYYY");
    // setfDate(formattedDate)
    // console.log(dateString)
 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNotify = (e) => {
        alert('Da bat thong bao');
    };

    
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setFormData({ ...formData, image: selectedImage }); // Lưu hình ảnh vào formData
        console.log('co anh duoc chon')
        console.log(selectedImage)

        const reader = new FileReader();
        reader.onload = function (e) {
            const imgInp = document.getElementById('imgInp');
            if (imgInp) {
                imgInp.src = e.target.result;
            }
        };
        reader.readAsDataURL(selectedImage);
       
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('full_name', formData.full_name);
            formDataToSubmit.append('username', formData.username);
            formDataToSubmit.append('email', formData.email);
            formDataToSubmit.append('password', formData.current_password);
            formDataToSubmit.append('phone', formData.phone);
            formDataToSubmit.append('job', formData.job);
            formDataToSubmit.append('address', formData.address);
            formDataToSubmit.append('image', formData.image); // Thêm hình ảnh vào formData
            formDataToSubmit.append('bio', formData.bio); // Thêm hình ảnh vào formData
            console.log(formData)
            console.log('check su thay doi')
            for (var pair of formDataToSubmit.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            await profileAPI.patch('/profile/', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Thiết lập header cho formData
                }
            });
            // alert('Profile updated successfully');
            Swal.fire({
                title: "Eđit Successful",
                icon: "success",
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
            navigate('/profile/')
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
  return <>
  
  <div className="container">
        <div className="row flex-lg-nowrap">
            <div className="col-12 col-lg-auto mb-3" style={{width: "200px"}}>
                <div className="card p-3">
                    <div className="e-navlist e-navlist--active-bg">
                        <ul className="nav">
                            <li className="nav-item"><a className="nav-link px-2 active" href={"#"}><i className="fa fa-fw fa-bar-chart mr-1"></i><span>Overview</span></a></li>
                            <li className="nav-item"><a className="nav-link px-2" href={"https://www.bootdey.com/snippets/view/bs4-crud-users"} target="__blank"><i className="fa fa-fw fa-th mr-1"></i><span>CRUD</span></a></li>
                            <li className="nav-item"><a className="nav-link px-2" href={"https://www.bootdey.com/snippets/view/bs4-edit-profile-page" }target="__blank"><i className="fa fa-fw fa-cog mr-1"></i><span>Settings</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="row">
                    <div className="col mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="e-profile">
                                    <div className="row">
                                        <div className="col-12 col-sm-auto mb-3">
                                            <div className="mx-auto" style={{width: "140px"}}>
                                                <div className="d-flex justify-content-center align-items-center rounded" style={{height: "140px", backgroundColor : "rgb(233, 236, 239)"}}>
                                                    {/* <span style={{color: "rgb(166, 168, 170)", font: "bold 8pt Arial"}}>140x140</span> */}
                                                    <img id="imgInp" style={{width: "140px", height:"140px"}} src= {formData.image && formData.image} alt="Avatar" />
                                                    {/* <img ></img> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                                            <div className="text-center text-sm-left mb-2 mb-sm-0">
                                                <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{formData.full_name && formData.full_name}</h4>
                                                {/* <p className="mb-0">{nickname && nickname}</p> */}
                                                <div className="text-muted">
                                                    <small>Last seen 2 hours ago</small>
                                                </div>
                                                <div className="mt-2">
                                                <label htmlFor="fileInput" className="btn btn-primary" style={{backgroundColor:"#081868"}}>
                                                    <i className="fa fa-fw fa-camera"></i>
                                                    <span>Change Photo</span>
                                                </label>
                                                <input id="fileInput"  type="file" style={{ display: 'none' }} onChange={handleImageChange} />
                                                </div>
                                            </div>
                                            <div className="text-center text-sm-right">
                                                <span className="badge badge-secondary">administrator</span>
                                                <div className="text-muted">
                                                    <small>Joined {fDate}</small>
                                                    {/* <small>{formData.date_joined && formData.date_joined}</small> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item"><a  className="active nav-link">Settings</a></li>
                                    </ul>
                                    <div className="tab-content pt-3">
                                        <div className="tab-pane active">
                                            <form className="form" onSubmit={handleSubmit} noValidate>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Full Name</label>
                                                                    <input 
                                                                    className="form-control" 
                                                                    type="text" 
                                                                    name="full_name"
                                                                    value={formData.full_name}
                                                                    onChange={handleChange} 
                                                                     />
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Username</label>
                                                                    <input 
                                                                    className="form-control" 
                                                                    type="text" 
                                                                    name="username" 
                                                                    value={formData.username}
                                                                    onChange={handleChange} 
                                                                    // disabled
                                                                     />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Phone</label>
                                                                    <input 
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="phone"
                                                                    value={formData.phone}
                                                                    onChange={handleChange} 
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Job</label>
                                                                    <input 
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="job"
                                                                    value={formData.job}
                                                                    onChange={handleChange} 
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Email</label>
                                                                    <input 
                                                                    className="form-control" 
                                                                    type="text"
                                                                    defaultValue={formData.email}
                                                                    disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Address</label>
                                                                    <input 
                                                                    className="form-control" 
                                                                    type="text"
                                                                    name="address"
                                                                    value={formData.address}
                                                                    onChange={handleChange}    
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col mb-3">
                                                                <div className="form-group">
                                                                    <label>About</label>
                                                                    <textarea 
                                                                    className="form-control" 
                                                                    rows="5" 
                                                                    placeholder="My Bio"
                                                                    name="bio"
                                                                    value={formData.bio} 
                                                                    onChange={handleChange}
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 mb-3">
                                                        <div className="mb-2">
                                                            <b>Change Password</b>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Current Password</label>
                                                                    <input 
                                                                    className="form-control" 
                                                                    type="password"
                                                                    name="current_password"
                                                                    value={formData.current_password}
                                                                    onChange={handleChange}
                                                                    />
                                                                    {errors && errors.confirm_password && <p className="error">{errors.current_password}</p>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>New Password</label>
                                                                    <input 
                                                                    className="form-control" 
                                                                    type="password" 
                                                                    name="new_password"
                                                                    value={formData.new_password}
                                                                    onChange={handleChange}
                                                                    />
                                                                    {errors && errors.new_password && <p className="error">{errors.new_password}</p>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label>Confirm <span className="d-none d-xl-inline">Password</span></label>
                                                                    <input 
                                                                    className="form-control" 
                                                                    type="password"
                                                                    name="confirm_password"
                                                                    value={formData.confirm_password}
                                                                    onChange={handleChange} 
                                                                   />
                                                                    {errors && errors.confirm_password && <p className="error">{errors.confirm_password}</p>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-5 offset-sm-1 mb-3">
                                                        <div className="mb-2">
                                                            <b>Keeping in Touch</b>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <label>Email Notifications</label>
                                                                <div className="custom-controls-stacked px-2">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input" id="notifications-blog" checked onChange={handleNotify} />
                                                                        <label className="custom-control-label" htmlFor="notifications-blog">Blog posts</label>
                                                                    </div>
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input" id="notifications-news" checked onChange={handleNotify} />
                                                                        <label className="custom-control-label" htmlFor="notifications-news">Newsletter</label>
                                                                    </div>
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input" id="notifications-offers" checked onChange={handleNotify} />
                                                                        <label className="custom-control-label" htmlFor="notifications-offers">Personal Offers</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col d-flex justify-content-end">
                                                        <button className="btn btn-primary" style={{backgroundColor:"#081868"}} type="submit" onClick={handleSubmit}>Save Changes</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="px-xl-3">
                                    <button className="btn btn-block btn-secondary">
                                        <i className="fa fa-sign-out"></i>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                        <div className="card-body">
                            <h6 className="card-title font-weight-bold">Support</h6>
                            <p className="card-text">Get fast, free help from our friendly assistants.</p>
                            <button type="button" className="btn btn-primary" style={{backgroundColor:"#081868"}}>Contact Us</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>



  </>;
};

export default EditProfile;

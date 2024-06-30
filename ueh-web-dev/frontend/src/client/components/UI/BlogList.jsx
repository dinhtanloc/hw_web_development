import {React, useState,useEffect} from "react";
import axios from "axios";
import { Col } from "reactstrap";
import "../../styles/blog-item.css";
import { Link } from "react-router-dom";

const BlogList = ({searchTerm}) => {
  const [blogData, setBlogdata] = useState([]);
  const blog = axios.create({
    baseURL: import.meta.env.VITE_DOMAIN_BACKEND
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await blog.get('/blogs/');
          setBlogdata(response.data);
      } catch (error) {
          console.error("There was an error fetching the data!", error);
      }
  };

  fetchData();
}, []);
  const filteredBlogs = searchTerm
  ? blogData.filter((blog) =>{
    const match =blog.title && blog.title.toLowerCase().includes(searchTerm.toLowerCase());
 
    return match;
  }
)
: blogData;
  return (
    <>
      {filteredBlogs.map((item) => (
        <BlogItem item={item} key={item.id} />
      ))}
    </>
  );
};

const BlogItem = ({ item }) => {
  const { imgUrl, title, author, date, description, time } = item;
  const img =imgUrl.replace("http://localhost:8000/media", "") && imgUrl.replace("http://127.0.0.1:8000/media", "")

  return (
    <Col lg="4" md="6" sm="6" className="mb-5">
      <div className="blog__item">
        <img src={img} alt="" className="w-100" />
        <div className="blog__info p-3">
          <Link to={`/blogs/${title}`} className="blog__title">
            {title}
          </Link>
          <p className="section__description mt-3">
            {description.length > 100
              ? description.substr(0, 100)
              : description}
          </p>

          <Link to={`/blogs/${title}`} className="read__more">
            Read More
          </Link>

          <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
            <span className="blog__author">
              <i className="ri-user-line"></i> {author}
            </span>

            <div className=" d-flex align-items-center gap-3">
              <span className=" d-flex align-items-center gap-1 section__description">
                <i className="ri-calendar-line"></i> {date}
              </span>

              <span className=" d-flex align-items-center gap-1 section__description">
                <i className="ri-time-line"></i> {time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default BlogList;

import React, { Component } from 'react';

import Sidebar from '../../Components/Sidebar';


/**
 * Welcome to the main component.
 */
class Meetup extends Component<{}, {}> {
    /**
     * @ignore
     */
    public render() {
        return (
            <>
                <section className="banner-area relative">
                    <div className="overlay overlay-bg" />
                    <div className="container">
                        <div className="row d-flex align-items-center justify-content-center">
                            <div className="about-content col-lg-12">
                                <h1 className="text-white">Blog Details</h1>
                                <p className="text-white link-nav"><a href="index.html">Home </a> <span className="lnr lnr-arrow-right" />
                                    <a href="blog-details.html">Blog Details</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="blog_area section-gap single-post-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="main_blog_details">
                                    <img className="img-fluid" src="img/blog/news-blog.jpg" alt="" />
                                    <h4>Cartridge Is Better Than Ever <br /> A Discount Toner</h4>
                                    <div className="user_details">
                                        <div className="float-left">
                                            <a href="#">Lifestyle</a>
                                            <a href="#">Gadget</a>
                                        </div>
                                        <div className="float-right">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5>Mark wiens</h5>
                                                    <p>12 Dec, 2017 11:21 am</p>
                                                </div>
                                                <div className="d-flex">
                                                    <img src="img/blog/c1.jpg" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>
                                        MCSE boot camps have its supporters and its detractors. Some people do not
                                        understand why you should have to spend money on boot camp when you can get
                                        the MCSE study materials yourself at a fraction of the camp price. However,
                                        who has the willpower
                                    </p>
                                    <p>
                                        MCSE boot camps have its supporters and its detractors. Some people do not
                                        understand why you should have to spend money on boot camp when you can get
                                        the MCSE study materials yourself at a fraction of the camp price. However,
                                        who has the willpower
                                    </p>
                                    <blockquote className="blockquote">
                                        <p className="mb-0">
                                            MCSE boot camps have its supporters and its detractors. Some people do not
                                            understand why you should have to spend money on boot camp when you can get
                                            the MCSE study materials yourself at a fraction of the camp price. However,
                                            who has the willpower
                                        </p>
                                    </blockquote>
                                    <p>MCSE boot camps have its supporters and its detractors. Some people do not
                                        understand why you should have to spend money on boot camp when you can get
                                        the MCSE study materials yourself at a fraction of the camp price. However,
                                        who has the willpower
                                    </p>
                                    <p>MCSE boot camps have its supporters and its detractors. Some people do not
                                        understand why you should have to spend money on boot camp when you can get
                                        the MCSE study materials yourself at a fraction of the camp price. However,
                                        who has the willpower
                                    </p>
                                    <div className="news_d_footer">
                                        <a href="#"><i className="lnr lnr lnr-heart" />Lily and 4 people like this</a>
                                        <a className="justify-content-center ml-auto" href="#">
                                            <i className="lnr lnr lnr-bubble" />
                                            06Comments
                                        </a>
                                        <div className="news_socail ml-auto">
                                            <a href="#"><i className="fa fa-facebook" /></a>
                                            <a href="#"><i className="fa fa-twitter" /></a>
                                            <a href="#"><i className="fa fa-pinterest" /></a>
                                            <a href="#"><i className="fa fa-rss" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="navigation-area">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
                                            <div className="thumb">
                                                <a href="#">
                                                    <img className="img-fluid" src="img/blog/c1.jpg" alt="" />
                                                </a>
                                            </div>
                                            <div className="arrow">
                                                <a href="#"><span className="lnr text-white lnr-arrow-left" /></a>
                                            </div>
                                            <div className="detials">
                                                <p>Prev Post</p>
                                                <a href="#">
                                                    <h4>A Discount Toner</h4>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
                                            <div className="detials">
                                                <p>Next Post</p>
                                                <a href="#">
                                                    <h4>Cartridge Is Better</h4>
                                                </a>
                                            </div>
                                            <div className="arrow">
                                                <a href="#">
                                                    <span className="lnr text-white lnr-arrow-right" />
                                                </a>
                                            </div>
                                            <div className="thumb">
                                                <a href="#">
                                                    <img className="img-fluid" src="img/blog/c1.jpg" alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comments-area">
                                    <h4>05 Comments</h4>
                                    <div className="comment-list">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb">
                                                    <img src="img/blog/c1.jpg" alt="" />
                                                </div>
                                                <div className="desc">
                                                    <h5><a href="#">Emilly Blunt</a></h5>
                                                    <p className="date">December 4, 2017 at 3:12 pm </p>
                                                    <p className="comment">
                                                        Never say goodbye till the end comes!
                                        </p>
                                                </div>
                                            </div>
                                            <div className="reply-btn">
                                                <a href="" className="btn-reply text-uppercase">reply</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-list left-padding">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb">
                                                    <img src="img/blog/c1.jpg" alt="" />
                                                </div>
                                                <div className="desc">
                                                    <h5><a href="#">Elsie Cunningham</a></h5>
                                                    <p className="date">December 4, 2017 at 3:12 pm </p>
                                                    <p className="comment">
                                                        Never say goodbye till the end comes!
                                        </p>
                                                </div>
                                            </div>
                                            <div className="reply-btn">
                                                <a href="" className="btn-reply text-uppercase">reply</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-list left-padding">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb">
                                                    <img src="img/blog/c1.jpg" alt="" />
                                                </div>
                                                <div className="desc">
                                                    <h5><a href="#">Annie Stephens</a></h5>
                                                    <p className="date">December 4, 2017 at 3:12 pm </p>
                                                    <p className="comment">
                                                        Never say goodbye till the end comes!
                                        </p>
                                                </div>
                                            </div>
                                            <div className="reply-btn">
                                                <a href="" className="btn-reply text-uppercase">reply</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-list">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb">
                                                    <img src="img/blog/c1.jpg" alt="" />
                                                </div>
                                                <div className="desc">
                                                    <h5><a href="#">Maria Luna</a></h5>
                                                    <p className="date">December 4, 2017 at 3:12 pm </p>
                                                    <p className="comment">
                                                        Never say goodbye till the end comes!
                                        </p>
                                                </div>
                                            </div>
                                            <div className="reply-btn">
                                                <a href="" className="btn-reply text-uppercase">reply</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-list">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb">
                                                    <img src="img/blog/c1.jpg" alt="" />
                                                </div>
                                                <div className="desc">
                                                    <h5><a href="#">Ina Hayes</a></h5>
                                                    <p className="date">December 4, 2017 at 3:12 pm </p>
                                                    <p className="comment">
                                                        Never say goodbye till the end comes!
                                        </p>
                                                </div>
                                            </div>
                                            <div className="reply-btn">
                                                <a href="" className="btn-reply text-uppercase">reply</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-form">
                                    <h4>Leave a Reply</h4>
                                    <form>
                                        <div className="form-group form-inline">
                                            <div className="form-group col-lg-6 col-md-6 name">
                                                <input type="text" className="form-control" id="name" placeholder="Enter Name" />
                                            </div>
                                            <div className="form-group col-lg-6 col-md-6 email">
                                                <input type="email" className="form-control" id="email" placeholder="Enter email address" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control mb-10" name="message" placeholder="Messege" />
                                        </div>
                                        <a href="#" className="primary-btn submit_btn text-uppercase">Send Message</a>
                                    </form>
                                </div>
                            </div>

                            <div className="col-lg-4 sidebar">
                                <div className="single-widget search-widget">
                                    <form className="example" action="#" style={{ margin: 'auto', maxWidth: '300px' }}>
                                        <input type="text" placeholder="Search Posts" name="search2" />
                                        <button type="submit"><i className="fa fa-search" /></button>
                                    </form>
                                </div>

                                <div className="single-widget protfolio-widget">
                                    <img className="img-fluid" src="img/blog/user2.png" alt="" />
                                    <a href="#">
                                        <h4>Charlie ALison Barber</h4>
                                    </a>
                                    <div className="desigmation">
                                        <p>Senior blog writer</p>
                                    </div>
                                    <p>
                                        Boot camps have its supporters andit sdetractors.
                                        Some people do not understand why you should have to spend
                                        money on boot camp whenyou can get.
                                        Boot camps have itssuppor ters andits detractors.
                                    </p>
                                    <ul>
                                        <li><a href="#"><i className="fa fa-facebook" /></a></li>
                                        <li><a href="#"><i className="fa fa-twitter" /></a></li>
                                        <li><a href="#"><i className="fa fa-dribbble" /></a></li>
                                        <li><a href="#"><i className="fa fa-behance" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Meetup;

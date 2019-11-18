import React, { Component } from 'react';


class Sidebar extends Component<{}, {}> {
    /**
     * @ignore
     */
    public render() {
        return (
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
                        money on boot camp whenyou can get. Boot camps have itssuppor ters andits detractors.
                    </p>
                    <ul>
                        <li><a href="#"><i className="fa fa-facebook" /></a></li>
                        <li><a href="#"><i className="fa fa-twitter" /></a></li>
                        <li><a href="#"><i className="fa fa-dribbble" /></a></li>
                        <li><a href="#"><i className="fa fa-behance" /></a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;

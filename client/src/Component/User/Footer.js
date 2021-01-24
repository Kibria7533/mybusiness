import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer-area footer--light">
        <div className="footer-big">
          {/* start .container */}
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <div className="footer-widget">
                  <div className="widget-about">
                    <img
                      src="http://placehold.it/250x80"
                      alt=""
                      className="img-fluid"
                    />
                    <p>
                      Buyforest.shop is an Bangladeshi startup multinational
                      technology company based in Dhaka, Bangladesh, which
                      focuses on commerce, agricultural innovations and
                      education )
                    </p>
                    <ul className="contact-details">
                      <li>
                        <span className="icon-earphones" /> Call Us:
                        <a href="tel:344-755-111">01320778658</a>
                      </li>
                      <li>
                        <span className="icon-envelope-open" />
                        <a href="mailto:buyforestclub@gmail.com">
                          buyforestclub@gmail.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Ends: .footer-widget */}
              </div>
              {/* end /.col-md-4 */}
              <div className="col-md-3 col-sm-4">
                <div className="footer-widget">
                  <div className="footer-menu footer-menu--1">
                    <h4 className="footer-widget-title">Popular Category</h4>
                    <ul>
                      <li>
                        <a href="#">Organic Foods</a>
                      </li>
                      <li>
                        <a href="#">Netflix</a>
                      </li>
                      <li>
                        <a href="#">Books</a>
                      </li>
                      <li>
                        <a href="#">Development Course</a>
                      </li>
                    </ul>
                  </div>
                  {/* end /.footer-menu */}
                </div>
                {/* Ends: .footer-widget */}
              </div>
              {/* end /.col-md-3 */}
              <div className="col-md-3 col-sm-4">
                <div className="footer-widget">
                  <div className="footer-menu">
                    <h4 className="footer-widget-title">Our Company</h4>
                    <ul>
                      <li>
                        <a href="#">TrippleDev</a>
                      </li>
                      <li>
                        <a href="https://www.facebook.com/buyforest.shop/">
                          The Buyforest Club
                        </a>
                      </li>
                      <li>
                        <a href="#">Ten minute Versity</a>
                      </li>
                      <li>
                        <a href="#">Testimonials</a>
                      </li>
                      <li>
                        <a href="https://www.facebook.com/buyforest.shop/">
                          Contact Us
                        </a>
                      </li>

                      <li>
                        <a href="#">Blog</a>
                      </li>
                    </ul>
                  </div>
                  {/* end /.footer-menu */}
                </div>
                {/* Ends: .footer-widget */}
              </div>
              {/* end /.col-lg-3 */}
              <div className="col-md-3 col-sm-4">
                <div className="footer-widget">
                  <div className="footer-menu no-padding">
                    <h4 className="footer-widget-title">Help Support</h4>
                    <ul>
                      <li>
                        <a href="#">Support Forum</a>
                      </li>
                      <li>
                        <a href="#">Terms &amp; Conditions</a>
                      </li>
                      <li>
                        <a href="#">Support Policy</a>
                      </li>
                      <li>
                        <a href="#">Refund Policy</a>
                      </li>
                      <li>
                        <a href="#">FAQs</a>
                      </li>
                      <li>
                        <a href="#">Buyers Faq</a>
                      </li>
                      <li>
                        <a href="#">Sellers Faq</a>
                      </li>
                    </ul>
                  </div>
                  {/* end /.footer-menu */}
                </div>
                {/* Ends: .footer-widget */}
              </div>
              {/* Ends: .col-lg-3 */}
            </div>
            {/* end /.row */}
          </div>
          {/* end /.container */}
        </div>
        {/* end /.footer-big */}
        <div className="mini-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="copyright-text">
                  <p>
                    © 2021
                    <a href="#">Buyforest</a>. All rights reserved. Created by
                    <a href="#">TrippleDev</a>
                  </p>
                </div>
                <div className="go_top">
                  <span className="icon-arrow-up" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
